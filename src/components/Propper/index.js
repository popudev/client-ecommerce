import { useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Propper.module.scss';

const cx = classNames.bind(styles);

function Propper({ children }) {
  return <div className={cx('wrapper')}>{children}</div>;
}

export default Propper;
