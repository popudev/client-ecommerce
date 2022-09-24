import { useRef } from 'react';

import classNames from 'classnames/bind';

import Skeleton from '~/components/Skeleton';

import styles from './CheckBox.module.scss';

const cx = classNames.bind(styles);

const CheckBox = (props) => {
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
};

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
