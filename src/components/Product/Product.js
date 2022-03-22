import React from "react";
import "./Product.css";

const Product = (props) => {
  //   console.log(props.product);
  const { name, img, seller, ratings, price } = props.product;
  return (
    <div className="product">
      <img src={img} alt="" />
      <p className="product-name">{name}</p>
    </div>
  );
};

export default Product;
