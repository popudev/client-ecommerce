import classNames from 'classnames/bind';
import { useState } from 'react';
import { useDebounce, useDidMountEffect } from '~/hooks';
import styles from './FormInput.module.scss';

const cx = classNames.bind(styles);

function FormInput(props) {
  const { type, name, label, className, setValueForm, validate, errorValidation } = props;
  const [error, setError] = useState(errorValidation);

  const [value, setValue] = useState('');
  const debouceValue = useDebounce(value, 500);

  useDidMountEffect(() => {
    setValueForm(debouceValue);
  }, [debouceValue]);

  useDidMountEffect(() => {
    setError(errorValidation);
  }, [errorValidation]);

  const handleOnChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
  };

  const handleOnBlur = (e) => {
    const inputValue = e.target.value;
    const error = validate(inputValue);
    setError(error);
  };

  const classes = cx('form_group', className, {
    is_error: !!error,
  });
  return (
    <div className={classes}>
      {label && <label htmlFor={name}>{label}</label>}
      <input id={name} type={type} name={name} value={value} onChange={handleOnChange} onBlur={handleOnBlur} />
      {error && <span className={cx('error')}>{error}</span>}
    </div>
  );
}

export default FormInput;
