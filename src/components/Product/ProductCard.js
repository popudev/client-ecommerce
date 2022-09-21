import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
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

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

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

  const imgRef = useRef(null);

  return (
    <div className={cx('wrapper')}>
      <div ref={imgRef} className={cx('image')}>
        <Link to={`${config.routes.detail}/${data._id}`}>
          <LazyLoadImage
            alt={''}
            afterLoad={() => {
              imgRef.current?.classList.add(cx('doneload'));
            }}
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

const Loading = () => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('image')}>
        <Skeleton width={206} height={254} />
      </div>
      <div className={cx('context')}>
        <Skeleton count={2} />
      </div>
    </div>
  );
};

ProductCard.Loading = Loading;

export default ProductCard;
