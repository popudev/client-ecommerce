import classNames from 'classnames/bind';
import Helmet from '~/components/Helmet';
import styles from './AdminProduct.module.scss';
import { Form, FormInput } from '~/components/Form';
import Button from '~/components/Button';
import { addProduct } from '~/services/productService';
import { useState } from 'react';
const cx = classNames.bind(styles);

function AdminProduct() {
  return (
    <Helmet title="Admin">
      <div className={cx('wrapper')}></div>
    </Helmet>
  );
}

export default AdminProduct;
