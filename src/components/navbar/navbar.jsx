import React from "react";
import "./navbar.css";

import { BsSearch } from "react-icons/bs";
import { FaBell } from "react-icons/fa";
import default_img from "../../assets/images/default-img.png";

export const Navbar = () => {
  return (
    <div className="navbar">
      <form className="search">
        <BsSearch />
        <input type="search" name="search" placeholder="search" required />
      </form>
      <div className="profile">
        <FaBell />
        <img src={default_img} alt="" />
      </div>
    </div>
  );
};
