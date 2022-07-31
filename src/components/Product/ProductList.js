import classNames from 'classnames/bind';
import Grid from '../Gird';
import styles from './ProductList.module.scss';

const cx = classNames.bind(styles);

function ProductList({ children }) {
  return (
    <div className={cx('wrapper')}>
      <Grid col={4} mdCol={3} smCol={2} gap={20}>
        {children}
      </Grid>
    </div>
  );
}

export default ProductList;
