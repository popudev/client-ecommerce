import classNames from 'classnames/bind';
import Helmet from '~/components/Helmet';
import styles from './Admin.module.scss';
import { Form, FormInput } from '~/components/Form';
import Button from '~/components/Button';
import { addProduct } from '~/services/productService';
import { useState } from 'react';
const cx = classNames.bind(styles);

function Admin() {
  const initialValues = {
    title: '',
    price: '',
    sale: '',
  };

  const handleSubmit = (product) => {
    console.log(product);
    addProduct(product);
  };

  const [file, setFile] = useState(null);
  const abcxyz = (e) => {
    e.preventDefault();
    const image = URL.createObjectURL(file);
    addProduct(image);
  };

  return (
    <Helmet title="Admin">
      <div className={cx('wrapper')}>
        <form onSubmit={abcxyz}>
          <input
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
            type="file"
            name="file"
          />
          <button>Submit</button>
        </form>
        <Form className={cx('form')} initialValues={initialValues} validateSchema={{}} onSubmit={handleSubmit}>
          <FormInput type="text" name="title" label="Title" />
          <FormInput type="number" name="price" label="Price" />
          <FormInput type="number" name="sale" label="Sale" />
          <Button primary className={cx('btn')}>
            Add Product
          </Button>
        </Form>
      </div>
    </Helmet>
  );
}

export default Admin;
