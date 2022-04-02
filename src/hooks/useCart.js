import { useEffect, useState } from "react";
import { getStoredCart } from "../utilities/fakedb";

const useCart = (products) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCartInDb = getStoredCart();
    const savedProductInCart = [];
    for (const id in storedCartInDb) {
      const addedProductInCart = products.find((product) => product.id === id);
      if (addedProductInCart) {
        const quantity = storedCartInDb[id];
        addedProductInCart.quantity = quantity;
        savedProductInCart.push(addedProductInCart);
      }
    }
    setCart(savedProductInCart);
  }, [products]);

  return [cart, setCart];
};

export default useCart;
