import Skeleton from '~/components/Skeleton';

import styles from './Pagination.module.scss';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function PaginationMini(props) {
  const { page, pageCount, nextPage, prevPage } = props;

  return (
    <div className={cx('pagination-mini')}>
      <span>
        {/* <InputPage pageInit={page} pageCount={pageCount} /> */}
        {page}/{pageCount}
      </span>
      <div className={cx('control-mini')}>
        <button
          className={cx({ disable: page === 1 })}
          onClick={() => {
            prevPage.current();
          }}
        >
          {'<'}
        </button>
        <button
          className={cx({ disable: page === pageCount })}
          onClick={() => {
            nextPage.current();
          }}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
}

PaginationMini.Loading = () => {
  return (
    <div className={cx('pagination-mini')}>
      <span>
        <Skeleton second width={30} borderRadius={10} height="100%" />/
        <Skeleton second width={30} borderRadius={10} height="100%" />
      </span>
      <div className={cx('control-mini')}>
        <button>{'<'}</button>
        <button>{'>'}</button>
      </div>
    </div>
  );
};

export default PaginationMini;
