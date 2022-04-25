import { useEffect, useState } from "react";
import { getStoredCart } from "../utilities/fakedb";

const useCart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCartInDb = getStoredCart();
    const savedProductInCart = [];
    const keys = Object.keys(storedCartInDb);
    console.log(keys);
    fetch("http://localhost:5000/productByKeys", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(keys),
    })
      .then((res) => res.json())
      .then((products) => {
        console.log(products);
        for (const id in storedCartInDb) {
          const addedProductInCart = products.find(
            (product) => product._id === id
          );
          if (addedProductInCart) {
            const quantity = storedCartInDb[id];
            addedProductInCart.quantity = quantity;
            savedProductInCart.push(addedProductInCart);
          }
        }
        setCart(savedProductInCart);
      });
  }, []);

  return [cart, setCart];
};

export default useCart;
