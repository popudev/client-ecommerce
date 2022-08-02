import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Slider.module.scss';

const cx = classNames.bind(styles);

function Slider({ data, auto, timeOut }) {
  const [activeSlide, setActiveSlide] = useState(0);
  console.log('re-render');

  const nextSlide = useCallback(() => {
    const index = activeSlide + 1 === data.length ? 0 : activeSlide + 1;
    setActiveSlide(index);
  }, [activeSlide, data]);

  const prevSlide = () => {
    const index = activeSlide - 1 < 0 ? data.length - 1 : activeSlide - 1;
    setActiveSlide(index);
  };

  useEffect(() => {
    if (auto) {
      const slideAuto = setInterval(() => {
        nextSlide();
      }, timeOut);

      return () => {
        clearInterval(slideAuto);
      };
    }
  }, [nextSlide, timeOut, auto]);

  return (
    <div className={cx('wrapper', 'container')}>
      <div className={cx('indicators')}>
        {data.map((e, i) => {
          return (
            <button
              key={i}
              className={cx('indicator', { active: i === activeSlide })}
              onClick={() => {
                setActiveSlide(i);
              }}
            ></button>
          );
        })}
      </div>

      <div className={cx('items')}>
        {data.map((e, i) => {
          return (
            <div key={i} className={cx('item', { active: i === activeSlide })}>
              <Link to="/shop">
                <div className={cx('item-image')}>
                  <img src={e.image} alt="slide" />
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      <button className={cx('control-prev')} onClick={prevSlide}>
        <i class="fa-solid fa-angle-left"></i>
      </button>
      <button className={cx('control-next')} onClick={nextSlide}>
        <i class="fa-solid fa-angle-right"></i>
      </button>
    </div>
  );
}

Slider.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Slider;
