import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import config, { formatMoney } from '~/config';
import useCheckOutState from '~/hooks/useCheckOutState';
import { updateAddress, updateShipping } from '~/reducers/actions/checkOutAction';

import Button from '~/components/Button';
import Radio from '~/components/Radio';

import styles from './Shipping.module.scss';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Shipping() {
  const types = [
    {
      id: 1,
      title: 'Normal delivery',
      charge: 10,
      desc: 'Received in a week',
    },
    {
      id: 2,
      title: 'Fast delivery',
      charge: 30,
      desc: 'Received in two day',
    },
    {
      id: 3,
      title: 'Express delivery',
      charge: 40,
      desc: 'Received in a day',
    },
  ];

  const { dispatch } = useCheckOutState();
  const navigator = useNavigate();
  const [option, setOption] = useState(1);

  const handleContinue = () => {
    dispatch(updateShipping(types[option - 1]));
    navigator(config.routes.checkout.payment.href);
  };

  const handleChoose = (value) => {
    setOption(value);
  };

  const handleBack = () => {
    dispatch(updateAddress(null));
    navigator(config.routes.checkout.address.href);
  };

  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('header')}>Shipping Selection</h1>

      {types.map((item) => {
        return (
          <div
            key={item.id}
            className={cx('shipping_card', { active: option === item.id })}
            onClick={() => handleChoose(item.id)}
          >
            <Radio checked={option === item.id} value={item.id} name="shipping" />
            <div className={cx('shippping_content')}>
              <h3>{item.title}</h3>
              <p>
                <span>Charge: </span>
                <span>{formatMoney(item.charge)}</span>
              </p>
              <p>{item.desc}</p>
            </div>
          </div>
        );
      })}

      <div className={cx('actions')}>
        <Button text to={config.routes.cart}>
          Cancel
        </Button>
        <Button outline onClick={handleBack}>
          Back
        </Button>
        <Button primary onClick={handleContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
}

export default Shipping;
