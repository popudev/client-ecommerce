import classNames from 'classnames/bind';
import { useState } from 'react';
import { useDidMountEffect } from '~/hooks';
import styles from './FormInput.module.scss';

const cx = classNames.bind(styles);

function FormInput(props) {
  const { type, name, label, className, errorMess, setValueForm, validate, errorValidation } = props;
  const [error, setError] = useState(errorValidation);
  const [value, setValue] = useState(props.value || '');

  useDidMountEffect(() => {
    if (errorMess.mess) setError(errorMess.mess);
  }, [errorMess]);

  // delay input
  // const debouceValue = useDebounce(value, 400);
  // useDidMountEffect(() => {
  //  setValueForm(debouceValue);
  //  const error = validate(debouceValue);
  //  setError(error);
  // }, [debouceValue]);

  useDidMountEffect(() => {
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
