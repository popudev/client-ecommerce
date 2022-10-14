import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { banner } from '~/assets/images';
import config, { formatMoney } from '~/config';
import { useAuthenState } from '~/hooks';
import useCheckOutState from '~/hooks/useCheckOutState';
import { updateTotalPriceDiscountProducts } from '~/reducers/actions/checkOutAction';
import { getInfoCart } from '~/services/cartService';

import Banner from '~/components/Banner';
import Button from '~/components/Button';
import { Form, FormInput } from '~/components/Form';
import Helmet from '~/components/Helmet';
import { notification } from '~/components/Notification/core';
import ProductItemCart from '~/components/ProductItemCart';
import Table from '~/components/Table';

import styles from './Cart.module.scss';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const initialValues = {
  coupon: '',
};

function Cart() {
  const { authenState } = useAuthenState();
  const { currentUser } = authenState.login;
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);

  const { checkOutDispatch } = useCheckOutState();
  const navigator = useNavigate();

  const getItems = async () => {
    const result = await getInfoCart();
    if (!result) return setItems([]);

    setItems(result);

    const total = result.reduce((prev, curr) => {
      return prev + curr.product.sale * curr.quantity;
    }, 0);

    setTotalPrice(total);
  };

  useEffect(() => {
    getItems();
  }, []);

  const handleDeleteProduct = () => {
    getItems();
  };

  const handleCheckOut = () => {
    if (currentUser?.verify) {
      checkOutDispatch(updateTotalPriceDiscountProducts(totalPrice, discount, items));
      navigator(config.routes.checkout.address.href);
    } else {
      notification
        .setTitle(
          ['Account not verified', 'Please open profile > account > verify email'],
          notification.type.error,
        )
        .then(() => {
          navigator(config.routes.profile.account.href);
        });
    }
  };

  const handleApplyCoupon = () => {
    if (false) {
      setDiscount(0);
    }
  };

  return (
    <Helmet title="Cart">
      <div className={cx('wrapper', 'main', 'container')}>
        <Banner image={banner} />
        {items.length ? (
          <>
            <div className={cx('content')}>
              <Table
                className={cx('table')}
                titles={['Image', 'Title', 'Unit Price', 'Quantity', 'Total Price', 'Actions']}
              >
                {items.map((item) => {
                  return (
                    <ProductItemCart
                      key={item._id}
                      data={item}
                      handleDelete={handleDeleteProduct}
                    />
                  );
                })}
              </Table>

              <Table className={cx('table_mobile')} titles={['Image', 'Info', 'Actions']}>
                {items.map((item) => {
                  return (
                    <ProductItemCart
                      key={item._id + 2}
                      data={item}
                      mobile
                      handleDelete={handleDeleteProduct}
                    />
                  );
                })}
              </Table>
            </div>
            <div className={cx('checkout')}>
              <div className={cx('coupon')}>
                <div className={cx('input_coupon')}>
                  <label htmlFor="coupon">Have coupon ?</label>
                  <Form initialValues={initialValues}>
                    <FormInput placeholder="Enter coupon..." name="coupon" />
                    <Button primary onClick={handleApplyCoupon}>
                      Apply
                    </Button>
                  </Form>
                </div>

                <div className={cx('calc_coupon')}>
                  <div className={cx('info')}>
                    <h4>Total Price:</h4>
                    <p>{formatMoney(totalPrice)}</p>
                  </div>
                  <div className={cx('info')}>
                    <h4>Discount:</h4>
                    <p>- {formatMoney(discount)}</p>
                  </div>
                </div>
              </div>

              <div>
                <div className={cx('total', 'info')}>
                  <h4>Total:</h4>
                  <p>{formatMoney(totalPrice - discount)}</p>
                </div>
                <Button primary className={cx('btn_checkout')} onClick={handleCheckOut}>
                  Check Out
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className={cx('empty')}>
            <h2>{config.notifications.cart.empty}</h2>
            <Button outline to={config.routes.shop}>
              GO TO SHOP
            </Button>
          </div>
        )}
      </div>
    </Helmet>
  );
}

export default Cart;
