import { useNavigate } from 'react-router-dom';

import config, { formatMoney } from '~/config';
import useCheckOutState from '~/hooks/useCheckOutState';
import { updateTotalPriceDiscountProducts } from '~/reducers/actions/checkOutAction';
import { updateOrderStatus } from '~/services/orderService';

import Button from '../Button';
import { notification } from '../Notification/core';
import ProductItemCheckOut from '../ProductItemCheckOut';

import styles from './OrderItem.module.scss';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function OrderItem({ data, onCancel = () => {} }) {
  const { checkOutDispatch } = useCheckOutState();
  const navigator = useNavigate();

  const handleViewDetails = (orderId) => {
    navigator(config.routes.profile.purchase.order.href + '/' + orderId);
  };

  const handleCancel = async () => {
    const result = await notification.setTitle(
      'Want to cancel this order?',
      notification.type.warning,
    );

    if (result === notification.yes) {
      const res = await updateOrderStatus(data._id, 3);
      if (res) onCancel();
    }
  };

  const handleOrderAgain = () => {
    checkOutDispatch(updateTotalPriceDiscountProducts(data.totalPrice, 0, data.products));
    navigator(config.routes.checkout.address.href);
  };

  return (
    <div className={cx('item')}>
      <div className={cx('status')}>
        Status: <span>{data?.status?.title}</span>
      </div>
      <div className={cx('products')}>
        {data?.products?.map((product, index) => {
          return <ProductItemCheckOut key={product?._id + index} border data={product} />;
        })}
      </div>

      <div className={cx('total')}>
        <h4>Total: </h4>
        <p>{formatMoney(data?.total)}</p>
      </div>

      <div className={cx('actions_time')}>
        <div className={cx('time')}>
          <p>Time Order:</p> <span>{new Date(data?.createdAt).toLocaleString()}</span>
        </div>
        <div className={cx('actions')}>
          {data?.status?.code !== config.order.status.pending && (
            <Button primary onClick={handleOrderAgain}>
              Order Again
            </Button>
          )}
          <Button primary onClick={() => handleViewDetails(data?._id)}>
            View Details
          </Button>
          {data?.status?.code === config.order.status.pending && (
            <Button outline onClick={handleCancel}>
              Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderItem;
