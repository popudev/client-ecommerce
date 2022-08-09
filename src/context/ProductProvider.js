import { createContext, useEffect, useState } from 'react';
import { getProductList } from '~/services/productService';

export const ProductContext = createContext();

export default function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);

  const fetchApiGetProductList = async () => {
    const products = await getProductList();
    setProducts(products);
  };

  useEffect(() => {
    fetchApiGetProductList();
  }, []);

  return <ProductContext.Provider value={{ products }}>{children}</ProductContext.Provider>;
}
