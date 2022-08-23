import classNames from 'classnames/bind';
import Button from '../Button';
import styles from './CategoryCard.module.scss';

const cx = classNames.bind(styles);

function CategoryCard({ data }) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('image')}>
        <img src={data.image} alt="" />
      </div>
      <div className={cx('context')}>
        <div className={cx('title')}>{data.title}</div>
        <Button outline large className={cx('btn-shop-now')}>
          SHOP NOW
        </Button>
      </div>
    </div>
  );
}

export default CategoryCard;
