import classNames from 'classnames/bind';
import styles from './Banner.module.scss';

const cx = classNames.bind(styles);

function Banner({ image }) {
  return (
    <div className={cx('wrapper')}>
      <img src={image} alt="" />
    </div>
  );
}

export default Banner;
