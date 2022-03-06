import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Minifigs from "components/pages/Minifigs";
import Auth from "components/pages/Auth";

export const AppRoutes = () => (
  <Routes>
    <Route path="/minifigs" element={<Minifigs />} />
    <Route path="/auth" element={<Auth />} />
    <Route path="*" element={<Navigate replace to="/minifigs" />} />
  </Routes>
);

export default AppRoutes;
