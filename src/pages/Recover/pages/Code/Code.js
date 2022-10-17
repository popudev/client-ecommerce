import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useRecoverState from '~/hooks/useRecoverState';
import { confirmCodeViaEmail } from '~/services/authenService';

import Button from '~/components/Button';
import { Form, FormInput } from '~/components/Form';

import styles from './Code.module.scss';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Recover() {
  const [error, setError] = useState({});
  const { recoverState, recoverDispatch } = useRecoverState();
  const submitRef = useRef({});
  const navigator = useNavigate();

  const { accountFound } = recoverState;

  const initialValues = {
    code: '',
  };

  const validateSchema = {
    code: {
      required: true,
      min: 6,
    },
  };

  const handleCancel = () => {
    navigator('/login', { replace: true });
  };

  const handleSubmit = async (values) => {
    const data = {
      code: +values.code,
      email: accountFound?.email,
    };
    const res = await confirmCodeViaEmail(data, recoverDispatch, navigator);
    if (res.error) {
      setError({ ...res });
    }
  };

  return (
    <>
      <h1 className={cx('header')}>Enter security code</h1>

      <p className={cx('desc')}>
        Please check your emails for a message with your code. Your code is 6 numbers long.
      </p>

      <div className={cx('content')}>
        <Form
          className={cx('form_code')}
          initialValues={initialValues}
          validateSchema={validateSchema}
          onSubmit={handleSubmit}
          submitRef={submitRef}
        >
          <FormInput border type="text" name="code" errorMess={error} />
        </Form>

        <div>
          <h4>We sent your code to:</h4>
          <p>{accountFound?.email}</p>
        </div>
      </div>

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

export default Recover;
