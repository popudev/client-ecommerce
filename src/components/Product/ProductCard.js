import classNames from 'classnames/bind';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatMoney } from '~/config';
import styles from './ProductCard.module.scss';

const cx = classNames.bind(styles);

function ProductCard({ data }) {
  const [quantity, setQuantity] = useState(1);

  const hanldePlusQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const hanldeMinusQuantity = () => {
    if (quantity === 1) return;
    setQuantity((prev) => prev - 1);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('image')}>
        <Link to="/products/">
          <img src={data.image} alt="" />
        </Link>
      </div>
      <div className={cx('context')}>
        <p className={cx('title')}>{data.title}</p>
        <div className={cx('info')}>
          <span className={cx('price')}>{formatMoney(data.price)}</span>
          <span className={cx('sale')}>{formatMoney(data.sale)}</span>
        </div>
      </div>
      <div className={cx('control')}>
        <div className={cx('control-quatity')}>
          <button className={cx('minus-quantity')} onClick={hanldeMinusQuantity}>
            <i class="fa-solid fa-minus"></i>
          </button>
          <input type="text" value={quantity} disabled="true" className={cx('inp-quantity')}></input>
          <button className={cx('plus-quantity')} onClick={hanldePlusQuantity}>
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>

        <button className={cx('btn-add-to-cart')}>
          <i class="fa-solid fa-cart-plus"></i>
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
