import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import classNames from 'classnames/bind';

import { background } from '~/assets/images';
import { useGlobalState } from '~/hooks';
import { loginFacebook, loginGithub, loginGoogle, loginUser } from '~/services/authenService';
import { getRememberUsername, setRememberUsername } from '~/utils/localStorage';

import Button from '~/components/Button';
import CheckBox from '~/components/CheckBox/CheckBox';
import Facebook from '~/components/Facebook';
import { Form, FormInput } from '~/components/Form';
import Github from '~/components/Github';
import Google from '~/components/Google';
import Helmet from '~/components/Helmet';

import styles from './Login.module.scss';

const cx = classNames.bind(styles);

function Login() {
  const navigator = useNavigate();
  const { globalState, dispatch } = useGlobalState();
  const { error } = globalState.login;
  const [remember, setRemember] = useState(getRememberUsername());

  // useEffect(() => {
  //   if (globalState.login.currentUser && getAccessToken()) {
  //     navigator('/', { replace: true });
  //   }
  // });

  let errorUsername = {};
  let errorPassword = {};

  if (error) {
    if (error.key && error.key === 'username') errorUsername = { mess: error.mess };
    if (error.key && error.key === 'password') errorPassword = { mess: error.mess };
  }

  const initialValues = {
    username: globalState.register?.username || '',
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
    loginUser(user, dispatch, navigator);
  };

  const handleRememberUsername = (checkbox) => {
    setRememberUsername(checkbox.checked);
    setRemember(checkbox.checked);
  };

  const handleLoginSocialSuccess = (response, type) => {
    if (type === 'google') loginGoogle(response, dispatch, navigator);
    if (type === 'github') loginGithub(response, dispatch, navigator);
    if (type === 'facebook') loginFacebook(response, dispatch, navigator);
  };

  return (
    <Helmet title={'Login'}>
      <div className={cx('wrapper')}>
        <div className={cx('background')}>
          <img src={background} alt="" />
        </div>
        <div className={cx('content')}>
          <Link to="/" className={cx('btn_home')}>
            <i className="fa-solid fa-square-xmark"></i>
          </Link>
          <h1 className={cx('heading')}>Login</h1>

          <Form
            className={cx('from_login')}
            initialValues={initialValues}
            validateSchema={validateSchema}
            onSubmit={handleSubmit}
          >
            <FormInput
              type="text"
              name="username"
              label="Username"
              value={globalState.register?.username}
              errorMess={errorUsername}
            />
            <FormInput type="password" name="password" label="Password" errorMess={errorPassword} />
            <CheckBox title="Remember username ?" onChange={handleRememberUsername} checked={remember} />
            <Button primary className={cx('btn_login')}>
              Login
            </Button>
          </Form>
          <div className={cx('social_media')}>
            <p>--OR LOGIN WITH--</p>
            <Google onSuccess={handleLoginSocialSuccess}>
              <Button outline leftIcon={<i className="fa-brands fa-google"></i>}>
                GOOGLE
              </Button>
            </Google>

            <Facebook onSuccess={handleLoginSocialSuccess}>
              <Button outline leftIcon={<i className="fa-brands fa-facebook-f"></i>}>
                FACEBOOK
              </Button>
            </Facebook>

            <Github onSuccess={handleLoginSocialSuccess}>
              <Button outline leftIcon={<i className="fa-brands fa-github"></i>}>
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
            <Button fill text to="/register">
              Forgotten password ?
            </Button>
          </div>
        </div>
      </div>
    </Helmet>
  );
}

export default Login;
