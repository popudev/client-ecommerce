import { useState } from 'react';

import { queryAllByAltText } from '@testing-library/react';

import { useDidUpdate } from '~/hooks';

import styles from './ControlQuantity.module.scss';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function ControlQuantity(props) {
  const {
    outline,
    primary,
    w50,
    className,
    onPlus = () => {},
    onMinus = () => {},
    onQuantityChange = () => {},
    // onInputChange = () => {},
    initialQuantity = 1,
  } = props;

  const [quantity, setQuantity] = useState(initialQuantity);
  const [action, setAction] = useState('');

  useDidUpdate(() => {
    onQuantityChange(quantity, action);
  }, [quantity, action]);

  const handlePlusQuantity = () => {
    setQuantity((prev) => prev + 1);
    setAction('plus');
    onPlus(1);
  };

  const handleMinusQuantity = () => {
    if (quantity === 1) return;
    setQuantity((prev) => prev - 1);
    setAction('minus');
    onMinus(-1);
  };

  const handleChangeQuantity = (e) => {
    const number = Number.parseInt(e.target.value);
    if (!number) setQuantity('');
    else {
      setQuantity(number);
    }
  };

  const handleBlurQuantity = (e) => {
    const number = Number.parseInt(e.target.value);
    if (!number) setQuantity(1);
  };

  const classes = cx('wrapper', {
    [className]: className,
    primary,
    outline,
    w50,
  });

  return (
    <div className={classes}>
      <button className={cx('minus-quantity')} onClick={handleMinusQuantity}>
        <i className="fa-solid fa-minus"></i>
      </button>
      <input
        type="text"
        value={quantity}
        onChange={handleChangeQuantity}
        onBlur={handleBlurQuantity}
        className={cx('inp-quantity')}
      ></input>
      <button className={cx('plus-quantity')} onClick={handlePlusQuantity}>
        <i className="fa-solid fa-plus"></i>
      </button>
    </div>
  );
}

export default ControlQuantity;
