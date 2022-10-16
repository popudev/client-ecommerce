import { memo } from 'react';

import styles from './Banner.module.scss';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Banner({ image }) {
  console.log('re-render banner');
  return (
    <div className={cx('wrapper')}>
      <img src={image} alt="" />
    </div>
  );
}

export default memo(Banner);
