import React, { useEffect } from "react";
import Layout from "./layout/Index";
import "./css/main.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Table from "./pages/Table";
import Settings from "./pages/Settiings";
import { useGlobalContext } from "./contextapi/Context";

const App = () => {
  const { loading, setLoading } = useGlobalContext();
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  }, [loading]);

  return (
    <>
      {loading ? (
        <>
          <div className="overlay show"></div>
          <div className="spanner show">
            <div className="loader show"></div>
          </div>
        </>
      ) : null}
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/table" element={<Table />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
