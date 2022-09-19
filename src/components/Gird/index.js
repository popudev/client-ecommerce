import { PropTypes } from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Grid.module.scss';

const cx = classNames.bind(styles);

function Grid(props) {
  const col = props.col ? `grid-col-${props.col}` : '';
  const mdCol = props.mdCol ? `grid-col-md-${props.mdCol}` : '';
  const smCol = props.smCol ? `grid-col-sm-${props.smCol}` : '';
  const gap = props.gap ? `gap-${props.gap}` : '';
  const mdGap = props.mdGap ? `gap-md-${props.mdGap}` : '';
  const smGap = props.smGap ? `gap-sm-${props.smGap}` : '';

  const classes = cx('wrapper', {
    [props.wrapperClassName]: props.wrapperClassName,
    [col]: col,
    [mdCol]: mdCol,
    [smCol]: smCol,
    [gap]: gap,
    [mdGap]: mdGap,
    [smGap]: smGap,
  });

  return <div className={classes}>{props.children}</div>;
}

Grid.propTypes = {
  col: PropTypes.number.isRequired,
  mdCol: PropTypes.number,
  smCol: PropTypes.number,
  gap: PropTypes.number,
};

export default Grid;
