import { ProductList, Product } from '~/components/Product';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { useContext } from 'react';
import { ProductContext } from '~/context/ProductProvider';

const cx = classNames.bind(styles);

function Home() {
  const { products } = useContext(ProductContext);
  console.log('Home');
  return (
    <div className={cx('wrapper')}>
      <h1>This is ProductList at Home</h1>
      <ProductList>
        {products.map((product) => {
          return <Product key={product.id} info={product} />;
        })}
      </ProductList>
    </div>
  );
}

export default Home;
