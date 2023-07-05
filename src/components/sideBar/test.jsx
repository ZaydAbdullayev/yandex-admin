import React, { useState } from "react";
import { Link } from "react-router-dom"; // Assuming you are using React Router for navigation

const menu = [
  {
    id: "098765",
    path: "/dashboard",
    name: "Dashboard",
  },
  {
    id: "0765435",
    path: "/add/restaurant",
    name: "Restaurants",
  },
  {
    id: "243567",
    path: "/add/product",
    name: "Add Product",
  },
  {
    id: "765433",
    path: "/settings",
    name: "Settings",
  },
];

const category = [
  {
    id: "0765435",
    name: "Add restoraund",
    path: "/add/restaurant",
  },
  {
    id: "0765435",
    name: "Restaurant list",
    path: "/restaurant/list",
  },
  {
    id: "0765435",
    name: "orders",
    path: "/orders",
  },
];

const Sidebar = () => {
  const [activeCategoryId, setActiveCategoryId] = useState(null);

  const handleCategoryClick = (categoryId) => {
    setActiveCategoryId(categoryId);
  };

  return (
    <div>
      {/* Sidebar Menu */}
      <ul>
        {menu.map((item) => (
          <li key={item.id}>
            <Link to={item.path} onClick={() => handleCategoryClick(item.id)}>
              {item.icon} {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Categories */}
      <ul>
        {activeCategoryId &&
          category
            .filter((cat) => cat.id === activeCategoryId)
            .map((catItem) => (
              <li key={catItem.path}>
                <Link to={catItem.path}>{catItem.name}</Link>
              </li>
            ))}
      </ul>
    </div>
  );
};

export default Sidebar;
