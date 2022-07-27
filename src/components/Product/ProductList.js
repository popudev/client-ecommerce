import classNames from 'classnames/bind';
import styles from './ProductList.module.scss';
const cx = classNames.bind(styles);

function ProductList({ children }) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('box')}>{children}</div>
      <div className={cx('pagination')}></div>
    </div>
  );
}

export default ProductList;
