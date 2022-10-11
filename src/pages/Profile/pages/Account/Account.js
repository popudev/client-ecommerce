import { useState } from 'react';

import classNames from 'classnames/bind';

import { useAuthenState } from '~/hooks';
import { verifyEmail } from '~/services/authenService';
import { updateInfoUser } from '~/services/userService';

import Avatar from '~/components/Avatar';
import Button from '~/components/Button';
import { Form, FormInput } from '~/components/Form';

import styles from './Account.module.scss';

const cx = classNames.bind(styles);

function Account() {
  const { authenState, dispatch } = useAuthenState();
  const { login } = authenState;
  const { currentUser } = login;
  const [randomUrl, setRandomUrl] = useState(currentUser?.avatar);

  const initialValues = {
    username: currentUser?.username || '',
    fullname: currentUser?.fullname || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
  };

  const handleRandomAvatar = () => {
    const url = `https://api.multiavatar.com/${Math.round(
      Math.random() * 100000,
    )}.svg`;
    setRandomUrl(url);
  };

  const handleSubmit = (values) => {
    const user = {
      ...values,
      avatar: randomUrl,
    };
    updateInfoUser(user, dispatch);
  };

  const handleVerifyEmail = () => {
    verifyEmail();
  };

  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('title')}>Account Settings</h1>

      <div className={cx('content')}>
        <div className={cx('form')}>
          <Form
            className={cx('form_account')}
            initialValues={initialValues}
            onSubmit={handleSubmit}
          >
            {currentUser?.username && (
              <FormInput
                outline
                disabled
                type="text"
                name="username"
                label="Username"
              />
            )}
            <FormInput outline type="text" name="fullname" label="Full Name" />
            <FormInput
              outline
              type="text"
              disabled={currentUser?.provider !== 'local'}
              name="email"
              label="Email"
            >
              {!currentUser?.verify && (
                <Button
                  type="button"
                  fill
                  className={cx('btn_verify')}
                  outline
                  onClick={handleVerifyEmail}
                >
                  verify
                </Button>
              )}
              {currentUser?.verify && (
                <Button type="button" className={cx('btn_check')} fill>
                  <i className="fa-solid fa-circle-check"></i>
                </Button>
              )}
            </FormInput>
            <FormInput outline type="text" name="phone" label="Phone" />

            <Button primary className={cx('btn_account')}>
              Save
            </Button>
          </Form>
        </div>

        <span className={cx('border')}></span>

        <div className={cx('avatar')}>
          <Avatar className={cx('avatar__image')} avatar={randomUrl} />
          <Button
            outline
            className={cx('btn_random')}
            onClick={handleRandomAvatar}
          >
            Random Avatar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Account;
