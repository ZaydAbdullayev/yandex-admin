import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { acLogin, acLogout } from "../redux/auth";
import { v4 as uuidv5 } from "uuid";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import axios from "axios";

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
    const login = JSON.parse(localStorage.getItem("login")) || [];

    if (
      username === login.username &&
      password === login.password &&
      role === login.role
    ) {
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
    navigate("/signin");
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit} id="form">
        <h1>
          Hisobga kirish <span onClick={sig_in}>/ Ro'yxatdan o'tish</span>
        </h1>

        <input
          type="text"
          name="fullname"
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
            <input type="radio" name="role" value="owner" required />
            <p>Owner</p>
          </label>
        </div>
        <button className="log_btn" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
};

export const Signin = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const loginData = Object.fromEntries(formData.entries());
    localStorage.setItem("login", JSON.stringify(loginData));
    const token = uuidv5();
    localStorage.setItem("token", token);
    document.querySelector("#form").reset();
    navigate("/");

    const config = {
      url: `https://yandex.sp-school58.uz/register`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: loginData,
    };

    axios(config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
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
          Ro'yxatdan o'tish <span onClick={log_in}>/ Hisobga kirish</span>
        </h1>

        <input
          type="text"
          name="username"
          placeholder="Ism kiritng"
          required
          autoComplete="off"
          autoCapitalize="off"
          className="input"
        />
        <label>
          <input
            type={show ? "password" : "text"}
            name="password"
            placeholder="Parol kiriting"
            required
            autoComplete="off"
            className="input"
          />
          <span onClick={handleShow} style={show ? {} : { color: "orange" }}>
            {show ? <BsEyeSlash /> : <BsEye />}
          </span>
        </label>
        <div className="role">
          <p>Boshqaruvchi:</p>
          <label>
            <input type="radio" name="role" value="customer" required />
            <p>Sotuvchi</p>
          </label>
          <label>
            <input type="radio" name="role" value="owner" required />
            <p>owner</p>
          </label>
        </div>
        <button className="log_btn" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
};
