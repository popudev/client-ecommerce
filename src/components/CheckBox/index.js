import classNames from 'classnames/bind';
import { useRef } from 'react';
import styles from './CheckBox.module.scss';

const cx = classNames.bind(styles);

function CheckBox(props) {
  const { title, checked, onChange, upper } = props;
  const inputRef = useRef(null);

  const handleOnChange = () => {
    onChange(inputRef.current);
  };

  return (
    <label className={cx('wrapper')}>
      <input ref={inputRef} type="checkbox" checked={checked} onChange={handleOnChange} value={title} />
      <span className={cx('title', { upper: upper })}>{title}</span>
    </label>
  );
}

export default CheckBox;
