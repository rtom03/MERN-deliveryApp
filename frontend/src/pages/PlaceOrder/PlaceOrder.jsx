import React, { useEffect, useState } from "react";
import "./PlaceOrder.css";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const PlaceOrder = () => {
  const { token, foodList, cartItems, apiUrl, getTotalCartAmount } =
    useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  const placeOrder = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      foodList.map((item) => {
        if (cartItems[item._id] > 0) {
          let itemInfo = item;
          itemInfo["quantity"] = cartItems[item._id];
          orderItems.push(itemInfo);
        }
      });
      let orderData = {
        address: data,
        items: orderItems,
        amount: getTotalCartAmount() + 2,
      };
      let response = await axios.post(`${apiUrl}/api/placeOrder/`, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 201) {
        console.log(response);
        const { success_url } = response.data;
        window.location.replace(success_url);
      }
    } catch (err) {
      console.log(err);
      alert("Error");
    }
  };
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);
  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            required
          />
        </div>
        <input
          type="email"
          placeholder="email address"
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          required
        />
        <input
          type="text"
          placeholder="street"
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          required
        />
        <div className="multi-fields">
          <input
            type="text"
            placeholder="City"
            name="city"
            onChange={onChangeHandler}
            value={data.city}
          />
          <input
            type="text"
            placeholder="State"
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            required
          />
        </div>
        <div className="multi-fields">
          <input
            type="text"
            placeholder="Zip Code"
            name="zipCode"
            onChange={onChangeHandler}
            value={data.zipCode}
            required
          />
          <input
            type="text"
            placeholder="Country"
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            required
          />
        </div>
        <input
          type="text"
          placeholder="phone"
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          required
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              {/* <p>{getTotalCartAmount()}</p> */}
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>${3000}</p>
              {/* <p>{getTotalCartAmount()}</p> */}
            </div>
          </div>

          <button type="submit" na>
            PROCEED TO Payment
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
