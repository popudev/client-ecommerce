import { Route, Routes } from 'react-router-dom';

import config from '~/config';

import Main from './pages/Main';
import Order from './pages/Order';
import styles from './Purchase.module.scss';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const routes = [
  {
    component: Main,
    path: '/',
    link: config.routes.profile.purchase.href,
  },
  {
    component: Order,
    path: config.routes.profile.purchase.order + '/:orderId',
    link: config.routes.profile.purchase.order.href,
  },
];

function Purchase() {
  return (
    <div className={cx('wrapper')}>
      <Routes>
        {routes.map((item) => {
          const Component = item.component;
          return <Route key={item.path} path={item.path} element={<Component />} />;
        })}
      </Routes>
    </div>
  );
}

export default Purchase;
