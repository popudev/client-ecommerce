import classNames from 'classnames/bind';

import Grid from '../Gird';

import ProductCard from './ProductCard';
import styles from './ProductList.module.scss';

const cx = classNames.bind(styles);

function ProductList(props) {
  const { data, loading } = props;
  return (
    <div className={cx('wrapper')}>
      <Grid wrapperClassName={cx('content')} {...props}>
        {loading &&
          Array(20)
            .fill(0)
            .map((e, index) => {
              return <ProductCard.Loading key={index} />;
            })}

        {!loading &&
          data?.map((product) => {
            return <ProductCard key={product?._id} data={product} />;
          })}
      </Grid>
    </div>
  );
}

export default ProductList;
