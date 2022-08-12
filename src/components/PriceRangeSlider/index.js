import { useState, useCallback } from 'react';

import classNames from 'classnames/bind';
import styles from './PriceRangeSlider.module.scss';
import { useDebounce, useDidMountEffect } from '~/hooks';

const cx = classNames.bind(styles);

function PriceRangeSlider({ min, max, reset, onPriceChange }) {
  const [minPrice, setMinPrice] = useState(min);
  const [maxPrice, setMaxPrice] = useState(max);

  const debouncedValueMin = useDebounce(minPrice, 500);
  const debouncedValueMax = useDebounce(maxPrice, 500);

  const calcPercent = useCallback(
    (value, rev = false) => {
      const deviant = max - min;
      if (!rev) {
        return Math.round(((value - min) * 100) / deviant);
      }
      return Math.round(min + (deviant * value) / 100);
    },
    [min, max],
  );

  const scrollTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  const style = {
    left: calcPercent(minPrice) + '%',
    width: calcPercent(maxPrice) - calcPercent(minPrice) + '%',
  };

  const handleInputMin = (e) => {
    const value = calcPercent(e.target.value, true);
    if (calcPercent(maxPrice) - e.target.value < 10) return;
    setMinPrice(value);
  };

  const handleInputMax = (e) => {
    const value = calcPercent(e.target.value, true);
    if (e.target.value - calcPercent(minPrice) < 10) return;
    setMaxPrice(value);
  };

  useDidMountEffect(() => {
    onPriceChange([debouncedValueMin, debouncedValueMax]);
  }, [debouncedValueMax, debouncedValueMin, onPriceChange]);

  useDidMountEffect(() => {
    setMinPrice(min);
    setMaxPrice(max);
  }, [reset]);

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
        <input value={calcPercent(minPrice)} type="range" className={cx('slider')} onChange={handleInputMin} />
        <input value={calcPercent(maxPrice)} type="range" className={cx('slider')} onChange={handleInputMax} />
      </div>
    </div>
  );
}

export default PriceRangeSlider;
