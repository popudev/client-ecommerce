import { notFoundImg } from '~/assets/images';

import Helmet from '~/components/Helmet';

import styles from './NotFound.module.scss';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function NotFound() {
  return (
    <Helmet title="not found">
      <div className={cx('wrapper')}>
        <div className={cx('image')}>
          <img src={notFoundImg} alt="" />
        </div>
      </div>
    </Helmet>
  );
}

export default NotFound;
