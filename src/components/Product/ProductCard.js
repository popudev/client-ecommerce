import classNames from 'classnames/bind';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { formatMoney } from '~/config';
import styles from './ProductCard.module.scss';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { product1 } from '~/assets/images';
import config from '~/config';
import ControlQuantity from '../ControlQuantity';
import Button from '../Button';
import { addProductToCart } from '~/services/cartService';

const cx = classNames.bind(styles);

function ProductCard({ data }) {
  const [quantity, setQuantity] = useState(1);

  const handleChangeQuantity = (quantity) => {
    setQuantity(quantity);
  };

  const handleClick = () => {
    addProductToCart({
      productId: data._id,
      quantity: quantity,
    });
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('image')}>
        <Link to={`${config.routes.detail}/${data._id}`}>
          <LazyLoadImage
            alt={''}
            width={'100%'}
            src={product1} // use normal <img> attributes as props
            effect="blur"
          />
        </Link>

        <div className={cx('control', 'under-image')}>
          <ControlQuantity w50 onChange={handleChangeQuantity} />
          <Button w50 hfull onClick={handleClick}>
            <i className="fa-solid fa-cart-plus"></i>
          </Button>
        </div>
      </div>

      <div className={cx('context')}>
        <p className={cx('title')}>{data.title}</p>
        <div className={cx('info')}>
          <span className={cx('price')}>{formatMoney(data.price)}</span>
          <span className={cx('sale')}>{formatMoney(data.sale)}</span>
        </div>
      </div>

      {/* <div className={cx('control')}>
        <ControlQuantity />
        <Button w50 hfull>
          <i className="fa-solid fa-cart-plus"></i>
        </Button>
      </div> */}
    </div>
  );
}

export default ProductCard;
