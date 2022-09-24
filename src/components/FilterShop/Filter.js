import { memo, useCallback, useEffect, useRef, useState } from 'react';

import classNames from 'classnames/bind';

import { fakeRams, fakeRoms, fakeServices } from '~/assets/data';
import { add, del } from '~/reducers/actions/filterAction';
import { getCategoryList } from '~/services/categoryService';

import Button from '~/components/Button';
import CheckBox from '~/components/CheckBox/CheckBox';
import PriceRangeSlider from '~/components/PriceRangeSlider';

import overplay from '../OverPlay/core/overplay';

import styles from './Filter.module.scss';

const cx = classNames.bind(styles);

function Filter({ filterState, dispatch, onToggle }) {
  const [categories, setCategories] = useState([]);
  const resetPrice = useRef();
  const [visible, setVisible] = useState(false);
  const { listCategoryId, rams, roms, services } = filterState;

  const handleOnToggle = () => {
    overplay.toggle();
    setVisible((prev) => !prev);
  };

  onToggle.current = handleOnToggle;

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
    resetPrice.current();
    dispatch({ type: 'clear_filter' });
  };

  return (
    <div className={cx('filter', { active: visible })}>
      <button className={cx('btn_disabel_filter')} onClick={handleOnToggle}>
        <i className="fa-regular fa-circle-xmark"></i>
      </button>
      <div className={cx('wedget')}>
        <div className={cx('wedget__title')}>
          <h3>Category</h3>
        </div>
        <div className={cx('wedget__content')}>
          {!categories.length &&
            Array(10)
              .fill(0)
              .map((e, index) => {
                return <CheckBox.Loading key={index} />;
              })}
          {categories.map((item) => {
            return (
              <CheckBox
                upper
                key={item._id}
                title={item.title}
                onChange={(input) => {
                  handleFilter('category', input, item._id);
                }}
                checked={listCategoryId.includes(item._id)}
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
          <PriceRangeSlider min={0} max={999} onPriceChange={handlePriceChange} onResetPrice={resetPrice} />
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
                checked={rams.includes(item.title)}
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
                checked={roms.includes(item.title)}
              />
            );
          })}
        </div>
      </div>
      <div className={cx('wedget', 'no_border')}>
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
                checked={services.includes(item.title)}
              />
            );
          })}
        </div>
      </div>
      <Button primary className={cx('btn-clear-filter')} onClick={handleClearFilter}>
        Clear Filter
      </Button>
    </div>
  );
}

export default memo(Filter);
