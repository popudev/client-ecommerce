import classNames from 'classnames/bind';
import Grid from '../Gird';
import styles from './ProductList.module.scss';

const cx = classNames.bind(styles);

function ProductList(props) {
  const style = {
    padding: props.padding ? `${props.padding}px` : `0px`,
  };
  return (
    <div className={cx('wrapper')} style={style}>
      <Grid col={props.col} mdCol={props.mdCol} smCol={props.smCol} gap={props.gap} wrapperClassName={cx('content')}>
        {props.children}
      </Grid>
    </div>
  );
}

export default ProductList;
