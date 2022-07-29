import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import Grid from '~/components/Gird';
import styles from './Footer.module.scss';
import { logoImg } from '~/assets/images';

const cx = classNames.bind(styles);

const footerContactLinks = [
  {
    display: '0999 999 999',
    icon: <i class="fa-solid fa-mobile-screen-button"></i>,
  },
  {
    display: 'popushop@gmail.com',
    icon: <i class="fa-solid fa-envelope"></i>,
  },
  {
    display: 'popushop.5322',
    icon: <i class="fa-brands fa-square-facebook"></i>,
  },
  {
    display: 'popudev',
    icon: <i class="fa-brands fa-square-github"></i>,
  },
];

const footerAboutLinks = [
  {
    display: 'Introduce',
    path: '/about',
  },
  {
    display: 'Contact',
    path: '/about',
  },
  {
    display: 'Recruit',
    path: '/about',
  },
  {
    display: 'News',
    path: '/about',
  },
  {
    display: 'Shop system',
    path: '/about',
  },
];

const footerCustomerLinks = [
  {
    display: 'Return Policy',
    path: '/about',
  },
  {
    display: 'Warranty Policy',
    path: '/about',
  },
  {
    display: 'Refund Policy',
    path: '/about',
  },
];
function Footer() {
  const contentToggle = (e) => {
    const item = e.target.parentElement.parentElement.parentElement;
    item.classList.toggle(cx('active'));
  };

  return (
    <footer className={cx('wrapper')}>
      <Grid col={4} mdCol={2} smCol={1} gap={10}>
        <div className={cx('item')}>
          <Link to="/">
            <div className={cx('logo')}>
              <img src={logoImg} alt="logo" />
            </div>
          </Link>
        </div>

        <div className={cx('item')}>
          <div className={cx('item__title')}>
            <div>CONTACT</div>
            <div className={cx('toggle-content-mobile')} onClick={contentToggle}>
              <i class="fa-solid fa-angle-down"></i>
            </div>
          </div>
          <div className={cx('item__content')}>
            {footerContactLinks.map((e, i) => {
              return (
                <p key={i}>
                  <div className={cx('item-icon')}>{e.icon}</div>
                  <strong>{e.display}</strong>
                </p>
              );
            })}
          </div>
        </div>
        <div className={cx('item')}>
          <div className={cx('item__title')}>
            <div>ABOUT</div>
            <div className={cx('toggle-content-mobile')} onClick={contentToggle}>
              <i class="fa-solid fa-angle-down"></i>
            </div>
          </div>
          <div className={cx('item__content')}>
            {footerAboutLinks.map((e, i) => {
              return (
                <Link to={e.path} key={i}>
                  <p>{e.display}</p>
                </Link>
              );
            })}
          </div>
        </div>
        <div className={cx('item')}>
          <div className={cx('item__title')}>
            <div>POLICY</div>
            <div className={cx('toggle-content-mobile')} onClick={contentToggle}>
              <i class="fa-solid fa-angle-down"></i>
            </div>
          </div>
          <div className={cx('item__content')}>
            {footerCustomerLinks.map((e, i) => {
              return (
                <Link to={e.path} key={i}>
                  <p>{e.display}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </Grid>
    </footer>
  );
}

export default Footer;
