import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [token, setToken] = useState("");
  const [foodList, setFoodList] = useState([]);
  let totalAmount;
  const apiUrl = "http://localhost:5000";
  const navigate = useNavigate();

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        `${apiUrl}/api/addToCart/`,
        { itemId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        `${apiUrl}/api/removeFromCart/`,
        { itemId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    }
  };

  const getCart = async (token) => {
    // console.log(token, "token");
    const response = await axios.get(`${apiUrl}/api/getCart/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 201) {
      setCartItems(response.data.cartData);
      // console.log(response.data.cartData);
    }
  };

  const getTotalCartAmount = (item) => {
    if (cartItems[item] > 0) {
      let itemInfo = foodList.find((product) => product._id === item);
      totalAmount += itemInfo.price * cartItems[item];
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(`${apiUrl}/api/listItem`);
    setFoodList(response.data.data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();

      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await getCart(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  useEffect(() => {}, [cartItems]);
  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    token,
    setToken,
    apiUrl,
    logout,
    foodList,
    setFoodList,
    fetchFoodList,
    getTotalCartAmount,
    getCart,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
