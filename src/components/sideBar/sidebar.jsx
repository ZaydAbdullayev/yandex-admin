import React from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { acShrink } from "../../redux/shrink";
import { MdDashboard } from "react-icons/md";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { IoIosRestaurant } from "react-icons/io";
import { AiFillSetting } from "react-icons/ai";
import { HiChevronRight } from "react-icons/hi";
import { HiChevronLeft } from "react-icons/hi";
import { RiMenu2Line } from "react-icons/ri";
// import { RiArrowDownSLine } from "react-icons/ri";
// import { RiArrowUpSLine } from "react-icons/ri";

export const Sidebar = () => {
  const login = JSON.parse(localStorage.getItem("login")) || [];
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
        {login.role === "admin"
          ? menu.map((item) => {
              return (
                <Link to={item.path} key={item.id}>
                  <span>{item.icon}</span> <p>{item.name}</p>
                </Link>
              );
            })
          : menu_customer.map((item) => {
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
    path: "add/restaurant",
    name: "Restaurants",
    icon: <SiHomeassistantcommunitystore />,
  },
  {
    id: "243567",
    path: "/add/product",
    name: "AddProduct",
    icon: <IoIosRestaurant />,
  },
  {
    id: "765433",
    path: "/settings",
    name: "Settings",
    icon: <AiFillSetting />,
  },
];
const menu_customer = [
  {
    id: "098765",
    path: "/dashboard",
    name: "Dashboard",
    icon: <MdDashboard />,
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

const category = [
  {
    id: "234567",
    name: "Add restoraund",
    path: "/"
  }
];
