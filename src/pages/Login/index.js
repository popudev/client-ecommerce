import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import Button from '~/components/Button';
import Helmet from '~/components/Helmet';
import { useGlobalState } from '~/hooks';
import styles from './Login.module.scss';

import { background } from '~/assets/images';

const cx = classNames.bind(styles);

function Login() {
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
    <Helmet title={'Login'}>
      <div className={cx('wrapper')}>
        <div className={cx('background')}>
          <img src={background} alt="" />
        </div>
        <div className={cx('content')}>
          <h1 className={cx('heading')}>Login</h1>
          <form className={cx('from_login')}>
            <div className={cx('from_group')}>
              <label>Username</label>
              <input />
            </div>

            <div className={cx('from_group')}>
              <label>Password</label>
              <input />
            </div>

            <Button primary className={cx('btn_login')}>
              Login
            </Button>
          </form>

          <div className={cx('social_media')}>
            <p>--OR LOGIN WITH--</p>
            <Button outline leftIcon={<i className="fa-brands fa-google"></i>}>
              GOOGLE
            </Button>
            <Button outline leftIcon={<i className="fa-brands fa-facebook-f"></i>}>
              FACEBOOK
            </Button>
            <Button outline leftIcon={<i className="fa-brands fa-github"></i>}>
              GITHUB
            </Button>
          </div>
          <div className={cx('navigator')}>
            <span>Ban chua co tai khoan ?</span>
            <Link to="/register">Dang ky</Link>
          </div>
        </div>
      </div>
    </Helmet>
  );
}

export default Login;
