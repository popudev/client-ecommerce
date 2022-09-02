import classNames from 'classnames/bind';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { formatMoney } from '~/config';
import styles from './ProductCart.module.scss';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Button from '../Button';
import { deleteProductToCart, changeQuantityToCart } from '~/services/cartService';

const cx = classNames.bind(styles);

function ProductCart({ quantity: quantityInit, id, data, handleDelete }) {
  const [quantity, setQuantity] = useState(quantityInit);
  const totalPrice = quantity * data.sale;

  const handlePlusQuantity = () => {
    setQuantity((prev) => prev + 1);
    changeQuantityToCart({
      productId: id,
      quantity: 1,
    });
  };

  const handleMinusQuantity = () => {
    if (quantity === 1) {
      //dispatch delete product in cart
      handleClickDelete();
      return;
    }
    setQuantity((prev) => prev - 1);
    changeQuantityToCart({
      productId: id,
      quantity: -1,
    });
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

  const handleClickDelete = async () => {
    await deleteProductToCart(id);
    handleDelete();
  };

  return (
    <tr className={cx('wrapper')}>
      <td className={cx('image')}>
        <Link to="/products/">
          <LazyLoadImage
            alt={''}
            width={'100%'}
            src={data.image} // use normal <img> attributes as props
            effect="blur"
          />
        </Link>
      </td>

      <td className={cx('title')}>{data.title}</td>
      <td className={cx('info')}>
        <span className={cx('price')}>{formatMoney(data.price)}</span>
        <span className={cx('sale')}>{formatMoney(data.sale)}</span>
      </td>

      <td className={cx('control')}>
        <div className={cx('control-quatity')}>
          <button className={cx('btn', 'minus-quantity')} onClick={handleMinusQuantity}>
            <i className="fa-solid fa-minus"></i>
          </button>
          <input
            type="text"
            value={quantity}
            onChange={handleChangeQuantity}
            onBlur={handleBlurQuantity}
            className={cx('inp-quantity')}
          ></input>
          <button className={cx('btn', 'plus-quantity')} onClick={handlePlusQuantity}>
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </td>

      <td className={cx('total_price')}>{formatMoney(totalPrice)}</td>
      <td className={cx('actions')}>
        <div className={cx('action')}>
          <Button outline onClick={handleClickDelete}>
            Delete
          </Button>
          <Button to="/" text>
            Details
          </Button>
        </div>
      </td>
    </tr>
  );
}

export default ProductCart;
