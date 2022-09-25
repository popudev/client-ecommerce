import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import { PropTypes } from 'prop-types';

import styles from './Slider.module.scss';

const cx = classNames.bind(styles);

function Slider(props) {
  const { data, auto, timeOut = 3000, shadow, isLink, mainColor } = props;

  const [activeSlide, setActiveSlide] = useState(0);

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

  const renderImage = () => {
    return data.map((e, i) => {
      return isLink ? (
        <div key={i} className={cx('item', { active: i === activeSlide })}>
          <Link to={isLink}>
            <div className={cx('item-image')}>
              <img src={e.image} alt="slide" />
            </div>
          </Link>
        </div>
      ) : (
        <div key={i} className={cx('item', { active: i === activeSlide })}>
          <div className={cx('item-image')}>
            <img src={e.image} alt="slide" />
          </div>
        </div>
      );
    });
  };

  return (
    <div className={cx('wrapper', { shadow, mainColor })}>
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

      <div className={cx('items')}>{renderImage()}</div>

      <button className={cx('control-prev')} onClick={prevSlide}>
        <i className="fa-solid fa-angle-left"></i>
      </button>
      <button className={cx('control-next')} onClick={nextSlide}>
        <i className="fa-solid fa-angle-right"></i>
      </button>
    </div>
  );
}

Slider.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Slider;
