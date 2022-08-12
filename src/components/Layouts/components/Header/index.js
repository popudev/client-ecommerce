import { Link, useLocation } from 'react-router-dom';

import styles from './Header.module.scss';
import classNames from 'classnames/bind';

import { logoImg } from '~/assets/images';
import { useEffect, useRef } from 'react';

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

function Header() {
  const { pathname } = useLocation();
  const indexItemNavActive = menuNav.findIndex((e) => e.path === pathname);

  const headerRef = useRef(null);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (document.documentElement.scrollTop > 60) {
        headerRef.current.classList.add(cx('shrink'));
      } else {
        headerRef.current.classList.remove(cx('shrink'));
      }
    });

    return () => {
      window.removeEventListener('scroll', () => {});
    };
  }, []);

  const menuRef = useRef(null);
  const menuToggle = () => {
    document.documentElement.scrollTop = 0;
    menuRef.current.classList.toggle(cx('active'));
  };

  return (
    <div className={cx('wrapper', 'container')} ref={headerRef}>
      <div className={cx('logo')}>
        <Link to="/">
          <img src={logoImg} alt="logo" />
        </Link>
      </div>
      <div className={cx('search')}>
        <input className={cx('search__input')} placeholder="Search..."></input>
        <button className={cx('search__btn')}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      <div className={cx('menu')} ref={menuRef}>
        {menuNav.map((item, index) => {
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
