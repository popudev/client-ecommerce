import classNames from 'classnames/bind';

import { avatarDefault } from '~/assets/images';

import styles from './Avatar.module.scss';

const cx = classNames.bind(styles);

function Avatar({ avatar, className }) {
  return (
    <div className={cx('wrapper', className)}>
      <img src={avatar || avatarDefault} alt="user's avatar" />
    </div>
  );
}

export default Avatar;
