import { useRef } from 'react';

import classNames from 'classnames/bind';
import Helmet from '~/components/Helmet';
import styles from './Cart.module.scss';

import { fakeProducts } from '~/assets/data';
import ProductCart from '~/components/Product/ProductCart';
import Button from '~/components/Button';
import { useGlobalState } from '~/hooks';

const cx = classNames.bind(styles);

function Cart() {
  const { globalState } = useGlobalState();
  const checkoutRef = useRef(null);
  const contentRef = useRef(null);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const heightCheckOut = checkoutRef.current.getBoundingClientRect().height;
  //     const widthCheckOut = checkoutRef.current.getBoundingClientRect().width;
  //     const scrollBottom =
  //       document.documentElement.scrollHeight - window.innerHeight - document.documentElement.scrollTop;

  //     if (scrollBottom > 342) {
  //       contentRef.current.style.marginBottom = heightCheckOut + 'px';
  //       checkoutRef.current.style.width = widthCheckOut + 'px';
  //       checkoutRef.current.classList.add(cx('shrink'));
  //     } else {
  //       contentRef.current.style.marginBottom = 0;
  //       checkoutRef.current.style.width = 100 + '%';
  //       checkoutRef.current.classList.remove(cx('shrink'));
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  return (
    <Helmet title="cart">
      <div className={cx('wrapper', 'main', 'container')}>
        <div className={cx('banner')}></div>
        <div ref={contentRef} className={cx('content')}>
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
              <ProductCart data={fakeProducts[0]} />
              <ProductCart data={fakeProducts[0]} />
              <ProductCart data={fakeProducts[0]} />
              <ProductCart data={fakeProducts[0]} />
              <ProductCart data={fakeProducts[0]} />
              <ProductCart data={fakeProducts[0]} />
            </tbody>
          </table>
        </div>
        <div ref={checkoutRef} className={cx('checkout')}>
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
