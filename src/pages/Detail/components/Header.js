import classNames from 'classnames/bind';

import Button from '~/components/Button';
import Skeleton from '~/components/Skeleton';

import styles from '../Detail.module.scss';

const cx = classNames.bind(styles);

const Header = ({ info }) => {
  return (
    <div className={cx('header')}>
      <div className={cx('header__action')}>
        <Button text to="/">
          Popu Shop
        </Button>
        <span>{'>'}</span>
        <Button text to="/shop">
          Shop
        </Button>
        <span>{'>'}</span>
        <Button text>{info?.categoryTitle || 'Iphone'}</Button>
        <span>{'>'}</span>
        <Button text disabled className={cx('header__product-title')}>
          {info?.title}
        </Button>
      </div>
    </div>
  );
};

Header.Loading = () => {
  return (
    <div className={cx('header', 'loading__mobile')}>
      {/* <div className={cx('header__action')}></div> */}
      <Skeleton width="50%" height={60} borderRadius={10} />
    </div>
  );
};

export default Header;
