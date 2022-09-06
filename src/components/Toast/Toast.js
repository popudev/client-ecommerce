import classNames from 'classnames/bind';
import { useEffect, useLayoutEffect, useState } from 'react';

import styles from './Toast.module.scss';
const cx = classNames.bind(styles);

function Toast({ type, mess }) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('icon', type)}>
        <i className={cx('success', 'fa-solid fa-circle-check')}></i>
        <i className={cx('error', 'fa-solid fa-circle-xmark')}></i>
      </div>
      <div className={cx('mess')}>{mess}</div>
    </div>
  );
}

export default Toast;
