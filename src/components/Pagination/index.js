import { useEffect, useState } from 'react';

import styles from './Pagination.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function Pagination({ totalPages, onChange }) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    onChange(currentPage);
  }, [currentPage, onChange]);

  const firtPage = 1;
  const lastPage = totalPages;

  let prevPage = currentPage - 1;
  let nextPage = currentPage + 1;

  const pagination = [];

  pagination.push(firtPage);

  if (currentPage === firtPage) {
    prevPage = firtPage;
    pagination.push(nextPage, nextPage + 1, '...', lastPage);
  } else if (currentPage === lastPage) {
    nextPage = lastPage;
    pagination.push('...', prevPage - 1, prevPage, lastPage);
  } else {
    if (prevPage === firtPage) pagination.push(currentPage);
    else pagination.push('...', prevPage, currentPage);

    if (nextPage === lastPage) pagination.push(lastPage);
    else pagination.push(nextPage, '...', lastPage);
  }

  return (
    <div className={cx('wrapper')}>
      <button className={cx('control-left')} onClick={() => setCurrentPage(prevPage)}>
        {'<'}
      </button>
      <ul className={cx('number')}>
        {pagination.map((page, i) => {
          return (
            <li
              key={i}
              className={cx('number__item', {
                active: page === currentPage,
              })}
              onClick={() => {
                setCurrentPage(page);
              }}
            >
              {page}
            </li>
          );
        })}
      </ul>
      <button className={cx('control-right')} onClick={() => setCurrentPage(nextPage)}>
        {'>'}
      </button>
    </div>
  );
}

export default Pagination;
