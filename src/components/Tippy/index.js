import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from '~/hooks';
import styles from './Tippy.module.scss';
const cx = classNames.bind(styles);

function Tippy(props) {
  const {
    interactive = false,
    renderForMobile = true,
    className,
    children,
    render,
    visible,
    placement = 'bottom',
    width = '100%',
  } = props;

  const [hover, setHover] = useState(false);
  const hoverValue = useDebounce(hover, 100);

  useEffect(() => {
    if (visible || hoverValue) {
      document.documentElement.style.overflowY = 'hidden';
    } else {
      document.documentElement.style.overflowY = 'overlay';
    }
    return () => {
      document.documentElement.style.overflowY = 'overlay';
    };
  });

  let style = {
    width,
  };

  switch (placement) {
    case 'bottom':
      style = {
        ...style,
        left: '50%',
        transform: 'translateX(-50%)',
      };
      break;

    case 'bottom-end':
      style = {
        ...style,
        right: 0,
      };
      break;
    default:
  }

  //event

  const handleMouseOver = () => {
    if (!interactive) setHover(true);
  };

  const handleMouseOut = () => {
    if (!interactive) setHover(false);
  };

  const classes = cx('wrapper', {
    [className]: className,
    mobile: !renderForMobile,
  });

  return (
    <div className={classes} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      {children}
      {(visible || hoverValue) && (
        <div className={cx('render')} style={style}>
          {render()}
        </div>
      )}
    </div>
  );
}

export default Tippy;
