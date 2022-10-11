import classNames from 'classnames/bind';

import Button from '~/components/Button';

import styles from './Address.module.scss';

const cx = classNames.bind(styles);

function AddressItem({
  data,
  choose = false,
  change = false,
  active = true,
  openModal = () => {},
  onChoose = () => {},
}) {
  const handleChangeAddress = () => {
    openModal();
  };

  const handleChoose = () => {
    onChoose(data);
  };

  return (
    <div className={cx('address_item', { active })}>
      <div className={cx('info')}>
        <h3>{data?.fullname}</h3>
        <p>{data?.phone}</p>
        <p>{data?.address}</p>
      </div>
      {change && (
        <Button primary onClick={handleChangeAddress}>
          Change
        </Button>
      )}

      {choose && (
        <Button primary onClick={handleChoose}>
          Choose
        </Button>
      )}
    </div>
  );
}

export default AddressItem;
