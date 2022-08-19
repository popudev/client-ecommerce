import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import Button from '~/components/Button';
import Helmet from '~/components/Helmet';
import { useGlobalState } from '~/hooks';
import styles from './Register.module.scss';

import { background } from '~/assets/images';

const cx = classNames.bind(styles);

function Register() {
  const { dispatch } = useGlobalState();
  const navigator = useNavigate();

  const handleClick = () => {
    dispatch({
      type: 'loginSuccess',
      payload: {
        id: 1,
      },
    });

    navigator('/');
  };

  return (
    <Helmet title={'Register'}>
      <div className={cx('wrapper')}>
        <div className={cx('background')}>
          <img src={background} alt="" />
        </div>
        <div className={cx('content')}>
          <h1 className={cx('heading')}>Register</h1>
          <form className={cx('from_login')}>
            <div className={cx('from_group')}>
              <label>Fullname</label>
              <input />
            </div>

            <div className={cx('from_group')}>
              <label>Email</label>
              <input />
            </div>

            <div className={cx('from_group')}>
              <label>Username</label>
              <input />
            </div>

            <div className={cx('from_group')}>
              <label>Password</label>
              <input />
            </div>

            <div className={cx('from_group')}>
              <label>Confirm Password</label>
              <input />
            </div>

            <Button primary className={cx('btn_login')}>
              Register
            </Button>
          </form>

          <div className={cx('navigator')}>
            <span>Ban da co tai khoan ?</span>
            <Link to="/login">Dang nhap</Link>
          </div>
        </div>
      </div>
    </Helmet>
  );
}

export default Register;
