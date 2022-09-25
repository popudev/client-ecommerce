import { Link, useNavigate } from 'react-router-dom';

import classNames from 'classnames/bind';

import { background } from '~/assets/images';
import { useGlobalState } from '~/hooks';
import { registerUser } from '~/services/authenService';

import Button from '~/components/Button';
import { Form, FormInput } from '~/components/Form';
import Helmet from '~/components/Helmet';

import styles from './Register.module.scss';

const cx = classNames.bind(styles);

function Register() {
  const navigator = useNavigate();
  const { globalState, dispatch } = useGlobalState();
  const { register } = globalState;
  let errorExistEmail = {};
  let errorExistUsename = {};

  if (register.error) {
    if (register.error.keyPattern.email) errorExistEmail = { mess: 'Email is exist' };
    if (register.error.keyPattern.username) errorExistUsename = { mess: 'Username is exist' };
  }

  const initialValues = {
    fullname: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  };

  const validateSchema = {
    fullname: {
      required: true,
    },
    email: {
      required: true,
      email: true,
    },
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
    confirmPassword: {
      required: true,
      confirm: 'password',
    },
  };

  const handleSubmit = (user) => {
    registerUser(user, dispatch, navigator);
  };

  return (
    <Helmet title={'Register'}>
      <div className={cx('wrapper')}>
        <div className={cx('background')}>
          <img src={background} alt="" />
        </div>
        <div className={cx('content')}>
          <Link to="/" className={cx('btn_home')}>
            <i className="fa-solid fa-square-xmark"></i>
          </Link>

          <h1 className={cx('heading')}>Register</h1>

          <Form
            className={cx('from_login')}
            initialValues={initialValues}
            validateSchema={validateSchema}
            onSubmit={handleSubmit}
          >
            <FormInput type="text" name="fullname" label="Fullname" />
            <FormInput type="text" name="email" label="Email" errorMess={errorExistEmail} />
            <FormInput type="text" name="username" label="Username" errorMess={errorExistUsename} />
            <FormInput type="password" name="password" label="Password" />
            <FormInput type="password" name="confirmPassword" label="Confirm Password" />
            <Button primary className={cx('btn_login')}>
              Register
            </Button>
          </Form>

          <div className={cx('navigator')}>
            <span>Do you have an account ?</span>
            <Button fill text to="/login">
              Login
            </Button>
          </div>
        </div>
      </div>
    </Helmet>
  );
}

export default Register;
