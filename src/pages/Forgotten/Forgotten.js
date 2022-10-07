import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import classNames from 'classnames/bind';

import useRecoverState from '~/hooks/useRecoverState';
import { getUserByEmailOrPhone } from '~/services/userService';

import Button from '~/components/Button';
import { Form, FormInput } from '~/components/Form';

import styles from './Forgotten.module.scss';

const cx = classNames.bind(styles);

function Forgotten() {
  const [error, setError] = useState({});
  const { dispatch } = useRecoverState();
  const navigator = useNavigate();

  const initialValues = {
    search: '',
  };

  const validateSchema = {
    search: {
      required: true,
    },
  };

  const handleSubmit = async (values) => {
    const res = await getUserByEmailOrPhone(values.search, dispatch, navigator);
    console.log('res: ', res);
    if (res.error) {
      setError({ ...res });
    }
  };

  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('header')}>Find Your Account</h1>
      <p className={cx('desc')}>Please enter your email address or mobile number to search for your account.</p>
      <Form
        className={cx('form_find_account')}
        initialValues={initialValues}
        validateSchema={validateSchema}
        onSubmit={handleSubmit}
      >
        <FormInput
          border
          type="text"
          name="search"
          className={cx('form_input')}
          placeholder="Email address or mobile number"
          errorMess={error}
        />

        <div className={cx('actions')}>
          <Button type="button" text to="/login">
            Cancel
          </Button>
          <Button type="submit" primary>
            Search
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Forgotten;
