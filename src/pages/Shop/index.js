import { useCallback, useEffect, useRef, useState } from 'react';

import classNames from 'classnames/bind';

import { banner } from '~/assets/images';
import { useFilterState } from '~/hooks';
import { getProductList } from '~/services/productService';

import Banner from '~/components/Banner';
import { Filter, FilterSort } from '~/components/FilterShop';
import Helmet from '~/components/Helmet';
import { Pagination, PaginationMini } from '~/components/Pagination';
import { ProductList } from '~/components/Product';

import styles from './Shop.module.scss';

const cx = classNames.bind(styles);

function Shop() {
  console.log('re-render shop');
  const [filterState, dispatch] = useFilterState();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { pagination, payload } = products;

  const nextPage = useRef(null);
  const prevPage = useRef(null);
  const onToggle = useRef(null);
  const onToggleSort = useRef(null);

  useEffect(() => {
    setLoading(true);
    const fetchApiGetProductList = async () => {
      const products = await getProductList(filterState);
      setProducts(products);
      setLoading(false);
    };

    fetchApiGetProductList();
  }, [filterState]);

  const handlePageChange = useCallback(
    (currentPage) => {
      dispatch({
        type: 'change_page',
        payload: currentPage,
      });
    },
    [dispatch],
  );

  const clearTitle = () => {
    dispatch({
      type: 'clear_title',
    });
  };

  const handleActiveFilter = () => {
    onToggle.current();
  };

  const handleActiveFilterSort = () => {
    onToggleSort.current();
  };

  return (
    <Helmet title={'Shop'}>
      <div className={cx('wrapper', 'main', 'container')}>
        <Banner image={banner} />
        <div className={cx('content')}>
          <Filter filterState={filterState} dispatch={dispatch} onToggle={onToggle} />
          <div className={cx('context')}>
            {filterState.title && (
              <div className={cx('search_result_title')}>
                <i className="fa-regular fa-lightbulb"></i>
                <p>Search result for "{filterState.title}"</p>
                <button className={cx('btn_clear_title', 'btn')} onClick={clearTitle}>
                  <i className="fa-regular fa-circle-xmark"></i>
                </button>
              </div>
            )}
            <div className={cx('filter__sort')}>
              <div className={cx('filter_btn')}>
                <button className={cx('btn_active_filter')} onClick={handleActiveFilter}>
                  <i className="fa-solid fa-sliders"></i>
                </button>
                <button className={cx('btn_active_filterSort')} onClick={handleActiveFilterSort}>
                  <i className="fa-solid fa-arrow-up-wide-short"></i>
                </button>
              </div>
              <FilterSort filterState={filterState} dispatch={dispatch} onToggle={onToggleSort} />
              {loading && <PaginationMini.Loading />}
              {!loading && (
                <PaginationMini
                  page={pagination?.page}
                  pageCount={pagination?.totalPage}
                  nextPage={nextPage}
                  prevPage={prevPage}
                />
              )}
            </div>
            <div className={cx('products')}>
              <ProductList col={4} mdCol={3} smCol={2} gap={10} smGap={10} data={payload} loading={loading} />
            </div>
            <Pagination
              initialPage={pagination?.page}
              pageCount={pagination?.totalPage}
              onPageChange={handlePageChange}
              nextPage={nextPage}
              prevPage={prevPage}
            />
          </div>
        </div>
      </div>
    </Helmet>
  );
}

export default Shop;
