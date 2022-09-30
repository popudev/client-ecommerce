import React from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

const Button = React.forwardRef(
  (
    {
      to,
      href,
      primary = false,
      outline = false,
      text = false,
      rounded = false,
      disabled = false,
      small = false,
      large = false,
      full = false,
      w50 = false,
      hfull = false,
      square = false,
      fill = false,
      children,
      className,
      leftIcon,
      rightIcon,
      onClick,
      ...passProps
    },
    ref,
  ) => {
    let Comp = 'button';
    const props = {
      onClick,
      ...passProps,
    };

    // Remove event listener when btn is disabled
    if (disabled) {
      Object.keys(props).forEach((key) => {
        if (key.startsWith('on') && typeof props[key] === 'function') {
          delete props[key];
        }
      });
    }

    if (to) {
      props.to = to;
      Comp = Link;
    } else if (href) {
      props.href = href;
      Comp = 'a';
    }

    const classes = cx('wrapper', {
      [className]: className,
      primary,
      outline,
      text,
      disabled,
      rounded,
      small,
      large,
      square,
      full,
      w50,
      hfull,
      fill,
    });

    return (
      <Comp ref={ref} className={classes} {...props}>
        {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
        <span className={cx('title')}>{children}</span>
        {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
      </Comp>
    );
  },
);

Button.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  primary: PropTypes.bool,
  outline: PropTypes.bool,
  text: PropTypes.bool,
  rounded: PropTypes.bool,
  disabled: PropTypes.bool,
  small: PropTypes.bool,
  large: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  onClick: PropTypes.func,
};

export default Button;
