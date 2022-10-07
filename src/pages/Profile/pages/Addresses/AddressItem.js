import classNames from 'classnames/bind';

import { deleteAddress, updateAddressDefault } from '~/services/addressService';

import Button from '~/components/Button';

import styles from './Addresses.module.scss';

const cx = classNames.bind(styles);

function AddressItem({ data, onEdit, onDefaultOrDelete }) {
  const handleEdit = () => {
    onEdit(data);
  };

  const handleDefault = async () => {
    const res = await updateAddressDefault({ _id: data._id });
    onDefaultOrDelete(res);
  };

  const handleDelete = async () => {
    const res = await deleteAddress(data._id);
    onDefaultOrDelete(res);
  };

  return (
    <div className={cx('address_item')}>
      <div className={cx('address_item__info')}>
        <div className={cx('info_fullname')}>{data.fullname}</div>
        <div className={cx('info_phone')}>{data.phone}</div>
        <div className={cx('info_address')}>{data.address}</div>
        {data.defaultAddress && (
          <Button small disabled outline>
            Default
          </Button>
        )}
      </div>
      <div className={cx('address_item__actions')}>
        <div className={cx('action_urd')}>
          <Button fill text onClick={handleEdit}>
            Edit
          </Button>

          {!data.defaultAddress && (
            <Button fill text onClick={handleDelete}>
              Delete
            </Button>
          )}
        </div>
        <Button outline disabled={data.defaultAddress} onClick={handleDefault}>
          Set Default Address
        </Button>
      </div>
    </div>
  );
}

export default AddressItem;
