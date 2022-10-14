import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getProductById } from '~/services/productService';

import Helmet from '~/components/Helmet';

import Header from './components/Header';
import ProductDetail from './components/ProductDetail';
import ProductsRandom from './components/ProductsRandom';

import styles from './Detail.module.scss';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Detail() {
  const { productId } = useParams();
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const navigator = useNavigate();

  useEffect(() => {
    setLoading(true);
    (async () => {
      const product = await getProductById(productId);
      if (!product) return navigator('/notfound', { replace: true });
      setInfo(product);
      setLoading(false);
    })();
  }, [productId, navigator]);

  return (
    <Helmet title="detail">
      <div className={cx('wrapper', 'main', 'container')}>
        {loading ? (
          <>
            <Header.Loading />
            <ProductDetail.Loading />
          </>
        ) : (
          <>
            <Header info={info} />
            <ProductDetail info={info} />
          </>
        )}
        <ProductsRandom change={productId} />
      </div>
    </Helmet>
  );
}

export default Detail;
