import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import { addToDb, getStoredCart } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useProducts();
  const [cart, setCart] = useState([]);
  // console.log(products);

  useEffect(() => {
    const storedCart = getStoredCart();
    console.log(storedCart);
    const savedCart = [];
    for (const id in storedCart) {
      const addedProduct = products.find((product) => product.id === id);

      if (addedProduct) {
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;
        savedCart.push(addedProduct);
      }
    }
    setCart(savedCart);
  }, [products]);

  const handleAddToCart = (selectedProduct) => {
    // console.log("clicked", product);
    //do not do this: cart.push(product)
    let newCart = [];
    const isExists = cart.find((product) => product.id === selectedProduct.id);
    if (isExists) {
      const restProduct = cart.filter(
        (product) => product.id !== selectedProduct.id
      );
      selectedProduct.quantity = selectedProduct.quantity + 1;
      newCart = [...restProduct, selectedProduct];
    } else {
      selectedProduct.quantity = 1;
      newCart = [...cart, selectedProduct];
    }

    setCart(newCart);
    addToDb(selectedProduct.id);
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
        <Cart cart={cart}>
          <Link to={`/orders`}>
            <button>Review Orders</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;

/* React এ শুধু উপর থেকে  ডাটা পাঠানো যায় props আকারে তাই cart এ ডাটা পাঠানোর জন্য eventhandler টা  shop component এ রাখতে হবে   */
