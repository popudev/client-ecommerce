import { LazyLoadImage } from 'react-lazy-load-image-component';

import productImg, { productDefault } from '~/assets/images';

import styles from './ProductImage.module.scss';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function ProductImage({ src, className, ...propsOther }) {
  console.log('src: ', src);
  const handleError = (e) => {
    e.target.src = productDefault;
  };

  let imgSrc = null;
  if (productImg[`product${src}`]) imgSrc = productImg[`product${src}`][0];

  return (
    <div className={cx('wrapper', className)}>
      <LazyLoadImage
        alt={'product_image'}
        width={'100%'}
        src={imgSrc || productDefault}
        effect="blur"
        onError={handleError}
        {...propsOther}
      />
    </div>
  );
}

export default ProductImage;
