import { useRef, useState } from 'react';

import { changePasswordUser } from '~/services/userService';

import Button from '~/components/Button';
import { Form, FormInput } from '~/components/Form';
import Helmet from '~/components/Helmet';

import styles from './Password.module.scss';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const initialValues = {
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};

const validateSchema = {
  currentPassword: {
    required: true,
    min: 6,
  },
  newPassword: {
    required: true,
    min: 6,
  },
  confirmNewPassword: {
    required: true,
    min: 6,
  },
};

function Password() {
  const [errorCurrentPassword, setErrorCurrentPassword] = useState({});
  const [errorNewPassword, setErrorNewPassword] = useState({});
  const cleanRef = useRef({});

  const handleSubmit = async (values) => {
    const res = await changePasswordUser(values);
    if (!res.error) cleanRef.current();
    else {
      if (res.key === 'currentPassword') setErrorCurrentPassword({ ...res });
      else setErrorNewPassword({ ...res });
    }
  };

  return (
    <Helmet title="password">
      <div className={cx('wrapper')}>
        <h1 className={cx('title')}>Change Password</h1>
        <div className={cx('content')}>
          <div className={cx('form')}>
            <Form
              className={cx('form_change_password')}
              initialValues={initialValues}
              validateSchema={validateSchema}
              onSubmit={handleSubmit}
              cleanRef={cleanRef}
            >
              <FormInput
                outline
                type="password"
                name="currentPassword"
                label="Current Password"
                errorMess={errorCurrentPassword}
              />

              <FormInput
                outline
                type="password"
                name="newPassword"
                label="New Password"
                errorMess={errorNewPassword}
              />

              <FormInput
                outline
                type="password"
                name="confirmNewPassword"
                label="Confirm Password"
              />
              <Button type="submit" primary className={cx('btn_change')}>
                Change Password
              </Button>
              <Button type="button" to="/forgotten" text className={cx('btn_forgotten_password')}>
                Forgotten Current Password ?
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </Helmet>
  );
}

export default Password;
