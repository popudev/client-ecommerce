import { Link, useLocation, useNavigate } from 'react-router-dom';
import { avatarDefault } from '~/assets/images';
import Tippy from '~/components/Tippy';
import Popper from '~/components/Popper';
import { logoutUser } from '~/services/authenService';
import { Fragment, useRef } from 'react';
import { useGlobalState } from '~/hooks';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

const menuNav = [
  {
    id: 1,
    title: 'Home',
    icon: <i className="fa-solid fa-house-chimney"></i>,
    path: '/',
  },
  {
    id: 2,
    title: 'Shop',
    icon: <i className="fa-solid fa-shop"></i>,
    path: '/shop',
  },
  {
    id: 3,
    title: 'Cart',
    icon: <i className="fa-solid fa-cart-shopping"></i>,
    path: '/cart',
  },
  {
    id: 4,
    title: 'Login',
    icon: <i className="fa-solid fa-user"></i>,
    path: '/login',
  },
];

const menuUser = [
  {
    id: 5,
    title: 'Hello',
    path: '/infomation',
    visable: true,
    separate: true,
  },
  {
    id: 6,
    title: 'Admin',
    icon: <i className="fa-solid fa-screwdriver-wrench"></i>,
    path: '/admin',
    visable: false,
  },
  {
    id: 7,
    title: 'Infomation',
    icon: <i className="fa-solid fa-user"></i>,
    path: '/infomation',
    visable: true,
  },
  {
    id: 8,
    title: 'Orders',
    icon: <i className="fa-solid fa-file-invoice-dollar"></i>,
    path: '/orders',
    separate: true,
    visable: true,
  },
  {
    id: 9,
    title: 'Logout',
    icon: <i className="fa-solid fa-arrow-right-from-bracket"></i>,
    path: '',

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
  const indexItemUserNavActive = menuUser.findIndex((e) => e.path === pathname);

  if (currentUser?.admin) {
    menuUser[1].visable = true;
  } else {
    menuUser[1].visable = false;
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
          if (index === 0) {
            return (
              <div className={cx('menu_user-item', 'username', { separate: item.separate })}>
                <span className={cx('menu_user-title')}>{currentUser?.username}</span>
              </div>
            );
          }
          if (!item.visable) return <Fragment key={item.id}></Fragment>;
          return (
            <Link
              to={item.path}
              key={item.id}
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

  const renderMenuNav = () => {
    let element = [];

    if (!currentUser) {
      element = menuNav.map((item, index) => {
        return (
          <Link to={item.path} key={item.id} onClick={menuToggle}>
            <div className={cx('menu__item', { active: indexItemNavActive === index })}>
              <div className={cx('item__logo')}>{item.icon}</div>
              <p className={cx('item__title')}>{item.title}</p>
            </div>
          </Link>
        );
      });
    } else {
      element = menuNav.map((item, index) => {
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
                <img src={avatarDefault} alt="" />
              </div>
            </Link>
          </Tippy>
        ) : (
          <Link to={item.path} key={item.id} onClick={menuToggle}>
            <div className={cx('menu__item', { active: indexItemNavActive === index })}>
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
          <Link to="/infomation">
            <div className={cx('avatar')}>
              <img src={avatarDefault} alt="" />
            </div>
          </Link>
          <span>{currentUser?.username}</span>
        </div>
        <div className={cx('context')}>
          <div className={cx('main')}>{renderMenuNav()}</div>

          <div className={cx('mobile')}>
            {currentUser &&
              menuUser.map((item, index) => {
                if (!index) return <Fragment key={item.id}></Fragment>;
                if (!item.visable) return <Fragment key={item.id}></Fragment>;
                return (
                  <Link
                    to={item.path}
                    key={item.id}
                    onClick={() => {
                      if (typeof item.onClick === 'function') item.onClick(dispatch, navigator);
                      menuToggle();
                    }}
                  >
                    <div className={cx('menu__item', { active: indexItemUserNavActive === index })}>
                      <div className={cx('item__logo')}>{item.icon}</div>
                      <p className={cx('item__title')}>{item.title}</p>
                    </div>
                  </Link>
                );
              })}
          </div>
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
