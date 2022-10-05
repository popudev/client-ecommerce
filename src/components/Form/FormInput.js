import { useState } from 'react';

import classNames from 'classnames/bind';

import { useDidUpdate } from '~/hooks';

import styles from './FormInput.module.scss';

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
    disabled = false,
    errorValidation,
    outline = false,
    border = false,
    row = false,
  } = props;

  const [error, setError] = useState(errorValidation);
  const [value, setValue] = useState(props.value || '');

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
    const inputValue = e.target.value;
    setValue(inputValue);
    setValueForm(inputValue);
    if (error) setError('');
  };

  const handleOnBlur = (e) => {
    const inputValue = e.target.value;
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

  let Component = 'input';
  if (type === 'textarea') {
    Component = 'textarea';
  }

  return (
    <div className={classes}>
      {label && <label htmlFor={name}>{label}</label>}
      <Component
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        {...disabledAttr}
      />
      {error && <span className={cx('error')}>{error}</span>}
    </div>
  );
}

export default FormInput;
