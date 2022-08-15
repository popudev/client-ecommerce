import styles from './Pagination.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function PaginationMini(props) {
  const { page, pageCount, nextPage, prevPage } = props;

  return (
    <div className={cx('pagination-mini')}>
      <span>
        {page}/{pageCount}
      </span>
      <div className={cx('control-mini')}>
        <button
          onClick={() => {
            prevPage();
          }}
        >
          {'<'}
        </button>
        <button
          onClick={() => {
            nextPage();
          }}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
}

export default PaginationMini;
