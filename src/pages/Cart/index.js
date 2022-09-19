import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import Helmet from '~/components/Helmet';
import styles from './Cart.module.scss';
import Button from '~/components/Button';
import { getInfoCart } from '~/services/cartService';
import { formatMoney } from '~/config';
import ItemCart from '~/components/ItemCart';
import Table from '~/components/Table';

const cx = classNames.bind(styles);

function Cart() {
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);

  const getItems = async () => {
    const result = await getInfoCart();
    console.log(result);
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
        <div className={cx('banner')}></div>
        {items.length ? (
          <>
            <div className={cx('content')}>
              <Table
                className={cx('table')}
                titles={['Image', 'Title', 'Unit Price', 'Quantity', 'Total Price', 'Actions']}
              >
                {items.map((item) => {
                  return (
                    <ItemCart
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
                    <ItemCart
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
            <h2>KHONG CO SAN PHAM NAO</h2>
            <Button outline to="/shop">
              GO TO SHOP
            </Button>
          </div>
        )}
      </div>
    </Helmet>
  );
}

export default Cart;
