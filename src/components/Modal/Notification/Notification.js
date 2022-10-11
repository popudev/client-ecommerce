import { useRef, useState } from 'react';

import Button from '~/components/Button';

import Modal from '../Modal';
import { notification } from './core';
import styles from './Notification.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Notification() {
  const toggleModalAddress = useRef();
  const [title, setTitle] = useState('');
  const [type, setType] = useState(notification.type.success);

  notification.setTitle = (title, type = notification.type.success) => {
    setTitle(title);
    setType(type);
    toggleModalAddress.current();

    return new Promise((resolve) => {
      notification.clickOk = () => {
        resolve(notification.ok);
      };
      notification.clickYes = () => {
        resolve(notification.yes);
      };
      notification.clickNo = () => {
        resolve(notification.no);
      };
    });
  };

  const handleOk = () => {
    notification.clickOk();
    toggleModalAddress.current();
  };

  const handleYes = () => {
    notification.clickYes();
    toggleModalAddress.current();
  };

  const handleNo = () => {
    notification.clickNo();
    toggleModalAddress.current();
  };

  return (
    <Modal toggleModal={toggleModalAddress}>
      <div className={cx('wrapper')}>
        <div className={cx('content')}>
          <div className={cx('icon')}>
            {type === notification.type.warning && (
              <i className={cx('warning', 'fa-solid fa-triangle-exclamation')}></i>
            )}

            {type === notification.type.error && (
              <i className={cx('error', 'fa-solid fa-circle-xmark')}></i>
            )}

            {type === notification.type.success && (
              <i className={cx('success', 'fa-solid fa-circle-check')}></i>
            )}
          </div>
          <div className={cx('title')}>{title}</div>
        </div>
        <div className={cx('actions')}>
          {type !== notification.type.warning && (
            <Button outline onClick={handleOk}>
              OK
            </Button>
          )}
          {type === notification.type.warning && (
            <>
              <Button primary onClick={handleYes}>
                Yes
              </Button>
              <Button outline onClick={handleNo}>
                No
              </Button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default Notification;
