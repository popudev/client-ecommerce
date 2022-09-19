import { useEffect, useRef, memo, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Filter.module.scss';
import { useSearchParams } from 'react-router-dom';
import overplay from '../OverPlay/core/overplay';

const cx = classNames.bind(styles);

function FilterSort({ filterState, dispatch, onToggle }) {
  const { sort } = filterState;
  const [visible, setVisible] = useState(false);
  const handleOnToggle = () => {
    overplay.toggle();
    setVisible((prev) => !prev);
  };

  if (onToggle) onToggle.current = handleOnToggle;

  const priceSelect = useRef(null);
  const nameSelect = useRef(null);

  useEffect(() => {
    sort.forEach((e) => {
      if (e.type === 'sale' && e.order === '') priceSelect.current.value = '';
      else if (e.order === '') nameSelect.current.value = '';
    });
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
    <div className={cx('sort-content', { active: visible })}>
      <span>Sort by:</span>
      <select name="updateAt" onChange={handleChangeSort}>
        <option value="asc">Latest</option>
        <option value="desc">Oldest</option>
      </select>
      <select ref={priceSelect} name="sale" defaultValue={''} onChange={handleChangeSort}>
        <option value="">Price</option>
        <option value="asc">Price: Low to Hight</option>
        <option value="desc">Price: Hight to Low</option>
      </select>
      <select ref={nameSelect} name="firtWord" defaultValue={''} onChange={handleChangeSort}>
        <option value="">Name</option>
        <option value="asc">Name: A to Z</option>
        <option value="desc">Name: Z to A</option>
      </select>
      <button onClick={handleOnToggle}>
        <i className="fa-regular fa-circle-xmark"></i>
      </button>
    </div>
  );
}

export default memo(FilterSort);
