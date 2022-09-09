import { useState, useRef, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Search.module.scss';

import Button from '~/components/Button';
import Tippy from '~/components/Tippy';
import { ProductItemSearch } from '~/components/Product';
import Propper from '~/components/Popper';
import { useDebounce, useDidMountEffect, useFilterState } from '~/hooks';
import { getProductList } from '~/services/productService';

const cx = classNames.bind(styles);

function Search() {
  const [searchResult, setSearchResult] = useState([]);
  const [focus, setFocus] = useState(false);
  const [loading, setLoading] = useState(false);

  const [filterState, dispatch] = useFilterState();
  const [title, setTitle] = useState(filterState.title);

  const navigator = useNavigate();

  const titleValue = useDebounce(title, 500);

  const focusValue = useDebounce(focus, 200);

  const inputRef = useRef(null);

  useDidMountEffect(() => {
    if (!titleValue.trim()) {
      setSearchResult([]);
      return;
    }
    const fetchSearchProducts = async () => {
      setLoading(true);
      const result = await getProductList({ title: titleValue }, 6);
      setSearchResult(result?.payload || []);
      setLoading(false);
    };

    fetchSearchProducts();
  }, [titleValue]);

  const handleClear = () => {
    setTitle('');
    inputRef.current.focus();
  };

  const handleSearchClick = () => {
    dispatch({
      type: 'change_title',
      payload: titleValue,
    });
    setTitle('');
    inputRef.current.blur();
    navigator(`/shop`);
  };

  return (
    <Tippy
      interactive
      visible={searchResult.length > 0 && focusValue}
      render={() => {
        return (
          <Propper>
            {searchResult.map((e) => (
              <ProductItemSearch key={e?._id} info={e} />
            ))}

            <Button text full onClick={handleSearchClick}>
              <h4 className={cx('view-all')}>View all results for "{titleValue}"</h4>
            </Button>
          </Propper>
        );
      }}
    >
      <div className={cx('wrapper')}>
        <div className={cx('input')}>
          <input
            ref={inputRef}
            placeholder="Search..."
            value={title}
            onChange={(e) => {
              const searchValue = e.target.value;
              if (!searchValue.startsWith(' ')) {
                setTitle(e.target.value);
              }
            }}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />

          {!!title && !loading && (
            <button className={cx('clear')} onClick={handleClear}>
              <i className="fa-solid fa-circle-xmark"></i>
            </button>
          )}

          {loading && (
            <button className={cx('spiner')}>
              <i className="fa-solid fa-spinner"></i>
            </button>
          )}
        </div>

        {/* <button className={cx('btn')}>
        </button> */}
        <Button primary onClick={handleSearchClick} onMouseDown={(e) => e.preventDefault()}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </Button>
      </div>
    </Tippy>
  );
}

export default memo(Search);
