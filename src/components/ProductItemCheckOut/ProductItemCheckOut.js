import { formatMoney } from '~/config';

import ProductImage from '../ProductImage';

import styles from './ProductItemCheckOut.module.scss';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function ProductItemCheckOut({ data, border = false }) {
  return (
    <div className={cx('wrapper', { border })}>
      <div className={cx('image')}>
        <ProductImage src={data?.product?.images} />
      </div>
      <div className={cx('info')}>
        <h4 className={cx('info_title')}>{data?.product?.title}</h4>
        <p>
          <span>Price: </span>
          <span className={cx('info_price')}>{formatMoney(data?.product?.sale)}</span>
        </p>
        <p>
          <span>Quantity: </span>
          <span className={cx('info_quantity')}>{data.quantity}</span>
        </p>
        <p>
          <span>Total: </span>
          <span className={cx('info_total')}>
            {formatMoney(data?.product?.sale * data.quantity)}
          </span>
        </p>
      </div>
    </div>
  );
}

export default ProductItemCheckOut;
