import { useState } from 'react';
import { useDidUpdate } from '~/hooks';
import styles from './Pagination.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function InputPage({ pageInit, pageCount, onPageChange }) {
  const [currentPage, setCurrentPage] = useState(pageInit);

  useDidUpdate(() => {
    setCurrentPage(pageInit);
  }, [pageInit]);

  const handleInputPageChange = (e) => {
    if (!e.target.value) {
      setCurrentPage('');
      return;
    }

    const page = Number.parseInt(e.target.value);
    if (page < 1) setCurrentPage(1);
    else if (page > pageCount) setCurrentPage(pageCount);
    else setCurrentPage(page);
  };

  const handleBlur = (e) => {
    if (!e.target.value) setCurrentPage(pageInit);
    else if (currentPage !== pageInit) onPageChange(currentPage);
  };

  const handleOnSumit = (e) => {
    e.preventDefault();
    if (currentPage !== pageInit) onPageChange(currentPage);
  };

  return (
    <form onSubmit={handleOnSumit} className={cx('input_page')}>
      <input type="number" name="page" onChange={handleInputPageChange} onBlur={handleBlur} value={currentPage} />
      <span> / {pageCount}</span>
    </form>
  );
}

export default InputPage;
