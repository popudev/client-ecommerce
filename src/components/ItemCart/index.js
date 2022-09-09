import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import config, { formatMoney } from '~/config';
import styles from './ItemCart.module.scss';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Button from '../Button';
import { deleteProductToCart, changeQuantityToCart } from '~/services/cartService';
import { product1 } from '~/assets/images';

const cx = classNames.bind(styles);

function ItemCart({ data, handleDelete, handleChange }) {
  const [quantity, setQuantity] = useState(data.quantity);
  const totalPrice = quantity * data.product.sale;

  const handlePlusQuantity = async () => {
    const isSuccess = await changeQuantityToCart({
      productId: data.product._id,
      quantity: 1,
    });
    if (isSuccess) {
      setQuantity((prev) => prev + 1);
      handleChange();
    }
  };

  const handleMinusQuantity = async () => {
    if (quantity === 1) {
      //dispatch delete product in cart
      handleClickDelete();
      return;
    }

    const isSuccess = await changeQuantityToCart({
      productId: data.product._id,
      quantity: -1,
    });

    if (isSuccess) {
      setQuantity((prev) => prev - 1);
      handleChange();
    }
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
    const isSuccess = await deleteProductToCart(data._id);
    if (isSuccess) handleDelete();
  };

  return (
    <tr className={cx('wrapper')}>
      <td className={cx('image')}>
        <Link to={`${config.routes.detail}/${data._id}`}>
          <LazyLoadImage
            alt={''}
            width={'100%'}
            src={product1} // use normal <img> attributes as props
            effect="blur"
          />
        </Link>
      </td>

      <td className={cx('title')}>{data.product.title}</td>
      <td className={cx('info')}>
        <span className={cx('price')}>{formatMoney(data.product.price)}</span>
        <span className={cx('sale')}>{formatMoney(data.product.sale)}</span>
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
          <Button to={`/product/${data.product._id}`} text>
            Details
          </Button>
        </div>
      </td>
    </tr>
  );
}

export default ItemCart;
