import { useEffect, useRef, useState } from 'react';

import classNames from 'classnames/bind';

import { addAddress, getAddress, updateAddress } from '~/services/addressService';

import Button from '~/components/Button';
import CheckBox from '~/components/CheckBox';
import { Form, FormInput } from '~/components/Form';
import Modal from '~/components/Modal/Modal';

import styles from './Addresses.module.scss';
import AddressItem from './AddressItem';

const cx = classNames.bind(styles);

function Addresses() {
  console.log('re-render');
  const toggleModalAddress = useRef();

  const [initialValues, setInitialValues] = useState({
    fullname: '',
    phone: '',
    address: '',
  });

  const [addressList, setAddressList] = useState([]);

  const [callApi, setCallApi] = useState(false);
  const [statusSubmit, setStatusSubmit] = useState('');

  const handleAddAddress = () => {
    setInitialValues({
      fullname: '',
      phone: '',
      address: '',
      defaultAddress: false,
    });
    setStatusSubmit('add');
    toggleModalAddress.current();
  };

  const handleCancelAddAddress = () => {
    toggleModalAddress.current();
  };

  const handleEdit = (data) => {
    setInitialValues(data);
    setStatusSubmit('update');
    toggleModalAddress.current();
  };

  const handleDefaultOrDelete = (isSuccess) => {
    if (isSuccess) setCallApi((prev) => !prev);
  };

  const handleSubmit = async (values) => {
    if (statusSubmit === 'add') {
      const res = await addAddress(values);
      if (res) setCallApi((prev) => !prev);
    } else {
      const res = await updateAddress(values);
      if (res) setCallApi((prev) => !prev);
    }
    toggleModalAddress.current();
  };

  useEffect(() => {
    (async () => {
      const res = await getAddress();
      setAddressList(res);
    })();
  }, [callApi]);

  const validateSchema = {
    fullname: {
      required: true,
    },
    phone: {
      required: true,
    },
    address: {
      required: true,
    },
  };

  return (
    <div className={cx('wrapper')}>
      <Modal toggleModal={toggleModalAddress}>
        <div className={cx('form')}>
          <h2 className={cx('form_title')}>{statusSubmit === 'add' ? 'New Address' : 'Update Address'}</h2>
          <Form
            className={cx('form_add_address')}
            initialValues={initialValues}
            validateSchema={validateSchema}
            onSubmit={handleSubmit}
          >
            <FormInput type="text" name="fullname" label="Full Name" />
            <FormInput type="text" name="phone" label="Phone" />
            <FormInput type="text" name="address" label="Address" />
            {!initialValues.defaultAddress ? <CheckBox title="Set Address Default" name="defaultAddress" /> : <></>}
            <div className={cx('action')}>
              <Button type="button" text onClick={handleCancelAddAddress}>
                Cancel
              </Button>
              <Button type="submit" primary>
                Save
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
      <div className={cx('header')}>
        <h1 className={cx('title')}>My Addresses</h1>
        <Button onClick={handleAddAddress} className={cx('btn_add_address')} outline>
          + Add New Address
        </Button>
      </div>
      <div className={cx('content')}>
        <div className={cx('address_list')}>
          {addressList.map((e, index) => {
            return <AddressItem key={e._id} data={e} onEdit={handleEdit} onDefaultOrDelete={handleDefaultOrDelete} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Addresses;
