import { useRef, useState } from 'react';

import classNames from 'classnames/bind';

import Button from '~/components/Button';

import Modal from '../Modal';

import { notification } from './core';
import styles from './Notification.module.scss';

const cx = classNames.bind(styles);

function Notification() {
  const toggleModalAddress = useRef();
  const [title, setTitle] = useState('');

  notification.setTitle = (title) => {
    setTitle(title);
    toggleModalAddress.current();
  };

  const handleOk = () => {
    toggleModalAddress.current();
  };

  return (
    <Modal toggleModal={toggleModalAddress}>
      <div className={cx('wrapper')}>
        <div className={cx('content')}>
          <div className={cx('icon')}>
            <i className={cx('success', 'fa-solid fa-circle-check')}></i>
          </div>
          <div className={cx('title')}>{title}</div>
        </div>
        <div className={cx('actions')} onClick={handleOk}>
          <Button outline>OK</Button>
        </div>
      </div>
    </Modal>
  );
}

export default Notification;
