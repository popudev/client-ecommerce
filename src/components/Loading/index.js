import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './Loading.module.scss';
import { loading } from './core';

const cx = classNames.bind(styles);

function Loading() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    loading.config(setVisible);
  }, []);

  if (visible) {
    document.documentElement.style.overflowY = 'hidden';
  } else {
    document.documentElement.style.overflowY = 'overlay';
  }

  return visible ? (
    <div className={cx('wrapper')}>
      <i className="fa-solid fa-spinner"></i>
    </div>
  ) : (
    <></>
  );
}

export default Loading;
