import { useState, useEffect } from 'react';

import classNames from 'classnames/bind';
import styles from './PriceRangeSlider.module.scss';
import { useDebounce } from '~/hooks';

const cx = classNames.bind(styles);

const calcPercent = (min, max, value, rev = false) => {
  const deviant = max - min;

  if (!rev) {
    return Math.round(((value - min) * 100) / deviant);
  }
  return Math.round(min + (deviant * value) / 100);
};

function PriceRangeSlider({ min, max, onChange }) {
  const [minPrice, setMinPrice] = useState(min);
  const [maxPrice, setMaxPrice] = useState(max);

  const debouncedValueMin = useDebounce(minPrice, 500);
  const debouncedValueMax = useDebounce(maxPrice, 500);

  const style = {
    left: calcPercent(min, max, minPrice) + '%',
    width: calcPercent(min, max, maxPrice) - calcPercent(min, max, minPrice) + '%',
  };

  const handleInputMin = (e) => {
    const value = calcPercent(min, max, e.target.value, true);
    if (calcPercent(min, max, maxPrice) - e.target.value < 10) return;
    setMinPrice(value);
  };

  const handleInputMax = (e) => {
    const value = calcPercent(min, max, e.target.value, true);
    if (e.target.value - calcPercent(min, max, minPrice) < 10) return;
    setMaxPrice(value);
  };

  useEffect(() => {
    // value = 0, '', number others
    if (debouncedValueMin !== '' && debouncedValueMin !== '') onChange([debouncedValueMin, debouncedValueMax]);
  }, [debouncedValueMin, debouncedValueMax, onChange]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('price_range')}>
        <span>Min</span>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => {
            let number = Number.parseInt(e.target.value);
            if (!number && number !== 0) {
              setMinPrice('');
            } else if (number >= min && number <= maxPrice) {
              setMinPrice(number);
            } else {
              setMinPrice(min);
            }
          }}
          onBlur={(e) => {
            let number = Number.parseInt(e.target.value);
            if (!number) setMinPrice(min);
          }}
        />
        <span>-</span>
        <span>Max</span>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => {
            let number = Number.parseInt(e.target.value);
            if (!number) {
              setMaxPrice('');
            } else if (number <= max && number >= minPrice) {
              setMaxPrice(number);
            } else {
              setMaxPrice(max);
            }
          }}
          onBlur={(e) => {
            let number = Number.parseInt(e.target.value);
            if (!number) setMaxPrice(max);
          }}
        />
      </div>
      <div className={cx('input_range')}>
        <div className={cx('slider-thumb')} style={style}></div>
        <input
          value={calcPercent(min, max, minPrice)}
          onChange={(e) => {
            handleInputMin(e);
          }}
          className={cx('slider')}
          type="range"
        />
        <input
          value={calcPercent(min, max, maxPrice)}
          onChange={(e) => {
            handleInputMax(e);
          }}
          className={cx('slider')}
          type="range"
        />
      </div>
    </div>
  );
}

export default PriceRangeSlider;
