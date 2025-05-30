// ProductsData.js
import { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';

const ProductsContext = createContext();

export const ProductsDataProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        const uniqueProducts = response.data.filter(
          (product, index, self) =>
            index === self.findIndex((p) => p.id === product.id)
        );
        setProducts(uniqueProducts);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Error al cargar los productos");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Función para obtener N productos aleatorios
  const getRandomProducts = (count) => {
    if (!products || products.length === 0) {
      return [];
    }
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  return (
    <ProductsContext.Provider value={{ products, loading, error, getRandomProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  return useContext(ProductsContext);
};