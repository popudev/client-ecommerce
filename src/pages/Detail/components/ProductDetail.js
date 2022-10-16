import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { bannerDetail, product1, product2, product3 } from '~/assets/images';
import config, { formatMoney } from '~/config';
import { useAuthenState } from '~/hooks';
import useCheckOutState from '~/hooks/useCheckOutState';
import { updateTotalPriceDiscountProducts } from '~/reducers/actions/checkOutAction';
import { addProductToCart } from '~/services/cartService';

import Button from '~/components/Button';
import ControlQuantity from '~/components/ControlQuantity';
import { notification } from '~/components/Notification/core';
import Skeleton from '~/components/Skeleton';
import Slider from '~/components/Slider';
import { toast } from '~/components/Toast/core';

import styles from '../Detail.module.scss';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const ProductDetail = ({ info }) => {
  const [quantity, setQuantity] = useState(1);
  const { checkOutDispatch } = useCheckOutState();
  const {
    authenState: {
      login: { currentUser },
    },
  } = useAuthenState();
  const navigator = useNavigate();

  const handleOnchange = (quantity) => {
    setQuantity(quantity);
  };

  const handleAddToCart = () => {
    if (!currentUser) {
      toast.error(config.notifications.auth.unauth);
      return;
    }
    addProductToCart({
      productId: info._id,
      quantity: quantity,
    });
  };

  const handleBuyNow = () => {
    if (!currentUser) {
      toast.error(config.notifications.auth.unauth);
      return;
    } else if (!currentUser?.verify) {
      notification
        .setTitle(
          ['Account not verified', 'Please open profile > account > verify email'],
          notification.type.error,
        )
        .then(() => {
          navigator(config.routes.profile.account.href);
        });
      return;
    }

    const totalPrice = info?.sale * quantity;
    checkOutDispatch(
      updateTotalPriceDiscountProducts(totalPrice, 0, [
        {
          product: info,
          quantity: quantity,
        },
      ]),
    );
    navigator(config.routes.checkout.address.href);
  };

  return (
    <div className={cx('product_info')}>
      <div className={cx('banner')}>
        <img src={bannerDetail} alt="" />
      </div>
      <div className={cx('images')}>
        <div className={cx('slide_images')}>
          <Slider
            data={[{ image: product1 }, { image: product2 }, { image: product3 }]}
            mainColor
          />
        </div>
      </div>
      <div className={cx('info')}>
        <h1 className={cx('title')}>{info?.title}</h1>
        <p className={cx('description')}>{info.description}</p>
        <div className={cx('prices')}>
          <span className={cx('price')}>{formatMoney(info.price)}</span>
          <span className={cx('sale')}>{formatMoney(info.sale)}</span>
        </div>
        <div className={cx('quantity')}>
          <span>Quantity:</span>
          <div className={cx('control')}>
            <ControlQuantity outline onQuantityChange={handleOnchange} />
          </div>
        </div>
        <div className={cx('actions')}>
          <Button
            onClick={handleAddToCart}
            outline
            large
            leftIcon={<i className="fa-solid fa-cart-plus"></i>}
          >
            ADD TO CART
          </Button>
          <Button primary large onClick={handleBuyNow}>
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
