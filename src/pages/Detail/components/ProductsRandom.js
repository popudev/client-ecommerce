import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';

import { getProductsRandom } from '~/services/productService';

import { ProductList } from '~/components/Product';
import Section, { SectionBody, SectionTitle } from '~/components/Section';

import styles from '../Detail.module.scss';

const cx = classNames.bind(styles);

function ProductsRandom({ change }) {
  const [productsRandom, setProductsRandom] = useState([]);

  useEffect(() => {
    (async function () {
      const products = await getProductsRandom(20);
      setProductsRandom(products);
    })();
  }, [change]);

  return (
    <Section wrapperClassName={cx('section_product_recommemt')}>
      <SectionTitle>YOU MAY ALSO LIKE</SectionTitle>
      <SectionBody>
        <ProductList col={5} mdCol={3} smCol={2} gap={10} data={productsRandom} />
      </SectionBody>
    </Section>
  );
}

export default ProductsRandom;
