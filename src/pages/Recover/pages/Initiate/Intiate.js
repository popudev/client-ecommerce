import { useNavigate } from 'react-router-dom';

import { avatarDefault } from '~/assets/images';
import useRecoverState from '~/hooks/useRecoverState';
import { sendCodeViaEmail } from '~/services/authenService';

import Avatar from '~/components/Avatar';
import Button from '~/components/Button';
import CheckBox from '~/components/CheckBox';

import styles from './Intiate.module.scss';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Intiate() {
  const { recoverState } = useRecoverState();
  const navigator = useNavigate();
  const { accountFound } = recoverState;

  const handleNotYou = () => {
    navigator('/forgotten', { replace: true });
  };

  const handleClick = () => {
    if (accountFound?.email) sendCodeViaEmail(accountFound?.email, navigator);
  };

  return (
    <>
      <h1 className={cx('header')}>Reset Your Password</h1>

      <div className={cx('account_found')}>
        <Avatar avatar={accountFound?.avatar || avatarDefault} className={cx('avatar')} />

        <div className={cx('info')}>
          <h3>{accountFound?.username}</h3>
          <p>{accountFound?.email || accountFound?.phone}</p>
        </div>
      </div>

      <div className={cx('method')}>
        <CheckBox checked disabled title="Send code via email" />
        <p>{accountFound?.email || accountFound?.phone}</p>
      </div>

      <div className={cx('actions')}>
        <Button text onClick={handleNotYou}>
          Not you ?
        </Button>
        <Button primary onClick={handleClick}>
          Continue
        </Button>
      </div>
    </>
  );
}

export default Intiate;
