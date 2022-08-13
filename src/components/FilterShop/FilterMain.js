import { useState, useEffect, useCallback } from 'react';
import { fakeRams, fakeRoms, fakeServices } from '~/assets/data';
import { getCategoryList } from '~/services/categoryService';
import { add, del } from '~/reducer/actions';
import CheckBox from '~/components/CheckBox';
import PriceRangeSlider from '~/components/PriceRangeSlider';

import classNames from 'classnames/bind';
import styles from './Filter.module.scss';
import { useFilterState } from '~/hooks';

const cx = classNames.bind(styles);

function Filter() {
  console.log('re-render filter shop');
  const [categories, setCategories] = useState([]);

  const [filterState, dispatch] = useFilterState();
  const { categoryId, rams, roms, services, resetPrice } = filterState;

  useEffect(() => {
    const fetchApiGetCategoryList = async () => {
      const categories = await getCategoryList();
      setCategories(categories);
    };
    fetchApiGetCategoryList();
  }, []);

  const handleFilter = (type, input, id) => {
    if (input.checked) dispatch(add(type, id));
    else dispatch(del(type, id));
  };

  const handlePriceChange = useCallback(
    (rangePrice) => {
      dispatch({
        type: 'change_price',
        payload: rangePrice,
      });
    },
    [dispatch],
  );

  const handleClearFilter = () => {
    document.documentElement.scrollTop = 0;
    dispatch({ type: 'clear_filter' });
  };

  return (
    <div className={cx('filter')}>
      <div className={cx('wedget')}>
        <div className={cx('wedget__title')}>
          <h3>Category</h3>
        </div>
        <div className={cx('wedget__content')}>
          {categories.map((item) => {
            return (
              <CheckBox
                key={item.id}
                title={item.title}
                onChange={(input) => {
                  handleFilter('category', input, item.id);
                }}
                checked={categoryId.includes(item.id)}
              />
            );
          })}
        </div>
      </div>
      <div className={cx('wedget')}>
        <div className={cx('wedget__title')}>
          <h3>Price Range</h3>
        </div>
        <div className={cx('wedget__content')}>
          <PriceRangeSlider min={0} max={999} onPriceChange={handlePriceChange} reset={resetPrice} />
        </div>
      </div>
      <div className={cx('wedget')}>
        <div className={cx('wedget__title')}>
          <h3>RAM</h3>
        </div>
        <div className={cx('wedget__content')}>
          {fakeRams.map((item) => {
            return (
              <CheckBox
                key={item.title}
                title={item.title}
                onChange={(input) => {
                  handleFilter('ram', input, input.value);
                }}
                checked={rams.includes(item.id)}
              />
            );
          })}
        </div>
      </div>
      <div className={cx('wedget')}>
        <div className={cx('wedget__title')}>
          <h3>ROM</h3>
        </div>
        <div className={cx('wedget__content')}>
          {fakeRoms.map((item) => {
            return (
              <CheckBox
                key={item.title}
                title={item.title}
                onChange={(input) => {
                  handleFilter('rom', input, input.value);
                }}
                checked={roms.includes(item.id)}
              />
            );
          })}
        </div>
      </div>
      <div className={cx('wedget')}>
        <div className={cx('wedget__title')}>
          <h3>Service and Promotion</h3>
        </div>
        <div className={cx('wedget__content')}>
          {fakeServices.map((item) => {
            return (
              <CheckBox
                key={item.title}
                title={item.title}
                onChange={(input) => {
                  handleFilter('service', input, input.value);
                }}
                checked={services.includes(item.id)}
              />
            );
          })}
        </div>
      </div>
      <button className={cx('btn-clear-filter')} onClick={handleClearFilter}>
        Clear Filter
      </button>
    </div>
  );
}

export default Filter;