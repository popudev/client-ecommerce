import { useState } from 'react';

import classNames from 'classnames/bind';

import { bannerDetail, product1 } from '~/assets/images';
import { formatMoney } from '~/config';
import { addProductToCart } from '~/services/cartService';

import Button from '~/components/Button';
import ControlQuantity from '~/components/ControlQuantity';
import Skeleton from '~/components/Skeleton';
import Slider from '~/components/Slider';

import styles from '../Detail.module.scss';

const cx = classNames.bind(styles);

const ProductDetail = ({ info }) => {
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
      <div className={cx('banner')}>
        <img src={bannerDetail} alt="" />
      </div>
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
          <div className={cx('control')}>
            <ControlQuantity outline onChange={handleOnchange} />
          </div>
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
      <div className={cx('banner')}>
        <img src={bannerDetail} alt="" />
      </div>
    </div>
  );
};

ProductDetail.Loading = () => {
  return (
    <div className={cx('product_info', 'loading__mobile')}>
      <div className={cx('banner')}>
        <Skeleton height="100%" />
      </div>
      <div className={cx('images')}>
        <Skeleton height="100%" />
      </div>
      <div className={cx('info')}>
        <h1 className={cx('title')}>
          <Skeleton height="70px" />
        </h1>
        <p className={cx('description')}>
          <Skeleton height="250px" />
        </p>
        <div className={cx('prices')}>
          <Skeleton width={150} height="60px" />
          <span></span>
          <Skeleton width={150} height="60px" />
        </div>
      </div>
      <div className={cx('banner')}>
        <Skeleton height="100%" />
      </div>
    </div>
  );
};

export default ProductDetail;
