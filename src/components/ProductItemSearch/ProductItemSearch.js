import { useNavigate } from 'react-router-dom';

import { formatMoney } from '~/config';
import config from '~/config';

import ProductImage from '../ProductImage';

import styles from './ProductItemSearch.module.scss';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function ProductItemSearch({ info }) {
  const naviagator = useNavigate();

  return (
    <div
      className={cx('wrapper')}
      onClick={() => {
        naviagator(`${config.routes.detail}/${info._id}`);
      }}
    >
      <div className={cx('image')}>
        <ProductImage src={info.images} />
      </div>
      <div className={cx('content')}>
        <div className={cx('title')}>{info.title}</div>
        <div className={cx('price')}>{formatMoney(info.sale)}</div>
      </div>
    </div>
  );
}

export default ProductItemSearch;
