import React from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { acShrink } from "../../redux/shrink";

import { MdDashboard } from "react-icons/md";
import { MdOutlineAddBusiness } from "react-icons/md";
import { IoIosRestaurant } from "react-icons/io";
import { AiFillSetting } from "react-icons/ai";
import { HiChevronRight } from "react-icons/hi";
import { HiChevronLeft } from "react-icons/hi";
import { RiMenu2Line } from "react-icons/ri";
// import { RiArrowDownSLine } from "react-icons/ri";
// import { RiArrowUpSLine } from "react-icons/ri";

export const Sidebar = () => {
  const isShrinkView = useSelector((state) => state.shrink);
  const dispatch = useDispatch();

  const handleSidebarView = () => {
    dispatch(acShrink(!acShrink));
  };

  return (
    <div className={isShrinkView ? "shrink" : "sidebar_container"}>
      <Link to="/">{isShrinkView ? "Y" : "Yandex@Eats"}</Link>
      <div className="shrink_box">
        <h3 onClick={handleSidebarView}>
          {isShrinkView ? <RiMenu2Line /> : "Dashboard Menu"}
        </h3>
        <button onClick={handleSidebarView} type="button">
          {isShrinkView ? <HiChevronRight /> : <HiChevronLeft />}
        </button>
      </div>
      <ul className="menu_box">
        {menu.map((item) => {
          return (
            <Link to={item.path} key={item.id}>
              <span>{item.icon}</span> <p>{item.name}</p>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

const menu = [
  {
    id: "098765",
    path: "/dashboard",
    name: "Dashboard",
    icon: <MdDashboard />,
  },
  {
    id: "0765435",
    path: "/add/restaurant",
    name: "Add Restaurant",
    icon: <MdOutlineAddBusiness />,
  },
  {
    id: "243567",
    path: "/add/product",
    name: "Add Product",
    icon: <IoIosRestaurant />,
  },
  {
    id: "765433",
    path: "/settings",
    name: "Settings",
    icon: <AiFillSetting />,
  },
];
