import { useEffect, useRef } from 'react';

import styles from './Input.module.scss';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Input(props) {
  const { children, type, inputRef, ...propsOther } = props;
  const iconEye = useRef();
  const iconEyeSlash = useRef();
  const inputPass = useRef();

  useEffect(() => {
    inputRef.current = inputPass.current;
  });

  let Component = 'input';

  const handleToggleType = () => {
    iconEye.current.classList.toggle(cx('active'));
    iconEyeSlash.current.classList.toggle(cx('active'));
    if (inputPass.current.type === 'text') inputPass.current.type = 'password';
    else inputPass.current.type = 'text';
  };

  return type !== 'password' ? (
    <div className={cx('wrapper')}>
      <Component ref={inputPass} type={type} {...propsOther} />
      {children}
    </div>
  ) : (
    <div className={cx('wrapper')}>
      <Component ref={inputPass} type={type} {...propsOther} />
      <button tabIndex="-1" type="button" onClick={handleToggleType}>
        <i ref={iconEye} className={cx('fa-solid fa-eye', 'eye', 'active')}></i>
        <i ref={iconEyeSlash} className={cx('fa-sharp fa-solid fa-eye-slash', 'eyeSlash')}></i>
      </button>
    </div>
  );
}

export default Input;
