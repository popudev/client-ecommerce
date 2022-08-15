import { useEffect, useRef, memo } from 'react';
import classNames from 'classnames/bind';
import styles from './Filter.module.scss';

const cx = classNames.bind(styles);

function FilterSort({ filterState, dispatch }) {
  const { sort } = filterState;

  const updateAtSelect = useRef(null);
  const priceSelect = useRef(null);
  const nameSelect = useRef(null);

  useEffect(() => {
    const isSort = sort.filter((e) => e.order);
    if (!isSort.length) {
      priceSelect.current.value = '';
      nameSelect.current.value = '';
    }
  });

  const handleChangeSort = (e) => {
    dispatch({
      type: 'change_sort',
      payload: {
        type: e.target.name,
        order: e.target.value,
      },
    });
  };

  return (
    <div className={cx('sort-content')}>
      <span>Sort by:</span>
      <select ref={updateAtSelect} name="updateAt" onChange={handleChangeSort}>
        <option value="asc">Latest</option>
        <option value="desc">Oldest</option>
      </select>
      <select ref={priceSelect} name="sale" defaultValue={''} onChange={handleChangeSort}>
        <option disabled value="">
          Price
        </option>
        <option value="asc">Price: Low to Hight</option>
        <option value="desc">Price: Hight to Low</option>
      </select>
      <select ref={nameSelect} name="firtWord" defaultValue={''} onChange={handleChangeSort}>
        <option disabled value="">
          Name
        </option>
        <option value="asc">Name: A to Z</option>
        <option value="desc">Name: Z to A</option>
      </select>
    </div>
  );
}

export default memo(FilterSort);
