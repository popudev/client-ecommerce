import classNames from 'classnames/bind';
import styles from './PriceRangeSlider.module.scss';

const cx = classNames.bind(styles);

function PriceRangeSlider() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('slider')}></div>
      <input type="range" />
      <input type="range" />
    </div>
  );
}

export default PriceRangeSlider;
