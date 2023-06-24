// import React, { memo, useState } from "react";
// import { MdClose } from "react-icons/md";
// import "./login.css";

// export const Login = memo(() => {
//   const [password, setPassword] = useState(false);

//   const showPassword = () => {
//     setPassword((prevPassword) => !prevPassword);
//   };

import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { acLogin, acLogout } from "../redux/auth";
import { v4 as uuidv5 } from "uuid";
import { BsEye, BsEyeSlash } from "react-icons/bs";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [err, setErr] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const value = Object.fromEntries(formData.entries());
    const { username, password } = value;
    console.log(value);

    if (username === "zayd" && password === "zayd") {
      const token = uuidv5();
      localStorage.setItem("token", token);
      dispatch(acLogin());
      navigate("/");
      setErr(false);
    } else {
      dispatch(acLogout());
      setErr(true);
      document.querySelector("#form").reset();
    }
  };

  const [show, setShow] = useState(true);

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit} id="form">
        <h1>Ro'yxatdan o'tish</h1>
        <div className="role">
          <label>
            <p>Foydalanuvchi</p>
            <input
              type="radio"
              name="admin"
              value="user"
              required
              defaultChecked
            />
          </label>
          <label>
            <p>Sotuvchi</p>
            <input type="radio" name="admin" value="customer" required />
          </label>
          <label>
            <p>Admin</p>
            <input type="radio" name="admin" value="admin" required />
          </label>
        </div>
        <input
          type="text"
          name="username"
          placeholder="Ism kiritng"
          required
          autoComplete="off"
          autoCapitalize="off"
          className="input"
          style={err ? { border: "1px solid tomato", padding: "4.5% 3%" } : {}}
        />
        <label>
          <input
            type={show ? "password" : "text"}
            name="password"
            placeholder="Parol kiriting"
            required
            autoComplete="off"
            className="input"
            style={err ? { border: "1px solid tomato" } : {}}
          />
          <span onClick={handleShow}>{show ? <BsEyeSlash /> : <BsEye />}</span>
          <p style={err ? { display: "flex" } : {}} className="failed">
            Foydalanuvchi yoki parol xaroligi...!
          </p>
        </label>
        <button className="log_btn" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
};
