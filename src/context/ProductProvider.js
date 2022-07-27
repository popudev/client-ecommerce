import { createContext, useEffect, useState } from 'react';
import { getProductList, deleteProduct } from '~/services/productService';

export const ProductContext = createContext();

export default function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  console.log('ProductProvider');

  const fetchApiGetProductList = async () => {
    const products = await getProductList();
    setProducts(products);
  };

  useEffect(() => {
    fetchApiGetProductList();
  }, []);

  const fetchApiDeleteProduct = async (id) => {
    await deleteProduct(id);
    fetchApiGetProductList();
  };

  return <ProductContext.Provider value={{ products, fetchApiDeleteProduct }}>{children}</ProductContext.Provider>;
}
