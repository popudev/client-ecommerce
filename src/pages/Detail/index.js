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

const cx = classNames.bind(styles);

function Detail() {
  const { productId } = useParams();
  const [info, setInfo] = useState({});
  const [quantity, setQuantity] = useState(1);

  const handleOnchange = (quantity) => {
    setQuantity(quantity);
  };

  useEffect(() => {
    const getInfoProduct = async () => {
      const product = await getProductById(productId);
      console.log('product: ', product);
      setInfo(product);
    };
    getInfoProduct();
  }, [productId]);

  return (
    <div className={cx('wrapper', 'main', 'container')}>
      <div className={cx('product_info')}>
        <div className={cx('images')}>
          <div className={cx('slide_images')}>
            <Slider data={[{ image: product1 }, { image: product1 }, { image: product1 }]} />
          </div>
          <div className={cx('images_other')}></div>
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
            <Button outline leftIcon={<i className="fa-solid fa-cart-plus"></i>}>
              ADD TO CART
            </Button>
            <Button primary>BUY NOW</Button>
          </div>
        </div>
      </div>

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
  );
}

export default Detail;
