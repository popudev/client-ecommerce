import { useEffect, useState } from 'react';

import config from '~/config';
import { getOrderList } from '~/services/orderService';

import Button from '~/components/Button';
import { OrderItem } from '~/components/Order';
import { Pagination } from '~/components/Pagination';

import styles from './Main.module.scss';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const statusOrder = [
  {
    title: 'All',
    option: 0,
  },
  {
    title: 'Pending',
    option: 1,
  },
  {
    title: 'Completed',
    option: 2,
  },
  {
    title: 'Canceled',
    option: 3,
  },
];

function Main() {
  const [statusFilter, setStatusFilter] = useState(0);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [orders, setOrders] = useState({});
  const { pagination, payload } = orders;

  console.log('re-reder purchase');

  useEffect(() => {
    (async () => {
      const res = await getOrderList(statusFilter, pageCurrent);
      if (!res) return;
      setOrders(res);
    })();
  }, [statusFilter, pageCurrent]);

  const handleFilter = (option) => {
    setStatusFilter(option);
  };

  const handlePageChange = (page) => {
    setPageCurrent(page);
  };

  const handleCancel = () => {
    (async () => {
      const res = await getOrderList(statusFilter, pageCurrent);
      if (!res) return;
      setOrders(res);
    })();
  };

  return (
    <div className={cx('main_wrapper')}>
      <div className={cx('status_orders')}>
        {statusOrder.map((item) => {
          return (
            <Button
              key={item.option}
              onClick={() => handleFilter(item.option)}
              outline
              className={cx({ active: statusFilter === item.option })}
            >
              {item.title}
            </Button>
          );
        })}
      </div>

      <div className={cx('orders')}>
        {!!payload?.length &&
          payload?.map((order) => {
            return <OrderItem data={order} key={order._id} onCancel={handleCancel} />;
          })}
        {!payload?.length && (
          <div className={cx('empty')}>
            <i className="fa-solid fa-file-invoice-dollar"></i>
            <h2>No orders yet</h2>
            <Button outline to={config.routes.shop}>
              GO TO SHOP
            </Button>
          </div>
        )}
      </div>

      <Pagination
        initialPage={pagination?.page}
        pageCount={pagination?.totalPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Main;
