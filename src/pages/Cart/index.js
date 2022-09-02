import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import Helmet from '~/components/Helmet';
import styles from './Cart.module.scss';

import { fakeProducts } from '~/assets/data';
import ProductCart from '~/components/Product/ProductCart';
import Button from '~/components/Button';
import { getInfoCart } from '~/services/cartService';

const cx = classNames.bind(styles);

function Cart() {
  const [items, setItems] = useState([]);

  const getItems = async () => {
    const result = await getInfoCart();
    setItems(result);
  };

  useEffect(() => {
    getItems();
  }, []);

  const handleDeleteProduct = () => {
    getItems();
  };

  return (
    <Helmet title="cart">
      <div className={cx('wrapper', 'main', 'container')}>
        <div className={cx('banner')}></div>
        <div className={cx('content')}>
          <table className={cx('table')}>
            <thead>
              <tr className={cx('title')}>
                <th>Image</th>
                <th>Title</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {!items.length && <div>KHONG CO SAN PHAM</div>}
              {!!items.length &&
                items.map((item) => {
                  return (
                    <ProductCart
                      key={item._id}
                      id={item._id}
                      quantity={item.quantity}
                      handleDelete={handleDeleteProduct}
                      data={fakeProducts[0]}
                    />
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className={cx('checkout')}>
          <div className={cx('coupon')}>
            <label>Have coupon ?</label>
            <div>
              <input />
              <Button primary>Apply</Button>
            </div>
          </div>

          <div className={cx('calc_coupon')}>
            <div className={cx('info')}>
              <h4>Total Price:</h4>
              <p>USD 300.00</p>
            </div>
            <div className={cx('info')}>
              <h4>Discount:</h4>
              <p>USD 300.00</p>
            </div>
          </div>

          <div>
            <div className={cx('total', 'info')}>
              <h4>Total:</h4>
              <p>USD 300.00</p>
            </div>
            <Button primary className={cx('btn_checkout')}>
              Check Out
            </Button>
          </div>
        </div>
      </div>
    </Helmet>
  );
}

export default Cart;
