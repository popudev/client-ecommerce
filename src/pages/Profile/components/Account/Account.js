import { useState } from 'react';

import classNames from 'classnames/bind';

import { useGlobalState } from '~/hooks';
import { updateInfoUser } from '~/services/userService';

import Avatar from '~/components/Avatar';
import Button from '~/components/Button';
import { Form, FormInput } from '~/components/Form';

import styles from './Account.module.scss';

const cx = classNames.bind(styles);

function Account() {
  const { globalState, dispatch } = useGlobalState();
  const { login } = globalState;
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
    console.log('user: ', user);

    updateInfoUser(user, dispatch);
  };

  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('title')}>Account Settings</h1>

      <div className={cx('content')}>
        <div className={cx('form')}>
          <Form className={cx('form_account')} initialValues={initialValues} onSubmit={handleSubmit}>
            {currentUser?.username && <FormInput outline disabled type="text" name="username" label="Username" />}
            <FormInput outline type="text" name="fullname" label="Full Name" />
            <FormInput outline type="text" disabled={currentUser?.provider !== 'local'} name="email" label="Email" />
            <FormInput outline type="text" name="phone" label="Phone" />

            <Button primary className={cx('btn_account')}>
              Save
            </Button>
          </Form>
        </div>

        <span className={cx('border')}></span>

        <div className={cx('avatar')}>
          <Avatar className={cx('avatar__image')} avatar={randomUrl} />
          <Button outline className={cx('btn_random')} onClick={handleRandomAvatar}>
            Random Avatar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Account;
