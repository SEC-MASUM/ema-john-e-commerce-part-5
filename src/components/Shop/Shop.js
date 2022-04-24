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
  const [pageCount, setPageCount] = useState(0);
  // console.log(products);

  useEffect(() => {
    const url = `http://localhost:5000/productCount`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const count = data.count;
        const pages = Math.ceil(count / 10);
        setPageCount(pages);
      });
  }, []);

  useEffect(() => {
    const storedCart = getStoredCart();
    console.log(storedCart);
    const savedCart = [];
    for (const id in storedCart) {
      const addedProduct = products.find((product) => product._id === id);

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
    const isExists = cart.find(
      (product) => product._id === selectedProduct._id
    );
    if (isExists) {
      const restProduct = cart.filter(
        (product) => product._id !== selectedProduct._id
      );
      selectedProduct.quantity = selectedProduct.quantity + 1;
      newCart = [...restProduct, selectedProduct];
    } else {
      selectedProduct.quantity = 1;
      newCart = [...cart, selectedProduct];
    }

    setCart(newCart);
    addToDb(selectedProduct._id);
  };

  return (
    <div className="shop-container">
      <div className="product-container">
        {products.map((product) => (
          <Product
            key={product._id}
            product={product}
            handleAddToCart={handleAddToCart}
          ></Product>
        ))}
        <div className="pagination">
          {[...Array(pageCount).keys()].map((number) => (
            <button>{number + 1}</button>
          ))}
        </div>
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
