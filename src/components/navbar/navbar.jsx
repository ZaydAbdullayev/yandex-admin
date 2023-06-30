import React from "react";
import "./navbar.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { acOpenMadal, acCloseModal } from "../../redux/modal";

import { BsSearch } from "react-icons/bs";
import { FaBell } from "react-icons/fa";
import default_img from "../../assets/images/default-img.png";

export const Navbar = () => {
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch(acOpenMadal());
  };

  const closeModal = () => {
    dispatch(acCloseModal());
  };

  return (
    <div className="navbar">
      <form className="search">
        <BsSearch />
        <input type="search" name="search" placeholder="search" required />
      </form>
      <div className="profile">
        <FaBell />
        <img src={default_img} alt="user_photo" onClick={openModal} />
      </div>
      <div className={modal ? "modal_box" : "modal_box close_modal"}>
        <div className="user">
          <b>Username</b>
          <figure>
            <img src={default_img} alt="user_photo" />
            <button onClick={closeModal}>x</button>
          </figure>
        </div>
        <ul>
          <li>Ma'lumotlarim</li>
          <li>Manzillarim</li>
          <li>Buyurtlarim</li>
          <li>Bildirishnomalar</li>
          <li>Chiqish</li>
        </ul>
      </div>
    </div>
  );
};
