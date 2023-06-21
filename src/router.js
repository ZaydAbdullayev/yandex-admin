import React from "react";
import "./assets/global.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./page/home/home";
import { Layout } from "./layout/layout";
import { Sidebar } from "./components/sideBar/sidebar";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Sidebar />} />
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
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
