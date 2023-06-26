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
    const loginData = Object.fromEntries(formData.entries());
    const { username, password, role } = loginData;
    console.log(loginData);
    localStorage.setItem("login", JSON.stringify(loginData));

    if (username === "zayd" && password === "zayd" && role === "admin") {
      const token = uuidv5();
      localStorage.setItem("token", token);
      dispatch(acLogin());
      navigate("/");
      setErr(false);
    } else if (
      username === "customer" &&
      password === "customer" &&
      role === "customer"
    ) {
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

  const sig_in = () => {
    navigate("/sigin");
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit} id="form">
        <h1>
          Ro'yxatdan o'tish <span onClick={sig_in}>/ Hisobga kirish</span>
        </h1>

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
          <span onClick={handleShow} style={show ? {} : { color: "orange" }}>
            {show ? <BsEyeSlash /> : <BsEye />}
          </span>
          <p style={err ? { display: "flex" } : {}} className="failed">
            Foydalanuvchi yoki parol xaroligi...!
          </p>
        </label>
        <div className="role">
          <p style={err ? { color: "tomato" } : {}}>Boshqaruvchi:</p>
          <label>
            <input type="radio" name="role" value="customer" required />
            <p>Sotuvchi</p>
          </label>
          <label>
            <input type="radio" name="role" value="admin" required />
            <p>Admin</p>
          </label>
        </div>
        <button className="log_btn" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
};

export const Sigin = () => {
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

  const log_in = () => {
    navigate("/login");
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit} id="form">
        <h1>
          Hisobga kirish <span onClick={log_in}>/ Ro'yxatdan o'tish</span>
        </h1>

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
          <span onClick={handleShow} style={show ? {} : { color: "orange" }}>
            {show ? <BsEyeSlash /> : <BsEye />}
          </span>
          <p style={err ? { display: "flex" } : {}} className="failed">
            Foydalanuvchi yoki parol xaroligi...!
          </p>
        </label>
        <div className="role">
          <p style={err ? { color: "tomato" } : {}}>Boshqaruvchi:</p>
          <label>
            <input type="radio" name="admin" value="customer" required />
            <p>Sotuvchi</p>
          </label>
          <label>
            <input type="radio" name="admin" value="admin" required />
            <p>Admin</p>
          </label>
        </div>
        <button className="log_btn" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
};
