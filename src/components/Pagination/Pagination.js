import { useState, memo } from 'react';

import styles from './Pagination.module.scss';
import classNames from 'classnames/bind';
import { useDidUpdate } from '~/hooks';
import InputPage from './InputPage';
const cx = classNames.bind(styles);

function Pagination(props) {
  const {
    initialPage = 1,
    pageCount = 1,
    pageRangeDisplayed = 3,
    marginPagesDisplayed = 2,
    breakLabel = '...',
    onClick,
    onPageChange,
    nextPage,
    prevPage,
  } = props;

  const [selected, setSelected] = useState(initialPage - 1);

  useDidUpdate(() => {
    setSelected(initialPage - 1);
  }, [initialPage]);

  const scrollTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  const createPagenation = () => {
    //initial page
    let leftSide = pageRangeDisplayed / 2;
    let rightSide = pageRangeDisplayed - leftSide;

    if (selected > pageCount - pageRangeDisplayed / 2) {
      rightSide = pageCount - selected;
      leftSide = pageRangeDisplayed - rightSide;
    } else if (selected < pageRangeDisplayed / 2) {
      leftSide = selected;
      rightSide = pageRangeDisplayed - leftSide;
    }

    const pagesBreaking = [];
    for (let index = 0; index < pageCount; index++) {
      const page = index + 1;

      if (page <= marginPagesDisplayed) {
        pagesBreaking.push({
          type: 'page',
          index,
          display: page,
        });
        continue;
      }

      if (page > pageCount - marginPagesDisplayed) {
        pagesBreaking.push({
          type: 'page',
          index,
          display: page,
        });
        continue;
      }

      const adjustedRightSide = selected === 0 && pageRangeDisplayed > 1 ? rightSide - 1 : rightSide;

      if (index >= selected - leftSide && index <= selected + adjustedRightSide) {
        pagesBreaking.push({
          type: 'page',
          index,
          display: page,
        });
        continue;
      }

      if (
        breakLabel &&
        pagesBreaking.length > 0 &&
        pagesBreaking[pagesBreaking.length - 1].type !== 'break' &&
        (pageRangeDisplayed > 0 || marginPagesDisplayed > 0)
      ) {
        pagesBreaking.push({
          type: 'break',
          index,
          display: breakLabel,
        });
      }
    }

    return pagesBreaking;
  };

  const callCallback = (selectedItem) => {
    if (onPageChange !== undefined && typeof onPageChange === 'function') {
      scrollTop();
      onPageChange(selectedItem + 1);
    }
  };

  const handlePageChange = (selected) => {
    setSelected(selected);
    callCallback(selected);
  };

  const handleClick = (
    event,
    index,
    nextSelectedPage,
    { isPrevious = false, isNext = false, isBreak = false, isActive = false } = {},
  ) => {
    let newPage = nextSelectedPage;

    if (onClick) {
      const onClickReturn = onClick({
        index,
        selected,
        nextSelectedPage,
        event,
        isPrevious,
        isNext,
        isBreak,
        isActive,
      });
      if (onClickReturn === false) {
        // We abord standard behavior and let parent handle
        // all behavior.
        return;
      }
      if (Number.isInteger(onClickReturn)) {
        // We assume parent want to go to the returned page.
        newPage = onClickReturn;
      }
    }

    if (newPage !== undefined) {
      handlePageChange(newPage);
    }
  };

  const handlePreviousPage = (event) => {
    handleClick(event, null, selected > 0 ? selected - 1 : undefined, {
      isPrevious: true,
    });
  };

  const handleNextPage = (event) => {
    handleClick(event, null, selected < pageCount - 1 ? selected + 1 : undefined, { isNext: true });
  };

  if (nextPage) nextPage.current = handleNextPage;
  if (prevPage) prevPage.current = handlePreviousPage;
  if (pageCount <= 1) return <></>;

  return (
    <div className={cx('wrapper')}>
      <button
        className={cx('control-left')}
        onClick={(e) => {
          handlePreviousPage(e);
        }}
      >
        {'<'}
      </button>
      <ul className={cx('number')}>
        <li className={cx('mobile')}>
          <InputPage
            pageInit={selected + 1}
            pageCount={pageCount}
            onPageChange={(page) => {
              handlePageChange(page - 1);
            }}
          />
        </li>

        {createPagenation().map((pageBreaking) => {
          return (
            <li
              key={pageBreaking.index}
              className={cx('number__item', {
                active: pageBreaking.index === selected,
              })}
              onClick={() => handlePageChange(pageBreaking.index)}
            >
              {pageBreaking.display}
            </li>
          );
        })}
      </ul>
      <button
        className={cx('control-right')}
        onClick={(e) => {
          handleNextPage(e);
        }}
      >
        {'>'}
      </button>
    </div>
  );
}

export default memo(Pagination);
