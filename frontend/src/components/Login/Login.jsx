import React, { useContext, useState } from "react";
import "./Login.css";
import { assets } from "../../assets/assets";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";

const Login = ({ setShowLogin }) => {
  const { apiUrl } = useContext(StoreContext);
  const { setToken } = useContext(StoreContext);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        currState === "Login"
          ? `${apiUrl}/api/login/`
          : `${apiUrl}/api/register`,
        data
      );
      if (response.status === 201) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
        toast.success("Login SUccessfully");
        console.log(response);
      } else {
        toast.error("an error occured while logging in");
      }
    } catch (err) {
      console.log(err);
      toast.error("an error occured while logging in");
    }
  };

  const [currState, setCurrState] = useState("Login");
  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={handleLogin}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            src={assets.cross_icon}
            alt=""
            onClick={() => setShowLogin(false)}
          />
        </div>
        <div className="login-popup-input">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              type="text"
              name="name"
              placeholder="name"
              required
              onChange={onChangeHandler}
              value={data.name}
            />
          )}
          <input
            type="email"
            placeholder="email address"
            required
            onChange={onChangeHandler}
            name="email"
            value={data.email}
          />
          <input
            type="password"
            placeholder="********"
            required
            onChange={onChangeHandler}
            name="password"
            value={data.password}
          />
        </div>
        <button type="onSubmit">
          {currState === "Login" ? "Login" : "Create Account"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" resource="" />
          <p>By proceeding, i agree to the terms of use & privacy policy</p>
        </div>
        {currState === "Login" ? (
          <p>
            new here?
            <span onClick={() => setCurrState("signup")}>
              {" "}
              create an account
            </span>
          </p>
        ) : (
          <p>
            Already have an account?
            <span onClick={() => setCurrState("Login")}> Login</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
