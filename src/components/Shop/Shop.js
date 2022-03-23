import React, { useEffect, useState } from "react";
import { addToDb, getStoredCart } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    console.log("Product Loads before fetch");
    fetch("products.json")
      .then((response) => response.json())
      .then((data) => setProducts(data));
    console.log("Product Loaded");
  }, []);

  useEffect(() => {
    console.log("Local Storage First Line", products);
    const storedCart = getStoredCart();
    const savedCart = [];
    // console.log(storedCart);
    for (const id in storedCart) {
      const addedProduct = products.find((product) => product.id === id);
      if (addedProduct) {
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;
        savedCart.push(addedProduct);
        console.log(addedProduct);
      }
    }
    setCart(savedCart);
    console.log("Local Storage Finished");
  }, [products]);

  const handleAddToCart = (product) => {
    // console.log("clicked", product);
    //do not do this: cart.push(product)
    const newCart = [...cart, product];
    setCart(newCart);
    addToDb(product.id);
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
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;

/* React এ শুধু উপর থেকে  ডাটা পাঠানো যায় props আকারে তাই cart এ ডাটা পাঠানোর জন্য eventhandler টা  shop component এ রাখতে হবে   */
