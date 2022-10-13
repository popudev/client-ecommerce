import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import config from '~/config';
import useCheckOutState from '~/hooks/useCheckOutState';
import { updateAddress } from '~/reducers/actions/checkOutAction';
import { addAddress, getAddress } from '~/services/addressService';

import Button from '~/components/Button';
import CheckBox from '~/components/CheckBox';
import { Form, FormInput } from '~/components/Form';
import Radio from '~/components/Radio';

import styles from './Address.module.scss';
import AddressItem from './AddressItem';
import AddressModal from './AddressModal';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Address() {
  const initialValues = {
    fullname: '',
    phone: '',
    address: '',
    save: false,
  };

  const validateSchema = {
    fullname: {
      required: true,
    },
    phone: {
      required: true,
      number: true,
    },
    address: {
      required: true,
    },
  };

  const { checkOutDispatch } = useCheckOutState();
  const [option, setOption] = useState(1);
  const [addressList, setAddressList] = useState([]);
  const [currentAddress, setCurrentAddress] = useState({});
  const toggleModalAddress = useRef();
  const submitRef = useRef();
  const cleanRef = useRef();
  const navigator = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await getAddress();
      if (!res?.length) setOption(2);
      setAddressList(res);
      setCurrentAddress(res[0]);
    })();
  }, []);

  const handleSubmit = (values) => {
    checkOutDispatch(updateAddress(values));
    if (values.save) {
      addAddress(values);
    }
    navigator(config.routes.checkout.shipping.href);
  };

  const handleContinue = () => {
    if (option === 2) submitRef.current();
    else {
      const { address, fullname, phone } = currentAddress;
      checkOutDispatch(updateAddress({ address, fullname, phone }));
      navigator(config.routes.checkout.shipping.href);
    }
  };

  const handleRadio = (input) => {
    setOption(+input.value);
    cleanRef.current();
  };

  const handleChangeAddress = () => {
    toggleModalAddress.current();
  };

  return (
    <div className={cx('wrapper')}>
      <AddressModal
        toggleRef={toggleModalAddress}
        setCurrentAddress={setCurrentAddress}
        data={addressList}
      />

      <h1 className={cx('header')}>Address Selection</h1>

      {addressList.length !== 0 && (
        <>
          <Radio
            value="1"
            checked={option === 1}
            name="option"
            title="Current Address"
            onChange={handleRadio}
          />
          <AddressItem
            data={currentAddress}
            change
            active={option === 1}
            openModal={handleChangeAddress}
          />
        </>
      )}

      <Radio
        value="2"
        checked={option === 2}
        name="option"
        title="New Address"
        onChange={handleRadio}
      />
      <Form
        className={cx('form_add_address', {
          active: option === 2,
        })}
        initialValues={initialValues}
        validateSchema={validateSchema}
        onSubmit={handleSubmit}
        submitRef={submitRef}
        cleanRef={cleanRef}
      >
        <FormInput outline type="text" name="fullname" label="Full Name" />
        <FormInput outline type="text" name="phone" label="Phone" />
        <FormInput outline type="text" name="address" label="Address" />
        <CheckBox title="Save address" name="save" className={cx('checkbox')} />
      </Form>

      <div className={cx('actions')}>
        <Button text to={config.routes.cart}>
          Cancel
        </Button>
        <Button primary onClick={handleContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
}

export default Address;
