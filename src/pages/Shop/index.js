import { useCallback, useState, useReducer, useEffect } from 'react';
import classNames from 'classnames/bind';

import { fakeRams, fakeRoms, fakeServices } from '~/assets/data';
import Helmet from '~/components/Helmet';
import { ProductList, ProductCard } from '~/components/Product';
import CheckBox from '~/components/CheckBox';
import PriceRangeSlider from '~/components/PriceRangeSlider';
import Pagination from '~/components/Pagination';
import shopReducer, { initState } from '~/reducer/shopReducer';
import { add, del } from '~/reducer/actions';
import { getProductList } from '~/services/productService';
import { getCategoryList } from '~/services/categoryService';

import styles from './Shop.module.scss';

const cx = classNames.bind(styles);

function Shop() {
  console.log('re-render shop');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, dispatch] = useReducer(shopReducer, initState);
  const { categoryId, rams, roms, services, resetPrice } = filter;

  useEffect(() => {
    console.log('api product');
    const fetchApiGetProductList = async () => {
      const products = await getProductList(filter);
      setProducts(products);
    };
    fetchApiGetProductList();
  }, [filter]);

  useEffect(() => {
    console.log('api category');
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

  const handleFilterPrice = useCallback((rangePrice) => {
    dispatch({
      type: 'change_price',
      payload: rangePrice,
    });
  }, []);

  const handlePagination = (currentPage) => {};

  const handleClearFilter = () => {
    dispatch({ type: 'clear_filter' });
  };

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
                <PriceRangeSlider min={0} max={999} onChange={handleFilterPrice} reset={resetPrice} />
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
                {products?.payload?.map((e) => {
                  return <ProductCard key={e?.id} data={e} />;
                })}
              </ProductList>
            </div>
            <Pagination onChange={handlePagination} totalPages={10} />
          </div>
        </div>
      </div>
    </Helmet>
  );
}

export default Shop;
