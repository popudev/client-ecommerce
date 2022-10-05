import classNames from 'classnames/bind';

import styles from './Purchase.module.scss';

const cx = classNames.bind(styles);

function Purchase() {
  return <div className={cx('wrapper')}>Purchase</div>;
}

export default Purchase;
