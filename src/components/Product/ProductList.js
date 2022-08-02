import classNames from 'classnames/bind';
import Grid from '../Gird';
import styles from './ProductList.module.scss';

const cx = classNames.bind(styles);

function ProductList(props) {
  return (
    <div className={cx('wrapper')}>
      {/* <Grid col={props.col} mdCol={props.mdCol} smCol={props.smCol} gap={props.gap}> */}
      {props.children}
      {/* </Grid> */}
    </div>
  );
}

export default ProductList;
