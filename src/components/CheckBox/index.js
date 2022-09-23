import classNames from 'classnames/bind';
import { useRef } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
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
    <SkeletonTheme baseColor="#361500" highlightColor="#444">
      <label className={cx('wrapper')}>
        <input type="checkbox" />
        <span className={cx('title')}>
          <Skeleton height={25} />
        </span>
      </label>
    </SkeletonTheme>
  );
};

export default CheckBox;
