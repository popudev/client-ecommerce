import classNames from 'classnames/bind';
import styles from './ProductItemSearch.module.scss';
import { product1 } from '~/assets/images';
import { useNavigate } from 'react-router-dom';
import { formatMoney } from '~/config';

const cx = classNames.bind(styles);

function ProductItemSearch({ info }) {
  const naviagator = useNavigate();

  return (
    <div
      className={cx('wrapper')}
      onClick={() => {
        naviagator('/shop');
      }}
    >
      <div className={cx('image')}>
        <img src={info.image} alt="" />
      </div>
      <div className={cx('content')}>
        <div className={cx('title')}>{info.title}</div>
        <div className={cx('price')}>{formatMoney(info.sale)}</div>
      </div>
    </div>
  );
}

export default ProductItemSearch;
