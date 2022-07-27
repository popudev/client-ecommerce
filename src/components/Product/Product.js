import classNames from 'classnames/bind';
import { useContext } from 'react';
import { ProductContext } from '~/context/ProductProvider';

import styles from './Product.module.scss';
const cx = classNames.bind(styles);

function Product({ info }) {
  const { fetchApiDeleteProduct } = useContext(ProductContext);
  const handleDeleteProduct = (id) => {
    fetchApiDeleteProduct(id);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('info')}>
        <h3>name: {info.title}</h3>
        <p>price: {info.price}</p>
        {/* <p>category: {info.category.title}</p> */}
      </div>
      <button
        className={cx('btn-delete')}
        onClick={() => {
          handleDeleteProduct(info.id);
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default Product;
