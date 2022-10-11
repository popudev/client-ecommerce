import { useRef } from 'react';

import classNames from 'classnames/bind';

import styles from './Radio.module.scss';

const cx = classNames.bind(styles);

function Radio(props) {
  const { title, checked, onChange = () => {}, ...otherProps } = props;
  const inputRef = useRef(null);

  const handleOnChange = () => {
    onChange(inputRef.current);
  };

  return (
    <label className={cx('wrapper')}>
      <input ref={inputRef} type="radio" checked={checked} onChange={handleOnChange} value={title} {...otherProps} />
      <span className={cx('title')}>{title}</span>
    </label>
  );
}

export default Radio;
