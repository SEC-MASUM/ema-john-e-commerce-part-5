import React from "react";
import useCart from "../../hooks/useCart";
import useProducts from "../../hooks/useProducts";

const Order = () => {
  const [products, setProducts] = useProducts();
  const [cart, setCart] = useCart(products);

  console.log(products.length);
  return (
    <div>
      <h2>This is order : {products.length}</h2>
      <p>Cart has : {cart.length}</p>
    </div>
  );
};

export default Order;
