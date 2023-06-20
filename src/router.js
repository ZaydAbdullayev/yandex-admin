import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./page/home/home";

export const Router = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
    </Routes>
  );
};
