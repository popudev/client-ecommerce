import { useEffect, useRef, useState } from 'react';

import { addAddress, getAddress, updateAddress } from '~/services/addressService';

import Button from '~/components/Button';
import CheckBox from '~/components/CheckBox';
import { Form, FormInput } from '~/components/Form';
import Helmet from '~/components/Helmet';
import Modal from '~/components/Modal/Modal';

import AddressItem from './components/AddressItem';

import styles from './Addresses.module.scss';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const validateSchema = {
  fullname: {
    required: true,
    min: 6,
  },
  phone: {
    required: true,
    number: true,
    min: 10,
    max: 10,
  },
  address: {
    required: true,
    min: 6,
  },
};

function Addresses() {
  const [addressList, setAddressList] = useState([]);
  const [callApi, setCallApi] = useState(false);
  const [statusSubmit, setStatusSubmit] = useState('');
  const [initialValues, setInitialValues] = useState({
    fullname: '',
    phone: '',
    address: '',
  });

  const toggleModalAddress = useRef();

  useEffect(() => {
    (async () => {
      const res = await getAddress();
      setAddressList(res);
    })();
  }, [callApi]);

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

  return (
    <Helmet title="addresses">
      <div className={cx('wrapper')}>
        <Modal toggleModal={toggleModalAddress}>
          <div className={cx('form')}>
            <h2 className={cx('form_title')}>
              {statusSubmit === 'add' ? 'New Address' : 'Update Address'}
            </h2>
            <Form
              className={cx('form_add_address')}
              initialValues={initialValues}
              validateSchema={validateSchema}
              onSubmit={handleSubmit}
            >
              <FormInput type="text" name="fullname" label="Full Name" />
              <FormInput type="text" name="phone" label="Phone" />
              <FormInput type="text" name="address" label="Address" />
              {!initialValues.defaultAddress ? (
                <CheckBox title="Set Address Default" name="defaultAddress" />
              ) : (
                <></>
              )}
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
            {addressList.map((item) => {
              return (
                <AddressItem
                  key={item._id}
                  data={item}
                  onEdit={handleEdit}
                  onDefaultOrDelete={handleDefaultOrDelete}
                />
              );
            })}

            {!addressList?.length && (
              <div className={cx('empty')}>
                <i className="fa-sharp fa-solid fa-location-dot"></i>
                <h2>No addresses yet</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </Helmet>
  );
}

export default Addresses;
