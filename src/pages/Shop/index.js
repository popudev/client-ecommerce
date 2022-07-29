import classNames from 'classnames/bind';
import Helmet from '~/components/Helmet';
import styles from './Shop.module.scss';

const cx = classNames.bind(styles);

function Shop() {
  return (
    <Helmet title={'Shop'}>
      <div className={cx('wrapper', 'main')}>Shop</div>
    </Helmet>
  );
}

export default Shop;
