import { useRef } from 'react';

import classNames from 'classnames/bind';

import Skeleton from '~/components/Skeleton';

import styles from './CheckBox.module.scss';

const cx = classNames.bind(styles);

function CheckBox(props) {
  const { title, checked, onChange = () => {}, upper, value: checkedForm, setValueForm = () => {} } = props;
  const inputRef = useRef(null);

  const handleOnChange = () => {
    setValueForm(inputRef.current.checked);
    onChange(inputRef.current);
  };

  return (
    <label className={cx('wrapper')}>
      <input ref={inputRef} type="checkbox" checked={checkedForm || checked} onChange={handleOnChange} value={title} />
      <span className={cx('title', { upper: upper })}>{title}</span>
    </label>
  );
}

CheckBox.Loading = () => {
  return (
    <label className={cx('wrapper')}>
      <span className={cx('title')}>
        <Skeleton second height={25} borderRadius={10} />
      </span>
    </label>
  );
};

export default CheckBox;
