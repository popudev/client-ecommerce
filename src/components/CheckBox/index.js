import classNames from 'classnames/bind';
import { useRef } from 'react';
import styles from './CheckBox.module.scss';

const cx = classNames.bind(styles);

function CheckBox(props) {
  const inputRef = useRef(null);

  const onChange = () => {
    console.log('check');
    props.onChange(inputRef.current);
  };

  return (
    <label className={cx('wrapper')}>
      <input ref={inputRef} type="checkbox" checked={props.checked} onChange={onChange} value={props.title} />

      <span className={cx('title')}>{props.title}</span>
    </label>
  );
}

export default CheckBox;
