import classNames from 'classnames/bind';
import Helmet from '~/components/Helmet';
import { ProductList, ProductCard } from '~/components/Product';
import styles from './Shop.module.scss';
import { fakeProducts } from '~/assets/data';

const cx = classNames.bind(styles);

function Shop() {
  return (
    <Helmet title={'Shop'}>
      <div className={cx('wrapper', 'main')}>
        {/* <div className={cx('banner')}></div> */}
        <div className={cx('container')}>
          <div className={cx('filter')}></div>
          <div className={cx('content')}>
            <ProductList col={3} gap={20}>
              {fakeProducts.map((e, i) => {
                return <ProductCard key={i} data={e} />;
              })}
            </ProductList>
            <div className={cx('pagination')}></div>
          </div>
        </div>
      </div>
    </Helmet>
  );
}

export default Shop;
