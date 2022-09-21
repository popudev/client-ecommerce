import { useState } from 'react';
import styles from './ControlQuantity.module.scss';
import classNames from 'classnames/bind';
import { useDidUpdate } from '~/hooks';

const cx = classNames.bind(styles);

function ControlQuantity(props) {
  const { outline, primary, w50, className, onChange } = props;

  const [quantity, setQuantity] = useState(1);

  useDidUpdate(() => {
    if (typeof onChange === 'function') onChange(quantity);
  }, [quantity]);

  const handlePlusQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleMinusQuantity = () => {
    if (quantity === 1) return;
    setQuantity((prev) => prev - 1);
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
