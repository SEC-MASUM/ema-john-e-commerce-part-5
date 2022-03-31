import React from "react";
import useProducts from "../../hooks/useProducts";

const Order = () => {
  const [products, setProducts] = useProducts();
  console.log(products.length);
  return (
    <div>
      <h2>This is order : {products.length}</h2>
    </div>
  );
};

export default Order;
