import classNames from 'classnames/bind';
import Helmet from '~/components/Helmet';
import styles from './AdminProduct.module.scss';
const cx = classNames.bind(styles);

function AdminProduct() {
  return (
    <Helmet title="Admin">
      <div className={cx('wrapper')}>Admin</div>
    </Helmet>
  );
}

export default AdminProduct;
