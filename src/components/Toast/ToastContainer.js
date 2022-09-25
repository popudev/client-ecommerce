import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';

import useScrollPosition from '~/hooks/useScrollPosition';
import useWindowSize from '~/hooks/useWindowResize';

import toast from './core/toast';
import Toast from './Toast';
import styles from './ToastContainer.module.scss';

const cx = classNames.bind(styles);

function ToastContainer() {
  const [elements, setElements] = useState([]);

  const scroll = useScrollPosition();
  const { width } = useWindowSize();

  let styles = {
    top: 170,
  };

  if (width <= 600) {
    styles.top = 110;
  } else if (width <= 1024) {
    styles.top = 140;
  }

  if (scroll > 60) {
    styles.top = 85;
  }

  useEffect(() => {
    toast.config(setElements);
  }, []);

  return (
    <div className={cx('wrapper')} style={styles}>
      {elements.map((e, i) => {
        return <Toast key={e.id} delay={i + 1} type={e.type} mess={e.mess} />;
      })}
    </div>
  );
}

export default ToastContainer;
