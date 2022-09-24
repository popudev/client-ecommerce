import classnames from 'classnames/bind';

import styles from './Skeleton.module.scss';

const cx = classnames.bind(styles);

function Skeleton(props) {
  const { width, height, count = 1, borderRadius = 0, second = false } = props;

  const style = {
    width,
    height,
    borderRadius,
  };

  const classes = cx('wrapper', {
    second,
  });

  return (
    <>
      {Array(count)
        .fill(0)
        .map((e, index) => {
          return <span key={index} className={classes} style={style}></span>;
        })}
    </>
  );
}

export default Skeleton;
