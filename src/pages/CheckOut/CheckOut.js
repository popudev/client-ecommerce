import { Fragment, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import classNames from 'classnames/bind';

import config, { formatMoney } from '~/config';
import useCheckOutState from '~/hooks/useCheckOutState';
import { resetState } from '~/reducers/actions/checkOutAction';

import ProductItemCheckOut from '~/components/ProductItemCheckOut';

import styles from './CheckOut.module.scss';
import Address from './pages/Address';
import Payment from './pages/Payment';
import Shipping from './pages/Shipping';

const cx = classNames.bind(styles);

const routes = [
  {
    title: 'Address',
    component: Address,
    path: config.routes.checkout.address,
    link: config.routes.checkout.address.href,
    step: 1,
  },
  {
    title: 'Shipping',
    component: Shipping,
    path: config.routes.checkout.shipping,
    link: config.routes.checkout.shipping.href,

    step: 2,
  },
  {
    title: 'Payment',
    component: Payment,
    path: config.routes.checkout.payment,
    link: config.routes.checkout.payment.href,
    step: 3,
  },
  {
    component: () => <Navigate to="/notfound" replace />,
    path: '/*',
    disable: true,
  },
];

function CheckOut() {
  console.log('re-render checkout');

  const { state, dispatch } = useCheckOutState();
  console.log('state: ', state);
  const { products, totalPrice, discount, shipping, total } = state;

  const { pathname } = useLocation();
  const navigator = useNavigate();

  useEffect(() => {
    if (!products.length) navigator(config.routes.cart);
  }, [navigator, products]);

  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, [dispatch]);

  return (
    <div className={cx('wrapper', 'main', 'container')}>
      <div className={cx('header')}>
        <div className={cx('steps')}>
          {routes.map((item) => {
            if (item.disable) return <Fragment key={item.path} />;

            return (
              <Fragment key={item.path}>
                <div
                  title={item.title}
                  className={cx('step', {
                    active: pathname === item.link,
                  })}
                >
                  <div className={cx('step_title')}>{item.step}</div>
                </div>

                {item.step !== 3 && <div className={cx('space')}></div>}
              </Fragment>
            );
          })}
        </div>
        <div className={cx('content')}>
          <Routes>
            {routes.map((item) => {
              const Component = item.component;
              return <Route key={item.path} path={item.path} element={<Component />} />;
            })}
          </Routes>
        </div>
      </div>
      <div className={cx('shopping_cart')}>
        <h2>Shopping Cart</h2>
        <div className={cx('products_cart')}>
          {products.map((item) => {
            return <ProductItemCheckOut border data={item} key={item._id} />;
          })}
        </div>
        <div className={cx('checkout_total')}>
          <div className={cx('info')}>
            <h4>Total Price:</h4>
            <p>{formatMoney(totalPrice)}</p>
          </div>
          <div className={cx('info')}>
            <h4>Discount:</h4>
            <p>{formatMoney(discount)}</p>
          </div>
          {shipping && (
            <div className={cx('info')}>
              <h4>Shipping:</h4>
              <p>{formatMoney(shipping.charge)}</p>
            </div>
          )}
          <div className={cx('info', 'total')}>
            <h4>Total:</h4>
            <p>{formatMoney(total)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
