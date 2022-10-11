import { useState } from 'react';

import classNames from 'classnames/bind';

import { useDidUpdate } from '~/hooks';

import Button from '~/components/Button';
import Modal from '~/components/Modal/Modal';

import styles from './Address.module.scss';
import AddressItem from './AddressItem';

const cx = classNames.bind(styles);

function AddressModal(props) {
  const { toggleRef, data, setCurrentAddress } = props;
  const [addressList, setAddressList] = useState(data || []);

  useDidUpdate(() => {
    setAddressList(data);
  }, [data]);

  const handleCloseModal = () => {
    toggleRef.current();
  };

  const handleChoose = (value, index) => {
    const arr = addressList
      .map((item, i) => {
        return { ...item, defaultAddress: index === i };
      })
      .sort((a, b) => b.defaultAddress - a.defaultAddress);
    setAddressList(arr);
    setCurrentAddress(value);
    toggleRef.current();
  };

  return (
    <Modal toggleModal={toggleRef}>
      <div className={cx('address_modal')}>
        <h2>My Address</h2>
        <div className={cx('address_list')}>
          {addressList.map((item, index) => {
            return (
              <AddressItem
                key={item._id}
                choose={!item.defaultAddress}
                onChoose={(value) => handleChoose(value, index)}
                data={item}
              />
            );
          })}
        </div>
        <Button outline className={cx('btn_close')} onClick={handleCloseModal}>
          Close
        </Button>
      </div>
    </Modal>
  );
}

export default AddressModal;
