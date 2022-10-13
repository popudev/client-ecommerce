import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import config from '~/config';
import { useDidUpdate } from '~/hooks';
import useCheckOutState from '~/hooks/useCheckOutState';
import { updateShipping } from '~/reducers/actions/checkOutAction';
import { addOrder } from '~/services/orderService';

import Button from '~/components/Button';
import Radio from '~/components/Radio';

import styles from './Payment.module.scss';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Payment() {
  const { checkOutState, checkOutDispatch } = useCheckOutState();
  const [option, setOption] = useState(1);
  const navigator = useNavigate();

  const handleComplete = () => {
    const data = {
      ...checkOutState,
      payment: {
        option: option,
        type: 'Cash On Delivery',
      },
    };
    addOrder(data, checkOutDispatch, navigator);
  };

  const handleBack = () => {
    checkOutDispatch(updateShipping(null));
    navigator(config.routes.checkout.shipping.href);
  };

  const handleChoose = (value) => {
    setOption(value);
  };

  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('header')}>Payment Selection</h1>
      <div
        className={cx('shipping_card', { active: option === 1 })}
        onClick={() => handleChoose(1)}
      >
        <Radio checked={option === 1} value={1} name="shipping" />
        <div className={cx('shippping_content')}>
          <h3>Cash On Delivery</h3>
        </div>
      </div>
      <div className={cx('shipping_card', 'disable')}>
        <Radio checked={option === 2} value={2} name="shipping" />
        <div className={cx('shippping_content')}>
          <h3>Credit Card ( Coming Soon )</h3>
        </div>
      </div>
      <div className={cx('actions')}>
        <Button text to={config.routes.cart}>
          Cancel
        </Button>
        <Button outline onClick={handleBack}>
          Back
        </Button>
        <Button primary onClick={handleComplete}>
          Complete Order
        </Button>
      </div>
    </div>
  );
}

export default Payment;
