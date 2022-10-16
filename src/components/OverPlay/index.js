import { useState } from 'react';

import { SectionTitle } from '../Section';

import overplay from './core/overplay';
import styles from './OverPlay.module.scss';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function OverPlay() {
  const [visible, setVisible] = useState(false);
  overplay.config(setVisible);

  if (visible) {
    document.documentElement.style.overflowY = 'hidden';
  } else {
    document.documentElement.style.overflowY = 'overlay';
  }

  return <div className={cx('wrapper', { active: visible })}></div>;
}

export default OverPlay;
