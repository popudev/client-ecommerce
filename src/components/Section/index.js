import classNames from 'classnames/bind';
import styles from './Section.module.scss';

const cx = classNames.bind(styles);

const Section = ({ children }) => {
  return <div className={cx('wrapper', 'container')}>{children}</div>;
};

export const SectionTitle = ({ children }) => {
  return <div className={cx('title')}>{children}</div>;
};

export const SectionBody = ({ children }) => {
  return <div className={cx('body')}>{children}</div>;
};

export default Section;
