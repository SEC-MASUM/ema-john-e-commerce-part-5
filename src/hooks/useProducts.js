import axios from "axios";
import { useEffect, useState } from "react";

const useProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const url = `http://localhost:5000/product`;
    axios.get(url).then((data) => {
      setProducts(data.data);
    });
  }, []);

  return [products, setProducts];
};

export default useProducts;
