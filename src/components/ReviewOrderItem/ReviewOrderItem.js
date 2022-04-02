import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./ReviewOrderItem.css";
const ReviewOrderItem = ({ product, handleRemoveProduct }) => {
  const { name, img, shipping, price, quantity } = product;
  return (
    <div className="review-order-item">
      <div>
        <img src={img} alt="" />
      </div>
      <div className="review-item-details-container">
        <div className="review-item-details">
          <p className="product-name" title={name}>
            {name.length > 20 ? name.slice(0, 20) + "..." : name}
          </p>
          <p>
            Price: $<span className="orange-color">{price}</span>
          </p>
          <p>
            <small>
              Shipping: $<span className="orange-color">{shipping}</span>
            </small>
          </p>
          <p>
            <small>
              Quantity: $<span className="orange-color">{quantity}</span>
            </small>
          </p>
        </div>
        <div className="delete-container">
          <button
            onClick={() => handleRemoveProduct(product)}
            className="delete-button"
          >
            <FontAwesomeIcon
              className="delete-icon"
              icon={faTrashAlt}
            ></FontAwesomeIcon>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewOrderItem;
