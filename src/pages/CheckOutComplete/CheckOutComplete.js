import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import classNames from 'classnames/bind';

import config from '~/config';
import { getOrderById } from '~/services/orderService';
import { getProductsRandom } from '~/services/productService';

import Button from '~/components/Button';
import { OrderDetails } from '~/components/Order';
import { ProductList } from '~/components/Product';
import Section, { SectionBody, SectionTitle } from '~/components/Section';

import styles from './CheckOutComplete.module.scss';

const cx = classNames.bind(styles);

function CheckOutComplete() {
  const [order, setOrder] = useState(null);
  const { orderId } = useParams();
  const [productsRandom, setProductsRandom] = useState([]);

  useEffect(() => {
    (async () => {
      const order = await getOrderById(orderId);
      setOrder(order);
    })();
    (async function () {
      const products = await getProductsRandom(10);
      setProductsRandom(products);
    })();
  }, [orderId]);

  return (
    <div className={cx('wrapper', 'main', 'container')}>
      <div className={cx('header')}>
        <i className="fa-regular fa-circle-check"></i>
        <h1>Thank you for your order</h1>
        <p>
          Thank you so much for your order. You made our day. We hope you have a lovely day and see
          you again soon!
        </p>
        <div className={cx('actions')}>
          <Button primary to={config.routes.profile.purchase.href}>
            View My Purchase
          </Button>
          <Button primary to={config.routes.shop}>
            Continue Shopping
          </Button>
        </div>
      </div>

      <OrderDetails data={order} />

      <Section wrapperClassName={cx('section_product_recommemt')}>
        <SectionTitle>YOU MAY ALSO LIKE</SectionTitle>
        <SectionBody>
          <ProductList col={5} mdCol={3} smCol={2} gap={10} data={productsRandom} />
        </SectionBody>
      </Section>
    </div>
  );
}

export default CheckOutComplete;
