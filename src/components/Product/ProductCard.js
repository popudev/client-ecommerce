import classNames from 'classnames/bind';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { formatMoney } from '~/config';
import styles from './ProductCard.module.scss';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { addProductToCart } from '~/services/cartService';

const cx = classNames.bind(styles);

function ProductCard({ data, isHome }) {
  const [quantity, setQuantity] = useState(1);

  const handlePlusQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleMinusQuantity = () => {
    if (quantity === 1) return;
    setQuantity((prev) => prev - 1);
  };

  const handleChangeQuantity = (e) => {
    const number = Number.parseInt(e.target.value);
    if (!number) setQuantity('');
    else {
      setQuantity(number);
    }
  };

  const handleBlurQuantity = (e) => {
    const number = Number.parseInt(e.target.value);
    if (!number) setQuantity(1);
  };

  const handleClick = () => {
    addProductToCart({
      productId: data.id,
      quantity: quantity,
    });
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('image')}>
        <Link to="/products/">
          <LazyLoadImage
            alt={''}
            width={'100%'}
            src={data.image} // use normal <img> attributes as props
            effect="blur"
          />
        </Link>

        <div className={cx('control', 'control-under-image', { active: !isHome })}>
          <div className={cx('control-quatity')}>
            <button className={cx('minus-quantity')} onClick={handleMinusQuantity}>
              <i className="fa-solid fa-minus"></i>
            </button>
            <input
              type="text"
              value={quantity}
              onChange={handleChangeQuantity}
              onBlur={handleBlurQuantity}
              className={cx('inp-quantity')}
            ></input>
            <button className={cx('plus-quantity')} onClick={handlePlusQuantity}>
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>

          <button className={cx('btn-add-to-cart')} onClick={handleClick}>
            <i className="fa-solid fa-cart-plus"></i>
          </button>
        </div>
      </div>

      <div className={cx('context')}>
        <p className={cx('title')}>{data.title}</p>
        <div className={cx('info')}>
          <span className={cx('price')}>{formatMoney(data.price)}</span>
          <span className={cx('sale')}>{formatMoney(data.sale)}</span>
        </div>
      </div>

      <div className={cx('control', { active: isHome })}>
        <div className={cx('control-quatity')}>
          <button className={cx('minus-quantity')} onClick={handleMinusQuantity}>
            <i className="fa-solid fa-minus"></i>
          </button>
          <input
            type="text"
            value={quantity}
            onChange={handleChangeQuantity}
            onBlur={handleBlurQuantity}
            className={cx('inp-quantity')}
          ></input>
          <button className={cx('plus-quantity')} onClick={handlePlusQuantity}>
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>

        <button className={cx('btn-add-to-cart')} onClick={handleClick}>
          <i className="fa-solid fa-cart-plus"></i>
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
