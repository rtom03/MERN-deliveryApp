import React, { useContext, useEffect } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, getCart, removeFromCart, foodList, apiUrl } =
    useContext(StoreContext);
  useEffect(() => {
    getCart(localStorage.getItem("token"));
  }, []);
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {foodList.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div>
                <div className="cart-items-title cart-items-item" id={index}>
                  <img src={`${apiUrl}/images/` + item.image} alt="" />
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>{item.price * cartItems[item._id]}</p>
                  <p
                    className="remove"
                    onClick={() => removeFromCart(item._id)}
                  >
                    X
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{80}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>{3000}</p>
            </div>
          </div>
          <Link to={"/order"}>
            <button>PROCEED TO CHECKOUT</button>
          </Link>
        </div>
        <div className="cart-promocode">
          <p>if you have a promo code, enter it here</p>
          <div className="cart-promocode-input">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
