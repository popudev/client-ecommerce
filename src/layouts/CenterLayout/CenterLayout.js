import classNames from 'classnames/bind';

import { background } from '~/assets/images';

import styles from './CenterLayout.module.scss';

const cx = classNames.bind(styles);

function CenterLayout({ children }) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('background')}>
        <img src={background} alt="" />
      </div>
      <div className={cx('content')}>{children}</div>
    </div>
  );
}

export default CenterLayout;
