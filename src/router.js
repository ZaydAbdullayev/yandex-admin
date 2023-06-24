import React from "react";
import "./assets/global.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./page/home/home";
import { Layout } from "./layout/layout";
import { Sidebar } from "./components/sideBar/sidebar";
import { Restaurant } from "./page/restaurants/restaurant";
import { Login } from "./auth/login";
import { Auth } from "./auth/auth";

export const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Auth />}>
        <Route path="/" element={<Layout />}>
          <Route path="sidebar" element={<Sidebar />} />
          <Route path="dashboard" element={<Home />} />
          <Route path="add/restaurant" element={<Restaurant />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  );
};

const NotFound = () => {
  return (
    <>
      <h1>not found</h1>
    </>
  );
};