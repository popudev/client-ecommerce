import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';

import overplay from '../OverPlay/core/overplay';

import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

function Modal({ children, toggleModal }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) overplay.active();
    else overplay.disable();

    toggleModal.current = () => {
      setVisible((prev) => !prev);
    };
  });

  return visible && <div className={cx('wrapper')}>{children}</div>;
}

export default Modal;
