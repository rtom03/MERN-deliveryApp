import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/listitem`);
    if (response) {
      setList(response.data.data);
    } else {
      toast.error("an error occured while fetching data");
    }
  };

  const removeItem = async (foodId) => {
    const response = await axios.post(`${url}/api/removeitem`, { id: foodId });
    await fetchList();
    if (response) {
      toast.success("Item removed successfully");
    } else {
      toast.error("an error occured while removing item");
    }
    // console.log(foodId);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All food List</p>
      <div className="list-table-format title">
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b>Action</b>
      </div>
      {list.map((item, index) => {
        return (
          <div key={index} className="list-table-format tit;e">
            <img src={`${url}/images/` + item.image} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>₦{item.price}</p>
            <p className="cursor" onClick={() => removeItem(item._id)}>
              X
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default List;
