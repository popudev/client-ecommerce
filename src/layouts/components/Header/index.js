import { Link, useLocation, useNavigate } from 'react-router-dom';

import styles from './Header.module.scss';
import classNames from 'classnames/bind';

import { logoImg } from '~/assets/images';
import { avatarDefault } from '~/assets/images';
import { useEffect, useRef } from 'react';

import Search from '~/components/Search';
import Tippy from '~/components/Tippy';
import Popper from '~/components/Popper';

import { useGlobalState } from '~/hooks';
import { logoutUser } from '~/services/authenService';
import overplay from '~/components/OverPlay/core/overplay';

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
  },
  {
    title: 'Admin',
    icon: <i className="fa-solid fa-screwdriver-wrench"></i>,
    path: '/admin',
  },
  {
    title: 'Infomation',
    icon: <i className="fa-solid fa-user"></i>,
    path: '/',
  },
  {
    title: 'My Orders',
    icon: <i className="fa-solid fa-file-invoice-dollar"></i>,
    path: '/shop',
  },
  {
    title: 'Logout',
    icon: <i className="fa-solid fa-arrow-right-from-bracket"></i>,
    path: '',
    separate: true,
    onClick: (dispatch, navigator) => {
      logoutUser(dispatch, navigator);
    },
  },
];

function Header() {
  const { globalState, dispatch } = useGlobalState();
  const currentUser = globalState.login.currentUser;

  const navigator = useNavigate();
  const { pathname } = useLocation();
  const indexItemNavActive = menuNav.findIndex((e) => e.path === pathname);
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (document.documentElement.scrollTop > 60) {
        headerRef.current.classList.add(cx('shrink'));
      } else {
        headerRef.current.classList.remove(cx('shrink'));
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const menuToggle = () => {
    menuRef.current.classList.toggle(cx('active'));
    if (menuRef.current.classList.value.includes(cx('active'))) {
      document.documentElement.style.overflowY = 'hidden';
    } else {
      document.documentElement.style.overflowY = 'overlay';
    }
  };

  return (
    <div className={cx('wrapper', 'container')} ref={headerRef}>
      <div className={cx('logo')}>
        <Link to="/">
          <img src={logoImg} alt="logo" />
        </Link>
      </div>
      <Search />
      <div className={cx('menu')} ref={menuRef}>
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
              if (item.title === 'Login')
                return (
                  <Tippy
                    key={item.path}
                    width="auto"
                    placement="bottom-end"
                    render={() => (
                      <Popper width={200}>
                        {menuUser.map((e, index) => {
                          if (index === 0) e.title = currentUser?.fullname;
                          return (
                            <Link
                              to={e.path}
                              key={e.path}
                              onClick={() => {
                                if (typeof e.onClick === 'function') e.onClick(dispatch, navigator);
                              }}
                            >
                              <div className={cx('menu_user-item', { separate: e.separate })}>
                                <div className={cx('menu_user-icon')}>{e.icon}</div>
                                <span className={cx('menu_user-title')}>{e.title}</span>
                              </div>
                            </Link>
                          );
                        })}
                      </Popper>
                    )}
                  >
                    <Link to={item.path} key={item.path}>
                      <div className={cx('avatar')}>
                        <img src={avatarDefault} alt="" />
                      </div>
                    </Link>
                  </Tippy>
                );
              return (
                <Link to={item.path} key={item.path} onClick={menuToggle}>
                  <div className={cx('menu__item', { active: indexItemNavActive === index })}>
                    <div className={cx('item__logo')}>{item.icon}</div>
                    <p className={cx('item__title')}>{item.title}</p>
                  </div>
                </Link>
              );
            })}

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

export default Header;
