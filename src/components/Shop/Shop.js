import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";
import useProducts from "../../hooks/useProducts";
import { addToDb, getStoredCart } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  const [cart, setCart] = useCart();
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [products, setProducts] = useState([]);
  // console.log(products);

  useEffect(() => {
    const url = `http://localhost:5000/product?page=${page}&size=${size}`;
    axios.get(url).then((data) => {
      setProducts(data.data);
    });
  }, [page, size]);

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
            <button
              className={page === number ? "selected" : ""}
              onClick={() => setPage(number)}
            >
              {number + 1}
            </button>
          ))}
          {
            <select onChange={(e) => setSize(e.target.value)}>
              <option value="5">5</option>
              <option value="10" selected>
                10
              </option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          }
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
