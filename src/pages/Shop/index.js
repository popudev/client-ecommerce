import classNames from 'classnames/bind';
import Helmet from '~/components/Helmet';
import { ProductList, ProductCard } from '~/components/Product';
import styles from './Shop.module.scss';
import { fakeProducts, fakeCategories } from '~/assets/data';
import CheckBox from '~/components/CheckBox';
import { useCallback, useReducer } from 'react';
import PriceRangeSlider from '~/components/PriceRangeSlider';

const cx = classNames.bind(styles);

const initState = {
  filter: [],
  categories: [],
  price: [0, 9999],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'add_filter':
      return {
        ...state,
        filter: [...state.filter, action.payload],
      };
    case 'delete_filter':
      return {
        ...state,
        filter: state.filter.filter((e) => e !== action.payload),
      };

    case 'change_price':
      return {
        ...state,
        price: action.payload,
      };
    default:
      return state;
  }
};

function Shop() {
  console.log('re - render shop');

  const [state, dispatch] = useReducer(reducer, initState);
  const { filter } = state;

  const handleFilter = (input) => {
    if (input.checked) {
      dispatch({
        type: 'add_filter',
        payload: input.value,
      });
    } else {
      dispatch({
        type: 'delete_filter',
        payload: input.value,
      });
    }
  };

  const handleFilterPrice = useCallback((rangePrice) => {
    dispatch({
      type: 'change_price',
      payload: rangePrice,
    });
  }, []);

  return (
    <Helmet title={'Shop'}>
      <div className={cx('wrapper', 'main', 'container')}>
        <div className={cx('banner')}></div>
        <div className={cx('content')}>
          <div className={cx('filter')}>
            <div className={cx('wedget')}>
              <div className={cx('wedget__title')}>
                <h3>Category</h3>
              </div>
              <div className={cx('wedget__content')}>
                {fakeCategories.map((item) => {
                  return (
                    <CheckBox
                      key={item.title}
                      title={item.title}
                      onChange={(input) => {
                        handleFilter(input);
                      }}
                      checked={filter.includes(item.title)}
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
                <PriceRangeSlider min={0} max={999} onChange={handleFilterPrice} />
              </div>
            </div>
            <div className={cx('wedget')}>
              <div className={cx('wedget__title')}>
                <h3>RAM</h3>
              </div>
              <div className={cx('wedget__content')}>
                {fakeCategories.map((item) => {
                  return (
                    <CheckBox
                      key={item.title}
                      title={item.title}
                      onChange={(input) => {
                        handleFilter(input);
                      }}
                      checked={filter.includes(item.title)}
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
                {fakeCategories.map((item) => {
                  return (
                    <CheckBox
                      key={item.title}
                      title={item.title}
                      onChange={(input) => {
                        handleFilter(input);
                      }}
                      checked={filter.includes(item.title)}
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
                {fakeCategories.map((item) => {
                  return (
                    <CheckBox
                      key={item.title}
                      title={item.title}
                      onChange={(input) => {
                        handleFilter(input);
                      }}
                      checked={filter.includes(item.title)}
                    />
                  );
                })}
              </div>
            </div>

            <button className={cx('btn-clear-filter')}>Clear Filter</button>
          </div>
          <div className={cx('context')}>
            <div className={cx('filter__sort')}>
              <div className={cx('sort-content')}>
                <span>Sort by:</span>
                <button className={cx('', 'sort_latest')}>latest</button>
                <button className={cx('', 'sort_sales')}>top sales</button>
                <select defaultValue="">
                  <option disabled value="">
                    Price
                  </option>
                  <option>Price: Low to Hight</option>
                  <option>Price: Hight to Low</option>
                </select>
                <select defaultValue="">
                  <option disabled value="">
                    Name
                  </option>
                  <option>Price: Low to Hight</option>
                  <option>Price: Hight to Low</option>
                </select>
              </div>

              <div className={cx('pagination-mini')}>
                <span>1/23</span>
                <div className={cx('control-mini')}>
                  <button>{'<'}</button>
                  <button>{'>'}</button>
                </div>
              </div>
            </div>
            <div className={cx('products')}>
              <ProductList col={4} mdCol={3} smCol={2} gap={20}>
                {fakeProducts.map((e, i) => {
                  return <ProductCard key={i} data={e} />;
                })}
              </ProductList>
            </div>
            <div className={cx('pagination')}></div>
          </div>
        </div>
      </div>
    </Helmet>
  );
}

export default Shop;
