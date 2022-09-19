import classNames from 'classnames/bind';
import Grid from '../Gird';
import styles from './ProductList.module.scss';

const cx = classNames.bind(styles);

function ProductList(props) {
  return (
    <div className={cx('wrapper')}>
      <Grid wrapperClassName={cx('content')} {...props}>
        {props.children}
      </Grid>
    </div>
  );
}

export default ProductList;
