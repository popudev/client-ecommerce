import { useRef } from 'react';

import classNames from 'classnames/bind';

import styles from './Input.module.scss';

const cx = classNames.bind(styles);

function Input(props) {
  const { children, type, ...propsOther } = props;
  const iconEye = useRef();
  const iconEyeSlash = useRef();
  const inputPass = useRef();

  let Component = 'input';

  const handleToggleType = () => {
    iconEye.current.classList.toggle(cx('active'));
    iconEyeSlash.current.classList.toggle(cx('active'));
    if (inputPass.current.type === 'text') inputPass.current.type = 'password';
    else inputPass.current.type = 'text';
  };

  return type !== 'password' ? (
    <div className={cx('wrapper')}>
      <Component type={type} {...propsOther} />
      {children}
    </div>
  ) : (
    <div className={cx('wrapper')}>
      <Component ref={inputPass} type={type} {...propsOther} />
      <button tabindex="-1" type="button" onClick={handleToggleType}>
        <i ref={iconEye} className={cx('fa-solid fa-eye', 'eye', 'active')}></i>
        <i ref={iconEyeSlash} className={cx('fa-sharp fa-solid fa-eye-slash', 'eyeSlash')}></i>
      </button>
    </div>
  );
}

export default Input;
