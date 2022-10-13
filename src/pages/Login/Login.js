import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuthenState } from '~/hooks';
import { loginFacebook, loginGithub, loginGoogle, loginUser } from '~/services/authenService';
import { getAccessToken, getRememberUsername, setRememberUsername } from '~/utils/localStorage';

import Button from '~/components/Button';
import CheckBox from '~/components/CheckBox/CheckBox';
import Facebook from '~/components/Facebook';
import { Form, FormInput } from '~/components/Form';
import Github from '~/components/Github';
import Google from '~/components/Google';
import Helmet from '~/components/Helmet';

import styles from './Login.module.scss';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Login() {
  const navigator = useNavigate();
  const { authenState, authenDispatch } = useAuthenState();
  const { error } = authenState.login;
  const [remember, setRemember] = useState(getRememberUsername());

  useEffect(() => {
    if (authenState.login.currentUser && getAccessToken()) {
      navigator('/', { replace: true });
    }
  });

  let errorUsername = {};
  let errorPassword = {};

  if (error) {
    if (error.key && error.key === 'username') errorUsername = { mess: error.mess };
    if (error.key && error.key === 'password') errorPassword = { mess: error.mess };
  }

  const initialValues = {
    username: authenState.register?.username || '',
    password: '',
  };

  const validateSchema = {
    username: {
      required: true,
      min: 6,
      max: 20,
    },
    password: {
      required: true,
      min: 6,
      max: 20,
    },
  };

  const handleSubmit = (user) => {
    loginUser(user, authenDispatch, navigator);
  };

  const handleRememberUsername = (checkbox) => {
    setRememberUsername(checkbox.checked);
    setRemember(checkbox.checked);
  };

  const handleLoginSocialSuccess = (response, type) => {
    if (type === 'google') loginGoogle(response, authenDispatch, navigator);
    if (type === 'github') loginGithub(response, authenDispatch, navigator);
    if (type === 'facebook') loginFacebook(response, authenDispatch, navigator);
  };

  const inputRef = useRef(null);

  useEffect(() => {
    if (authenState.register?.username) {
      inputRef?.current?.focus();
    }
  }, [authenState.register?.username]);

  return (
    <Helmet title={'Login'}>
      <div className={cx('wrapper')}>
        <Link to="/" className={cx('btn_home')}>
          <i className="fa-solid fa-square-xmark"></i>
        </Link>
        <h1 className={cx('heading')}>Login</h1>

        <Form
          className={cx('form_login')}
          initialValues={initialValues}
          validateSchema={validateSchema}
          onSubmit={handleSubmit}
        >
          <FormInput
            border
            type="text"
            name="username"
            label="Username"
            errorMess={errorUsername}
          />
          <FormInput
            inputRef={inputRef}
            border
            type="password"
            name="password"
            label="Password"
            errorMess={errorPassword}
          />
          <CheckBox
            title="Remember username ?"
            onChange={handleRememberUsername}
            checked={remember}
          />
          <Button primary className={cx('btn_login')}>
            Login
          </Button>
        </Form>
        <div className={cx('social_media')}>
          <p>--OR LOGIN WITH--</p>
          <Google onSuccess={handleLoginSocialSuccess}>
            <Button google outline leftIcon={<i className="fa-brands fa-google"></i>}>
              GOOGLE
            </Button>
          </Google>

          <Facebook onSuccess={handleLoginSocialSuccess}>
            <Button facebook outline leftIcon={<i className="fa-brands fa-facebook-f"></i>}>
              FACEBOOK
            </Button>
          </Facebook>

          <Github onSuccess={handleLoginSocialSuccess}>
            <Button github outline leftIcon={<i className="fa-brands fa-github"></i>}>
              GITHUB
            </Button>
          </Github>
        </div>
        <div className={cx('navigator')}>
          <span>Don't you have an account ?</span>
          <Button fill text to="/register">
            Register
          </Button>
        </div>
        <div className={cx('navigator')}>
          <Button fill text to="/forgotten">
            Forgotten password ?
          </Button>
        </div>
      </div>
    </Helmet>
  );
}

export default Login;
