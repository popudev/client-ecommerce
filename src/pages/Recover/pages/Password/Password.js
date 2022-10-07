import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import classNames from 'classnames/bind';

import useRecoverState from '~/hooks/useRecoverState';
import { changePasswordWithCodeVia } from '~/services/authenService';

import Button from '~/components/Button';
import { Form, FormInput } from '~/components/Form';

import styles from './Password.module.scss';

const cx = classNames.bind(styles);

function Password() {
  const { state } = useRecoverState();
  const submitRef = useRef({});
  const navigator = useNavigate();

  const initialValues = {
    password: '',
    confirmPassword: '',
  };

  const validateSchema = {
    password: {
      required: true,
      min: 6,
    },
    confirmPassword: {
      required: true,
      min: 6,
      confirm: 'password',
    },
  };

  const handleCancel = () => {
    navigator('/login', { replace: true });
  };

  const handleSubmit = (values) => {
    const data = {
      password: values.password,
      code: state?.code,
      email: state?.accountFound?.email,
    };

    changePasswordWithCodeVia(data, navigator);
  };

  return (
    <>
      <h1 className={cx('header')}>Choose a new password</h1>

      <p className={cx('desc')}>
        Create a new password that is at least 6 characters long. A strong password has a combination of letters, digits
        and punctuation marks.
      </p>

      <Form
        className={cx('form_password')}
        initialValues={initialValues}
        validateSchema={validateSchema}
        onSubmit={handleSubmit}
        submitRef={submitRef}
      >
        <FormInput border type="password" name="password" placeholder="New password..." />
        <FormInput border type="password" name="confirmPassword" placeholder="Confirm password..." />
      </Form>

      <div className={cx('actions')}>
        <Button text onClick={handleCancel}>
          Cancel
        </Button>
        <Button primary onClick={() => submitRef.current()}>
          Continue
        </Button>
      </div>
    </>
  );
}

export default Password;
