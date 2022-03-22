import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("products.json")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);
  const handleAddToCart = (product) => {
    console.log("clicked", product);
  };
  return (
    <div className="shop-container">
      <div className="product-container">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          ></Product>
        ))}
      </div>
      <div className="order-container">
        <h3>This is order container</h3>
      </div>
    </div>
  );
};

export default Shop;

/* React এ শুধু উপর থেকে  ডাটা পাঠানো যায় props আকারে তাই cart এ ডাটা পাঠানোর জন্য eventhandler টা  shop component এ রাখতে হবে   */
