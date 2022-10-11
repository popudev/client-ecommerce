import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import config from '~/config';
import { getOrderById } from '~/services/orderService';

import Button from '~/components/Button';
import { OrderDetails } from '~/components/Order';

import styles from '../Purchase.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Order() {
  const [order, setOrder] = useState(null);
  console.log('order: ', order);
  const { orderId } = useParams();

  useEffect(() => {
    (async () => {
      const order = await getOrderById(orderId);
      setOrder(order);
    })();
  }, [orderId]);

  const handleCancel = () => {
    (async () => {
      const order = await getOrderById(orderId);
      setOrder(order);
    })();
  };

  return (
    <div className={cx('order_wrapper')}>
      <div className={cx('actions_status')}>
        <Button
          to={config.routes.profile.purchase.href}
          leftIcon={<i className="fa-solid fa-chevron-left"></i>}
          outline
        >
          Back
        </Button>
        <div className={cx('status')}>
          <p>
            Order ID: <span>{orderId}</span>
          </p>
          <p>
            Status: <span>{config.order.status[order?.status || 0]}</span>
          </p>
        </div>
      </div>
      <OrderDetails data={order} actions onCancel={handleCancel} />
    </div>
  );
}

export default Order;
