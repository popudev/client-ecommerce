import { Fragment } from 'react';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';

import config from '~/config';
import { useAuthenState } from '~/hooks';

import Avatar from '~/components/Avatar';

import Account from './pages/Account';
import Addresses from './pages/Addresses';
import Password from './pages/Password';
import Purchase from './pages/Purchase';
import styles from './Profile.module.scss';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const menuNavigate = [
  {
    title: 'Account',
    icon: <i className="fa-solid fa-user"></i>,
    path: config.routes.profile.account,
    link: config.routes.profile.account.href,
    component: Account,
  },
  {
    title: 'Password',
    icon: <i className="fa-solid fa-key"></i>,
    path: config.routes.profile.password,
    link: config.routes.profile.password.href,
    disable: true,
    component: Password,
  },
  {
    title: 'Addresses',
    icon: <i className="fa-sharp fa-solid fa-location-dot"></i>,
    path: config.routes.profile.addresses,
    link: config.routes.profile.addresses.href,
    component: Addresses,
  },
  {
    title: 'Purchase',
    icon: <i className="fa-solid fa-bag-shopping"></i>,
    path: config.routes.profile.purchase + '/*',
    link: config.routes.profile.purchase.href,
    component: Purchase,
  },
  {
    path: '/*',
    disable: true,
    component: () => <Navigate to="/notfound" replace />,
  },
];

function Profile() {
  const { authenState } = useAuthenState();
  const { login } = authenState;
  const { currentUser } = login;
  const { pathname } = useLocation();

  if (currentUser?.provider === 'local') menuNavigate[1].disable = false;

  return currentUser ? (
    <div className={cx('wrapper', 'container', 'main')}>
      <div className={cx('sidebar')}>
        <div className={cx('avatar')}>
          <Avatar avatar={currentUser?.avatar} className={cx('avatar__image')} />
          <div className={cx('fullname')}>{currentUser?.fullname}</div>
        </div>

        <div className={cx('navigate')}>
          {menuNavigate.map((item) => {
            if (item.disable) return <Fragment key={item.path} />;

            return (
              <Link
                key={item.path}
                to={item.link}
                className={cx('navigate__item', {
                  active: pathname.includes(item.link),
                })}
              >
                <div className={cx('navigate__icon')}>{item.icon}</div>
                <div className={cx('navigate__title')}>{item.title}</div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className={cx('content')}>
        <Routes>
          {menuNavigate.map((item) => {
            const Component = item.component;
            return <Route key={item.path} path={item.path} element={<Component />} />;
          })}
        </Routes>
      </div>
    </div>
  ) : (
    <div className={cx('wrapper', 'container', 'main')}></div>
  );
}

export default Profile;
