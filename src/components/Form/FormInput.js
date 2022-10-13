import { useState } from 'react';

import { useDidUpdate } from '~/hooks';

import Input from '../Input/Input';

import styles from './FormInput.module.scss';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function FormInput(props) {
  const {
    type,
    name,
    label,
    className,
    errorMess,
    setValueForm,
    validate,
    value: initialValue,
    disabled = false,
    errorValidation,
    outline = false,
    border = false,
    row = false,
    children,
    ...propsOther
  } = props;

  const [error, setError] = useState(errorValidation);
  const [value, setValue] = useState(initialValue || '');

  useDidUpdate(() => {
    setValue(initialValue);
  }, [initialValue]);

  useDidUpdate(() => {
    if (errorMess?.mess) setError(errorMess?.mess);
  }, [errorMess]);

  // delay input
  // const debouceValue = useDebounce(value, 400);
  // useDidUpdate(() => {
  //  setValueForm(debouceValue);
  //  const error = validate(debouceValue);
  //  setError(error);
  // }, [debouceValue]);

  useDidUpdate(() => {
    setError(errorValidation);
  }, [errorValidation]);

  const handleOnChange = (e) => {
    const inputValue = e.target.value.trim();
    setValue(inputValue);
    setValueForm(inputValue);
    if (error) setError('');
  };

  const handleOnBlur = (e) => {
    const inputValue = e.target.value.trim();
    const error = validate(inputValue);
    setError(error);
  };

  const classes = cx('form_group', className, {
    is_error: !!error,
    outline,
    border,
    row,
    disabled,
  });

  let disabledAttr = {};
  if (disabled)
    disabledAttr = {
      disabled: true,
    };

  return (
    <div className={classes}>
      {label && <label htmlFor={name}>{label}</label>}
      <Input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        {...propsOther}
        {...disabledAttr}
      >
        {children}
      </Input>
      {error && <span className={cx('error')}>{error}</span>}
    </div>
  );
}

export default FormInput;
