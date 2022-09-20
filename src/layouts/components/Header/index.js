import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';

import { logoImg } from '~/assets/images';
import { useEffect, useRef } from 'react';
import Search from '~/components/Search';
import Menu from './components/Menu';

const cx = classNames.bind(styles);

function Header() {
  const headerRef = useRef(null);

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

  return (
    <div className={cx('wrapper', 'container')} ref={headerRef}>
      <div className={cx('logo')}>
        <Link to="/">
          <img src={logoImg} alt="logo" />
        </Link>
      </div>
      <Search />
      <Menu />
    </div>
  );
}

export default Header;
