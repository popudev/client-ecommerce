import { useState } from 'react';

import { useAuthenState } from '~/hooks';
import { sendVerificationEmail } from '~/services/authenService';
import { updateInfoUser } from '~/services/userService';

import Avatar from '~/components/Avatar';
import Button from '~/components/Button';
import { Form, FormInput } from '~/components/Form';
import Helmet from '~/components/Helmet';

import styles from './Account.module.scss';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Account() {
  const { authenState, authenDispatch } = useAuthenState();
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
    const url = `https://api.multiavatar.com/${Math.round(Math.random() * 100000)}.svg`;
    setRandomUrl(url);
  };

  const handleSubmit = (values) => {
    const user = {
      ...values,
      avatar: randomUrl,
    };
    updateInfoUser(user, authenDispatch);
  };

  const handleVerifyEmail = () => {
    sendVerificationEmail();
  };

  return (
    <Helmet title="account">
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
                <FormInput outline disabled type="text" name="username" label="Username" />
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

          <div className={cx('avatar')}>
            <Avatar className={cx('avatar__image')} avatar={randomUrl} />
            <Button outline className={cx('btn_random')} onClick={handleRandomAvatar}>
              Random Avatar
            </Button>
          </div>
        </div>
      </div>
    </Helmet>
  );
}

export default Account;
