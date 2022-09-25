import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';

import { banner } from '~/assets/images';
import config, { formatMoney } from '~/config';
import { getInfoCart } from '~/services/cartService';

import Banner from '~/components/Banner';
import Button from '~/components/Button';
import Helmet from '~/components/Helmet';
import ProductItemCart from '~/components/ProductItemCart';
import Table from '~/components/Table';

import styles from './Cart.module.scss';

const cx = classNames.bind(styles);

function Cart() {
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);

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

  const handleChangeQuantity = () => {
    getItems();
  };

  return (
    <Helmet title="cart">
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
                      handleChange={handleChangeQuantity}
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
                      handleChange={handleChangeQuantity}
                    />
                  );
                })}
              </Table>
            </div>
            <div className={cx('checkout')}>
              <div className={cx('coupon')}>
                <div className={cx('input_coupon')}>
                  <label>Have coupon ?</label>
                  <div>
                    <input />
                    <Button primary>Apply</Button>
                  </div>
                </div>

                <div className={cx('calc_coupon')}>
                  <div className={cx('info')}>
                    <h4>Total Price:</h4>
                    <p>{formatMoney(totalPrice)}</p>
                  </div>
                  <div className={cx('info')}>
                    <h4>Discount:</h4>
                    <p>{formatMoney(discount)}</p>
                  </div>
                </div>
              </div>

              <div>
                <div className={cx('total', 'info')}>
                  <h4>Total:</h4>
                  <p>{formatMoney(totalPrice - discount)}</p>
                </div>
                <Button primary className={cx('btn_checkout')}>
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
