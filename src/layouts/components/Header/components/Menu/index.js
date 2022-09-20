import { Link, useLocation, useNavigate } from 'react-router-dom';
import { avatarDefault } from '~/assets/images';
import Tippy from '~/components/Tippy';
import Popper from '~/components/Popper';
import { logoutUser } from '~/services/authenService';
import { useEffect, useRef } from 'react';
import { useGlobalState } from '~/hooks';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import { renderIntoDocument } from 'react-dom/test-utils';

const cx = classNames.bind(styles);

const menuNav = [
  {
    title: 'Home',
    icon: <i className="fa-solid fa-house-chimney"></i>,
    path: '/',
  },
  {
    title: 'Shop',
    icon: <i className="fa-solid fa-shop"></i>,
    path: '/shop',
  },
  {
    title: 'Cart',
    icon: <i className="fa-solid fa-cart-shopping"></i>,
    path: '/cart',
  },
  {
    title: 'Login',
    icon: <i className="fa-solid fa-user"></i>,
    path: '/login',
  },
];

const menuUser = [
  {
    title: 'Hello',
    path: '/user',
    visable: true,
  },
  {
    title: 'Admin',
    icon: <i className="fa-solid fa-screwdriver-wrench"></i>,
    path: '/admin',
    visable: false,
  },
  {
    title: 'Infomation',
    icon: <i className="fa-solid fa-user"></i>,
    path: '/',
    visable: true,
  },
  {
    title: 'Orders',
    icon: <i className="fa-solid fa-file-invoice-dollar"></i>,
    path: '/shop',
    visable: true,
  },
  {
    title: 'Logout',
    icon: <i className="fa-solid fa-arrow-right-from-bracket"></i>,
    path: '',
    separate: true,
    visable: true,

    onClick: (dispatch, navigator) => {
      logoutUser(dispatch, navigator);
    },
  },
];

function Menu() {
  const menuRef = useRef(null);
  const { globalState, dispatch } = useGlobalState();
  const currentUser = globalState.login.currentUser;

  const navigator = useNavigate();
  const { pathname } = useLocation();
  const indexItemNavActive = menuNav.findIndex((e) => e.path === pathname);

  if (currentUser?.admin) {
    menuUser[1].visable = true;
  } else {
    menuUser[1].visable = false;
  }
  const menuToggle = () => {
    menuRef.current.classList.toggle(cx('active'));
    console.log('helo');
    if (menuRef.current.classList.value.includes(cx('active'))) {
      document.documentElement.style.overflowY = 'hidden';
    } else {
      document.documentElement.style.overflowY = 'overlay';
    }
  };

  const renderMenuUser = () => {
    return (
      <Popper width={200}>
        {menuUser.map((item, index) => {
          if (index === 0) item.title = currentUser?.fullname;
          if (!item.visable) return <></>;
          return (
            <Link
              to={item.path}
              key={item.path}
              onClick={() => {
                if (typeof item.onClick === 'function') item.onClick(dispatch, navigator);
              }}
            >
              <div className={cx('menu_user-item', { separate: item.separate })}>
                <div className={cx('menu_user-icon')}>{item.icon}</div>
                <span className={cx('menu_user-title')}>{item.title}</span>
              </div>
            </Link>
          );
        })}
      </Popper>
    );
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')} ref={menuRef}>
        <div className={cx('main')}>
          {!currentUser
            ? menuNav.map((item, index) => {
                return (
                  <Link to={item.path} key={item.path} onClick={menuToggle}>
                    <div className={cx('menu__item', { active: indexItemNavActive === index })}>
                      <div className={cx('item__logo')}>{item.icon}</div>
                      <p className={cx('item__title')}>{item.title}</p>
                    </div>
                  </Link>
                );
              })
            : menuNav.map((item, index) => {
                return item.title === 'Login' ? (
                  <Tippy
                    key={item.path}
                    className={cx('avatar_mobile')}
                    width="auto"
                    placement="bottom-end"
                    mobile={false}
                    render={renderMenuUser}
                  >
                    <Link to={item.path} key={item.path}>
                      <div className={cx('avatar')}>
                        <img src={avatarDefault} alt="" />
                      </div>
                    </Link>
                  </Tippy>
                ) : (
                  <Link to={item.path} key={item.path} onClick={menuToggle}>
                    <div className={cx('menu__item', { active: indexItemNavActive === index })}>
                      <div className={cx('item__logo')}>{item.icon}</div>
                      <p className={cx('item__title')}>{item.title}</p>
                    </div>
                  </Link>
                );
              })}
        </div>

        <div className={cx('mobile')}>
          {currentUser &&
            menuUser.map((item, index) => {
              if (!index) return <></>;
              if (!item.visable) return <></>;
              return (
                <Link
                  to={item.path}
                  key={item.path}
                  onClick={() => {
                    if (typeof item.onClick === 'function') item.onClick(dispatch, navigator);
                    menuToggle();
                  }}
                >
                  <div className={cx('menu__item', { active: indexItemNavActive === index })}>
                    <div className={cx('item__logo')}>{item.icon}</div>
                    <p className={cx('item__title')}>{item.title}</p>
                  </div>
                </Link>
              );
            })}
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
