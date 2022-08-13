import classNames from 'classnames/bind';
import styles from './ProductItemSearch.module.scss';
import { product1 } from '~/assets/images';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function ProductItemSearch() {
  const naviagator = useNavigate();

  return (
    <div
      className={cx('wrapper')}
      onClick={() => {
        naviagator('/shop');
      }}
    >
      <div className={cx('image')}>
        <img src={product1} alt="" />
      </div>
      <div className={cx('content')}>
        <div className={cx('title')}>Chau Phu Thinh Dep Troai Pho Mai Que</div>
        <div className={cx('price')}>$1.000.000,00</div>
      </div>
    </div>
  );
}

export default ProductItemSearch;
