import { Fragment } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';

import classNames from 'classnames/bind';

import config from '~/config';
import { useAuthenState } from '~/hooks';

import Avatar from '~/components/Avatar';

import Account from './pages/Account';
import Addresses from './pages/Addresses';
import Password from './pages/Password';
import Purchase from './pages/Purchase';
import styles from './Profile.module.scss';

const cx = classNames.bind(styles);

const menuNavigate = [
  {
    title: 'Account',
    icon: <i className="fa-solid fa-user"></i>,
    path: '',
    visible: true,
    component: Account,
  },
  {
    title: 'Password',
    icon: <i className="fa-solid fa-key"></i>,
    path: '/password',
    visible: false,
    component: Password,
  },
  {
    title: 'Addresses',
    icon: <i className="fa-sharp fa-solid fa-location-dot"></i>,
    path: '/addresses',
    visible: true,
    component: Addresses,
  },
  {
    title: 'Purchase',
    icon: <i className="fa-solid fa-bag-shopping"></i>,
    path: '/purchase',
    visible: true,
    component: Purchase,
  },
];

function Profile() {
  const { authenState } = useAuthenState();
  const { login } = authenState;
  const { currentUser } = login;
  const { pathname } = useLocation();

  if (currentUser?.provider === 'local') menuNavigate[1].visible = true;

  // useEffect(() => {
  //   if (!currentUser) {
  //     navigator(config.routes.login, { replace: true });
  //   }
  // });

  return currentUser ? (
    <div className={cx('wrapper', 'container', 'main')}>
      <div className={cx('sidebar')}>
        <div className={cx('avatar')}>
          <Avatar avatar={currentUser?.avatar} className={cx('avatar__image')} />
          <div className={cx('fullname')}>{currentUser?.fullname}</div>
        </div>

        <div className={cx('navigate')}>
          {menuNavigate.map((item, index) => {
            return item.visible ? (
              <Link
                key={item.path}
                to={config.routes.profile + item.path}
                className={cx('navigate__item', {
                  active: pathname === config.routes.profile + item.path,
                })}
              >
                <div className={cx('navigate__icon')}>{item.icon}</div>
                <div className={cx('navigate__title')}>{item.title}</div>
              </Link>
            ) : (
              <Fragment key={item.path} />
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
