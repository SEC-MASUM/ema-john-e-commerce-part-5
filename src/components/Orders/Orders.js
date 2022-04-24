import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import useProducts from "../../hooks/useProducts";
import { removeFromDb } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import ReviewOrderItem from "../ReviewOrderItem/ReviewOrderItem";

const Order = () => {
  const [products, setProducts] = useProducts();
  const [cart, setCart] = useCart(products);

  const navigate = useNavigate();
  // console.log(products.length);
  const handleRemoveProduct = (product) => {
    console.log(product);
    const restProduct = cart.filter((item) => item._id !== product._id);
    setCart(restProduct);
    removeFromDb(product._id);
  };
  return (
    <div>
      <div className="shop-container">
        <div className="review-order-item-container">
          {/* <h2>This is order : {products.length}</h2>
          <p>Cart has : {cart.length}</p> */}
          {cart.map((product) => (
            <ReviewOrderItem
              key={product.key}
              product={product}
              handleRemoveProduct={handleRemoveProduct}
            ></ReviewOrderItem>
          ))}
        </div>
        <div className="order-container">
          <Cart cart={cart}>
            <button onClick={() => navigate("/inventory")}>
              Proceed Checkout
              <FontAwesomeIcon icon={faWallet}></FontAwesomeIcon>
            </button>
          </Cart>
        </div>
      </div>
    </div>
  );
};

export default Order;
