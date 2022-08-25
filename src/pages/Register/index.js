import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import Button from '~/components/Button';
import Helmet from '~/components/Helmet';
import { useGlobalState } from '~/hooks';
import styles from './Register.module.scss';

import { background } from '~/assets/images';
import { Form, FormInput } from '~/components/Form';
import { registerUser } from '~/services/authenService';

const cx = classNames.bind(styles);

function Register() {
  const navigator = useNavigate();
  const { globalState, dispatch } = useGlobalState();
  const { register } = globalState;
  let errorExistEmail = {};
  let errorExistUsename = {};

  if (register.error) {
    if (register.error.keyPattern.username) errorExistUsename = { mess: 'Username is exist' };
    if (register.error.keyPattern.email) errorExistEmail = { mess: 'Email is exist' };
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
    },
    password: {
      required: true,
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
            <span>Ban da co tai khoan ?</span>
            <Link to="/login">Dang nhap</Link>
          </div>
        </div>
      </div>
    </Helmet>
  );
}

export default Register;
