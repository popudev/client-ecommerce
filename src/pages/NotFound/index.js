import { notFoundImg } from '~/assets/images';
import classNames from 'classnames/bind';
import styles from './NotFound.module.scss';

const cx = classNames.bind(styles);

function NotFound() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('image')}>
        <img src={notFoundImg} alt="" />
      </div>
    </div>
  );
}

export default NotFound;
