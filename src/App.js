import React from "react";
import Layout from "./layout/Index";
import "./css/main.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Table from "./pages/Table";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/table" element={<Table />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
