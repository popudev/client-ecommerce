import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';

import Helmet from '~/components/Helmet';
import { ProductList, ProductCard } from '~/components/Product';
import { Filter, FilterSort } from '~/components/FilterShop';
import { Pagination, PaginationMini } from '~/components/Pagination';

import { getProductList } from '~/services/productService';

import styles from './Shop.module.scss';
import { useFilterState } from '~/hooks';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

const cx = classNames.bind(styles);

function Shop() {
  console.log('re-render shop');
  const { search } = useLocation();
  const { title } = queryString.parse(search);

  const [filterState, dispatch] = useFilterState();
  const [products, setProducts] = useState([]);
  const { pagination, payload } = products;

  const nextPage = useRef(null);
  const prevPage = useRef(null);

  useEffect(() => {
    console.log('api product');
    const fetchApiGetProductList = async () => {
      const products = await getProductList({ ...filterState, title: title });
      setProducts(products);
    };
    fetchApiGetProductList();
  }, [filterState, title]);

  const handlePageChange = (currentPage) => {
    dispatch({
      type: 'change_page',
      payload: currentPage,
    });
  };

  return (
    <Helmet title={'Shop'}>
      <div className={cx('wrapper', 'main', 'container')}>
        <div className={cx('banner')}></div>
        <div className={cx('content')}>
          <Filter />
          <div className={cx('context')}>
            <div className={cx('filter__sort')}>
              <FilterSort />
              <PaginationMini
                page={pagination?._page}
                pageCount={pagination?._totalPages}
                nextPage={nextPage.current}
                prevPage={prevPage.current}
              />
            </div>
            <div className={cx('products')}>
              <ProductList col={4} mdCol={3} smCol={2} gap={20}>
                {payload?.map((e) => {
                  return <ProductCard key={e?.id} data={e} />;
                })}
              </ProductList>
            </div>
            <Pagination
              initialPage={pagination?._page}
              pageCount={pagination?._totalPages}
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
