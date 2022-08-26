import classNames from 'classnames/bind';
import { useState } from 'react';
import toast from './core/toast';
import styles from './ToastContainer.module.scss';
import Toast from './Toast';
const cx = classNames.bind(styles);

function ToastContainer() {
  const [elements, setElements] = useState([]);
  toast.config(setElements);

  return (
    <div className={cx('wrapper')}>
      {elements.map((e) => {
        return <Toast type={e.type} mess={e.mess} />;
      })}
    </div>
  );
}

export default ToastContainer;
