// import React, { useEffect, useState } from "react";
import "./Orders.css";
// import axios from "axios";
// import toast from "react-toastify";
import parcel from "../../assets/parcel_icon.png";

const Orders = ({ url }) => {
  // const [orders, setOrders] = useState([]);

  // const fetchAllOrder = async () => {
  //   const response = await axios.get(`${url}/api/listOrders/`);
  //   if (response) {
  //     setOrders(response.data.data);
  //   } else {
  //     toast.error(response.data.error);
  //   }
  // };

  // useEffect(() => {
  //   fetchAllOrder();
  // }, []);

  return (
    <div className="order add">
      {/* <h2>Order Page</h2>
      <div className="order-list">
        {orders.map((order, index) => {
          <div key={index} className="order-item">
            <img src={parcel} alt="" />
          </div>;
        })}
      </div> */}
    </div>
  );
};

export default Orders;
