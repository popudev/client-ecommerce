import classNames from 'classnames/bind';
import styles from './Tippy.module.scss';
const cx = classNames.bind(styles);

function Tippy(props) {
  const { children, render, visible, placement = 'bottom' } = props;

  const style = {};

  return (
    <div className={cx('wrapper')}>
      {children}
      {visible && (
        <div className={cx('render')} style={style}>
          {render()}
        </div>
      )}
    </div>
  );
}

export default Tippy;
