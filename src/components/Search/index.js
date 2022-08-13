import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import Tippy from '~/components/Tippy';
import { ProductItemSearch } from '~/components/Product';
import Propper from '~/components/Propper';
import { useDebounce } from '~/hooks';

const cx = classNames.bind(styles);

function Search() {
  const [searchResult, setSearchResult] = useState([]);
  const [title, setTitle] = useState('');
  const [focus, setFocus] = useState(false);

  const titleValue = useDebounce(title, 500);
  const focusValue = useDebounce(focus, 300);

  useEffect(() => {
    if (titleValue) {
      console.log('api');
      setTimeout(() => {
        setSearchResult([
          {
            id: 1,
          },
          {
            id: 2,
          },
          {
            id: 3,
          },
        ]);
      }, 3000);
    } else {
      setSearchResult([]);
    }
  }, [titleValue]);

  return (
    <Tippy
      visible={searchResult.length > 0 && focusValue}
      render={() => {
        return (
          <Propper>
            {searchResult.map((e) => (
              <ProductItemSearch key={e?.id} info={e} />
            ))}
            <Link to={`/shop?title=${titleValue}`}>
              <h4 className={cx('view-all')}>View all results for "{titleValue}"</h4>
            </Link>
          </Propper>
        );
      }}
    >
      <div className={cx('wrapper')}>
        <input
          className={cx('input')}
          placeholder="Search..."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          onClick={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        ></input>
        <button className={cx('btn')}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </Tippy>
  );
}

export default Search;
