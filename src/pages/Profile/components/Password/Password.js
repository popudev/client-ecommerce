import classNames from 'classnames/bind';

import Button from '~/components/Button';
import { Form, FormInput } from '~/components/Form';

import styles from './Password.module.scss';

const cx = classNames.bind(styles);

function Password() {
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

  const handleSubmit = () => {};

  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('title')}>Change Password</h1>
      <div className={cx('content')}>
        <div className={cx('form')}>
          <Form
            className={cx('form_change_password')}
            initialValues={initialValues}
            validateSchema={validateSchema}
            onSubmit={handleSubmit}
          >
            <FormInput outline type="password" name="currentPassword" label="Current Password" />
            <FormInput outline type="password" name="newPassword" label="New Password" />
            <FormInput outline type="password" name="confirmNewPassword" label="Confirm Password" />
            <Button primary className={cx('btn_change')}>
              Change Password
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Password;
