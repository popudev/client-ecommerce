import { useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Popper.module.scss';

const cx = classNames.bind(styles);

function Popper({ children, width, height }) {
  const style = {
    width,
    height,
  };
  return (
    <div className={cx('wrapper')} style={style}>
      {children}
    </div>
  );
}

export default Popper;
