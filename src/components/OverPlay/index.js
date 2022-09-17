import classNames from 'classnames/bind';
import styles from './OverPlay.module.scss';
import overplay from './core/overplay';
import { useState } from 'react';

const cx = classNames.bind(styles);

function OverPlay() {
  const [visible, setVisible] = useState(false);

  if (visible) {
    document.documentElement.style.overflowY = 'hidden';
  } else {
    document.documentElement.style.overflowY = 'overlay';
  }

  overplay.toggle = () => {
    setVisible((prev) => !prev);
  };

  return <div className={cx('wrapper', { active: visible })}></div>;
}

export default OverPlay;
