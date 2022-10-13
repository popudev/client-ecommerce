import { Fragment, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { avatarDefault } from '~/assets/images';
import config from '~/config';
import { useAuthenState } from '~/hooks';
import { logoutUser } from '~/services/authenService';

import Popper from '~/components/Popper';
import Tippy from '~/components/Tippy';

import styles from './Menu.module.scss';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const menuNav = [
  {
    id: 1,
    title: 'Home',
    icon: <i className="fa-solid fa-house-chimney"></i>,
    path: config.routes.home,
  },
  {
    id: 2,
    title: 'Shop',
    icon: <i className="fa-solid fa-shop"></i>,
    path: config.routes.shop,
  },
  {
    id: 3,
    title: 'Cart',
    icon: <i className="fa-solid fa-cart-shopping"></i>,
    path: config.routes.cart,
  },
  {
    id: 4,
    title: 'Login',
    icon: <i className="fa-solid fa-user"></i>,
    path: config.routes.login,
  },
];

const menuUser = [
  {
    id: 5,
    path: '',
    title: 'Hello',
    separate: true,
  },
  {
    id: 6,
    title: 'Admin',
    icon: <i className="fa-solid fa-screwdriver-wrench"></i>,
    path: config.routes.admin,
    disable: true,
  },
  {
    id: 7,
    title: 'Profile',
    icon: <i className="fa-solid fa-user"></i>,
    path: config.routes.profile.account.href,
  },
  {
    id: 8,
    title: 'Purchase',
    icon: <i className="fa-solid fa-file-invoice-dollar"></i>,
    path: config.routes.profile.purchase.href,
    separate: true,
  },
  {
    id: 9,
    title: 'Logout',
    icon: <i className="fa-solid fa-arrow-right-from-bracket"></i>,
    path: '',
    onClick: (dispatch, navigator) => {
      logoutUser(dispatch, navigator);
    },
  },
];

function Menu() {
  const menuRef = useRef(null);
  const { authenState, authenDispatch } = useAuthenState();
  const currentUser = authenState.login.currentUser;

  const navigator = useNavigate();
  const { pathname } = useLocation();

  if (currentUser) {
    menuUser[0].title = currentUser?.username || currentUser?.fullname;
  }

  if (currentUser?.admin) {
    menuUser[1].disable = false;
  }

  const menuToggle = () => {
    menuRef.current.classList.toggle(cx('active'));
    if (menuRef.current.classList.value.includes(cx('active'))) {
      document.documentElement.style.overflowY = 'hidden';
    } else {
      document.documentElement.style.overflowY = 'overlay';
    }
  };

  const renderMenuUser = () => {
    return (
      <Popper minWidth={200} width={'max-content'}>
        {menuUser.map((item, index) => {
          if (item.disable) return <Fragment key={item.id} />;

          let Component = Link;
          if (item.title === 'Logout') Component = 'div';

          return (
            <Component
              key={item.id}
              to={item.path}
              onClick={() => {
                if (typeof item.onClick === 'function') item.onClick(authenDispatch, navigator);
              }}
              className={cx({ username: index === 0 })}
            >
              <div className={cx('menu_user-item', { separate: item.separate })}>
                {!!index && <div className={cx('menu_user-icon')}>{item.icon}</div>}
                <span className={cx('menu_user-title')}>{item.title}</span>
              </div>
            </Component>
          );
        })}
      </Popper>
    );
  };

  const renderMenuNav = () => {
    let element = [];

    if (!currentUser) {
      element = menuNav.map((item) => {
        return (
          <Link to={item.path} key={item.id} onClick={menuToggle}>
            <div className={cx('menu__item', { active: item.path === pathname })}>
              <div className={cx('item__logo')}>{item.icon}</div>
              <p className={cx('item__title')}>{item.title}</p>
            </div>
          </Link>
        );
      });
    } else {
      element = menuNav.map((item) => {
        return item.title === 'Login' ? (
          <Tippy
            key={item.id}
            className={cx('tippy_wrapper_avatar')}
            width="auto"
            placement="bottom-end"
            renderForMobile={false}
            render={renderMenuUser}
          >
            <Link to={item.path}>
              <div className={cx('avatar')}>
                <img src={currentUser?.avatar || avatarDefault} alt="" />
              </div>
            </Link>
          </Tippy>
        ) : (
          <Link to={item.path} key={item.id} onClick={menuToggle}>
            <div className={cx('menu__item', { active: item.path === pathname })}>
              <div className={cx('item__logo')}>{item.icon}</div>
              <p className={cx('item__title')}>{item.title}</p>
            </div>
          </Link>
        );
      });
    }

    return element;
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')} ref={menuRef}>
        <div className={cx('avatar_mobile')}>
          {currentUser && (
            <Link to={config.routes.profile.account.href}>
              <div className={cx('avatar')}>
                <img src={currentUser?.avatar || avatarDefault} alt="" />
              </div>
            </Link>
          )}

          <span>{currentUser?.username || currentUser?.fullname}</span>

          {currentUser?.admin && (
            <Link to={config.routes.admin}>
              <div className={cx('menu__item', { active: config.routes.admin === pathname })}>
                <div className={cx('item__logo')}>{menuUser[1].icon}</div>
                <p className={cx('item__title')}>{menuUser[1].title}</p>
              </div>
            </Link>
          )}
        </div>
        <div className={cx('context')}>
          <div className={cx('main')}>{renderMenuNav()}</div>

          {currentUser && (
            <div className={cx('mobile')}>
              {menuUser.map((item, index) => {
                if (item.disable || index === 0 || item.title === 'Admin')
                  return <Fragment key={item.id} />;
                return (
                  <Link
                    to={item.path}
                    key={item.id}
                    onClick={() => {
                      if (typeof item.onClick === 'function')
                        item.onClick(authenDispatch, navigator);
                      menuToggle();
                    }}
                  >
                    <div className={cx('menu__item', { active: item.path === pathname })}>
                      <div className={cx('item__logo')}>{item.icon}</div>
                      <p className={cx('item__title')}>{item.title}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        <div className={cx('close-menu-mobile')} onClick={menuToggle}>
          <i className="fa-solid fa-circle-xmark"></i>
        </div>
      </div>
      <div className={cx('open-menu-mobile')} onClick={menuToggle}>
        <i className="fa-solid fa-bars-staggered"></i>
      </div>
    </div>
  );
}

export default Menu;
