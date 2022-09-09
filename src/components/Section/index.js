import classNames from 'classnames/bind';
import styles from './Section.module.scss';

const cx = classNames.bind(styles);

const Section = ({ children, wrapperClassName }) => {
  return <div className={cx('wrapper', wrapperClassName)}>{children}</div>;
};

export const SectionTitle = ({ children, wrapperClassName }) => {
  return <div className={cx('title', wrapperClassName)}>{children}</div>;
};

export const SectionBody = ({ children, wrapperClassName }) => {
  return <div className={cx('body', wrapperClassName)}>{children}</div>;
};

export default Section;
