import React, { useState } from "react";
import "./Add.css";
import upload_area from "../../assets/upload_area.png";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    const response = await axios.post(`${url}api/additem`, formData);
    if (response) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad",
      });
      setImage(false);
      toast.success("Item Successfully added");
    } else {
      toast.error("an error occured while adding item");
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : upload_area}
              alt=""
            />
          </label>
          <input
            type="file"
            id="image"
            hidden="required"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            type="text"
            name="name"
            placeholder="product name"
            onChange={onChangeHandler}
            value={data.name}
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            name="description"
            rows="6"
            placeholder="product description"
            onChange={onChangeHandler}
            value={data.description}
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex col">
            <p>Product category</p>
            <select name="category" onChange={onChangeHandler}>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>product price</p>
            <input
              type="number"
              name="price"
              placeholder="₦10,000"
              onChange={onChangeHandler}
              value={data.price}
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          Add Item
        </button>
      </form>
    </div>
  );
};

export default Add;
