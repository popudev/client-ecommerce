import classNames from 'classnames/bind';

import { product1 } from '~/assets/images';
import { formatMoney } from '~/config';

import styles from './ProductItemCheckOut.module.scss';

const cx = classNames.bind(styles);

function ProductItemCheckOut({ data, border = false }) {
  return (
    <div className={cx('wrapper', { border })}>
      <div className={cx('image')}>
        <img src={product1} alt="" />
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
