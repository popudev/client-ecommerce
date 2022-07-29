import classNames from 'classnames/bind';
import styles from './ProductCard.module.scss';

const cx = classNames.bind(styles);

function ProductCard({ data }) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('image')}>
        <img src={data.image} alt="" />
      </div>
      <div className={cx('context')}>
        <p className={cx('title')}>{data.title}</p>
        <span className={cx('price')}>{data.price}</span>
        <span className={cx('sale')}>{data.sale}</span>
      </div>
      <div className={cx('control')}>
        <div className={cx('control-quatity')}>
          <button className={cx('minus-quantity')}></button>
          <input className={cx('inp-quantity')}></input>
          <button className={cx('plus-quantity')}></button>
        </div>

        <button className={cx('btn-add-to-cart')}>
          <i class="fa-solid fa-cart-plus"></i>
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
