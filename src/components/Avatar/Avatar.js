import { avatarDefault } from '~/assets/images';

import styles from './Avatar.module.scss';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Avatar({ avatar, className }) {
  const handleError = (e) => {
    e.target.src = avatarDefault;
  };

  return (
    <div className={cx('wrapper', className)}>
      <img src={avatar || avatarDefault} alt="user's avatar" onError={handleError} />
    </div>
  );
}

export default Avatar;
