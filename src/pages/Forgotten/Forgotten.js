import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useRecoverState from '~/hooks/useRecoverState';
import { getUserByEmailOrPhone } from '~/services/userService';

import Button from '~/components/Button';
import { Form, FormInput } from '~/components/Form';
import Helmet from '~/components/Helmet';

import styles from './Forgotten.module.scss';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Forgotten() {
  const [error, setError] = useState({});
  const { recoverDispatch } = useRecoverState();
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
    const res = await getUserByEmailOrPhone(values.search, recoverDispatch, navigator);
    console.log('res: ', res);
    if (res.error) {
      setError({ ...res });
    }
  };

  return (
    <Helmet title="forgotten">
      <div className={cx('wrapper')}>
        <h1 className={cx('header')}>Find Your Account</h1>
        <p className={cx('desc')}>
          Please enter your email address or mobile number to search for your account.
        </p>
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
    </Helmet>
  );
}

export default Forgotten;
