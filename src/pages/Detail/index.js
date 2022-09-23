import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '~/services/productService';

import classNames from 'classnames/bind';
import styles from './Detail.module.scss';
import Button from '~/components/Button';

import { product1 } from '~/assets/images';
import { formatMoney } from '~/config';
import Slider from '~/components/Slider';
import ControlQuantity from '~/components/ControlQuantity';
import Section, { SectionBody, SectionTitle } from '~/components/Section';
import { ProductCard, ProductList } from '~/components/Product';
import { fakeProducts } from '~/assets/data';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { addProductToCart } from '~/services/cartService';

const cx = classNames.bind(styles);

const Header = ({ info }) => {
  return (
    <div className={cx('header')}>
      <div className={cx('header__action')}>
        <Button text to="/">
          Popu Shop
        </Button>
        <span>{'>'}</span>
        <Button text to="/shop">
          Shop
        </Button>
        <span>{'>'}</span>
        <Button text>{info?.categoryTitle || 'Iphone'}</Button>
        <span>{'>'}</span>
        <Button text disabled className={cx('header__product-title')}>
          {info?.title}
        </Button>
      </div>
    </div>
  );
};

Header.Loading = () => {
  return (
    <div className={cx('header', 'loading__mobile')}>
      <Skeleton width="500px" height="50px" />
    </div>
  );
};

const ProductDetails = ({ info }) => {
  const [quantity, setQuantity] = useState(1);

  const handleOnchange = (quantity) => {
    setQuantity(quantity);
  };

  const handleAddToCart = () => {
    addProductToCart({
      productId: info._id,
      quantity: quantity,
    });
  };
  return (
    <div className={cx('product_info')}>
      <div className={cx('images')}>
        <div className={cx('slide_images')}>
          <Slider data={[{ image: product1 }, { image: product1 }, { image: product1 }]} mainColor />
        </div>
      </div>
      <div className={cx('info')}>
        <h1 className={cx('title')}>{info?.title}</h1>
        <p className={cx('description')}>{info.description}</p>
        <div className={cx('prices')}>
          <span className={cx('price')}>{formatMoney(info.sale)}</span>
          <span className={cx('sale')}>{formatMoney(info.price)}</span>
        </div>
        <div className={cx('quantity')}>
          <span>Quantity:</span>
          <ControlQuantity outline onChange={handleOnchange} />
        </div>
        <div className={cx('actions')}>
          <Button onClick={handleAddToCart} outline large leftIcon={<i className="fa-solid fa-cart-plus"></i>}>
            ADD TO CART
          </Button>
          <Button primary large>
            BUY NOW
          </Button>
        </div>
      </div>
    </div>
  );
};

ProductDetails.Loading = () => {
  return (
    <div className={cx('product_info', 'loading__mobile')}>
      <div className={cx('images')}>
        <Skeleton width={350} height="100%" />
      </div>
      <div className={cx('info')}>
        <h1 className={cx('title')}>
          <Skeleton height="70px" />
        </h1>
        <p className={cx('description')}>
          <Skeleton height="250px" />
        </p>
        <div className={cx('prices')}>
          <Skeleton width="150px" height="60px" />
          <span></span>
          <Skeleton width="150px" height="60px" />
        </div>
      </div>
    </div>
  );
};

function Detail() {
  const { productId } = useParams();
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);
  console.log('loading: ', loading);

  useEffect(() => {
    const getInfoProduct = async () => {
      const product = await getProductById(productId);
      console.log('product: ', product);
      setInfo(product);
      setLoading(false);
    };
    getInfoProduct();
  }, [productId]);

  return (
    <SkeletonTheme baseColor="#1c0a00" highlightColor="#361500" borderRadius={0}>
      <div className={cx('wrapper', 'main', 'container')}>
        {!loading ? (
          <>
            <Header.Loading />
            <ProductDetails.Loading />
          </>
        ) : (
          <>
            <Header info={info} />
            <ProductDetails info={info} />
          </>
        )}

        <Section wrapperClassName={cx('section_product_recommemt')}>
          <SectionTitle>YOU MAY ALSO LIKE</SectionTitle>
          <SectionBody>
            <ProductList col={6} mdCol={3} smCol={2} gap={10}>
              {fakeProducts.map((e, i) => {
                return <ProductCard key={i} isHome={true} data={e} />;
              })}
            </ProductList>
          </SectionBody>
        </Section>
      </div>
    </SkeletonTheme>
  );
}

export default Detail;
