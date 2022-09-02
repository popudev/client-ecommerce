import classNames from 'classnames/bind';
import Helmet from '~/components/Helmet';
import styles from './Admin.module.scss';
import { Form, FormInput } from '~/components/Form';
import Button from '~/components/Button';
import { addProduct } from '~/services/productService';
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

  return (
    <Helmet title="Admin">
      <div className={cx('wrapper')}>
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
