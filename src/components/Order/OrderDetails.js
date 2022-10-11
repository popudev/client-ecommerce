import { useNavigate } from 'react-router-dom';

import config, { formatMoney } from '~/config';
import useCheckOutState from '~/hooks/useCheckOutState';
import { updateTotalPriceDiscountProducts } from '~/reducers/actions/checkOutAction';
import { updateOrderStatus } from '~/services/orderService';

import Button from '../Button';
import { notification } from '../Modal/Notification/core';
import ProductItemCheckOut from '../ProductItemCheckOut';
import styles from './OrderDetails.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function OrderDetails({ data, actions = false, onCancel = () => {} }) {
  const { dispatch } = useCheckOutState();
  const navigator = useNavigate();
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
    dispatch(updateTotalPriceDiscountProducts(data.totalPrice, 0, data.products));
    navigator(config.routes.checkout.address.href);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
        <div className={cx('title')}>
          <h2>Order Summary</h2>
          <p>{config.order.status[data?.status || 0]}</p>
        </div>
        <h3>Delivery Address</h3>
        <div className={cx('address_item')}>
          <div className={cx('info')}>
            <h4>{data?.address?.fullname}</h4>
            <p>{data?.address?.phone}</p>
            <p>{data?.address?.address}</p>
          </div>
        </div>
        <h3>Products</h3>
        <div className={cx('products')}>
          {data?.products?.map((item) => {
            return <ProductItemCheckOut border key={item._id} data={item} />;
          })}
        </div>

        <h3>Shipping Option</h3>
        <div className={cx('shippping')}>
          <h4>{data?.shipping?.title}</h4>
          <p>
            <span>Charge: </span>
            <span>{formatMoney(data?.shipping?.charge)}</span>
          </p>
          <p>{data?.shipping?.desc}</p>
        </div>

        <h3>Payment Method</h3>
        <div className={cx('payment')}>
          <h4>{data?.payment?.type}</h4>
        </div>

        <h3>Time Order</h3>
        <div className={cx('time')}>
          <h4>{new Date(data?.createdAt).toLocaleString()}</h4>
        </div>

        <div className={cx('checkout_total')}>
          <div className={cx('info')}>
            <h4>Total Price:</h4>
            <p>{formatMoney(data?.totalPrice)}</p>
          </div>
          <div className={cx('info')}>
            <h4>Discount:</h4>
            <p>{formatMoney(data?.discount)}</p>
          </div>

          <div className={cx('info')}>
            <h4>Shipping:</h4>
            <p>{formatMoney(data?.shipping.charge)}</p>
          </div>

          <div className={cx('info', 'total')}>
            <h4>Total:</h4>
            <p>{formatMoney(data?.total)}</p>
          </div>
        </div>
      </div>
      {actions && (
        <div className={cx('actions')}>
          {data?.status !== 1 && (
            <Button primary large onClick={handleOrderAgain}>
              Order Again
            </Button>
          )}
          <Button primary large>
            Contact
          </Button>
          {data?.status === 1 && (
            <Button outline large onClick={handleCancel}>
              Cancel
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default OrderDetails;
