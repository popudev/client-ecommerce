import classNames from 'classnames/bind';
import styles from './Table.module.scss';

const cx = classNames.bind(styles);

function Table(props) {
  const { children, titles, className } = props;

  const classes = cx('wrapper', {
    [className]: className,
  });

  return (
    <div style={{ overflowX: 'auto' }}>
      <table className={classes}>
        <thead>
          <tr className={cx('title')}>
            {titles.map((title) => {
              return <th key={title}>{title}</th>;
            })}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export default Table;
