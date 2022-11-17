import React, { useEffect } from "react";
import Layout from "./layout/Index";
import "./css/main.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Auth/Login";
import { useGlobalContext } from "./contextapi/Context";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Menus from "./pages/Menu/Menu";
import Foods from "./pages/Food/Foods";
import UpdateStrage from "./pages/updateStorage/UpdateStrage";
import PopularFoods from "./pages/popularFoods/PopularFoods";
import Banner from "./pages/banners/Banner";
import Orders from "./pages/orders/Orders";
import Download from "./pages/download/Download";
import Preference from "./pages/preference/Preference";

const App = () => {
  const { loading, setLoading, user, alert, setAlert } = useGlobalContext();
  const { flag, type, msg } = alert;
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  }, [loading]);
  const handleAlertClose = () => {
    setAlert({
      flag: false,
      type: "",
      msg: "",
    });
  };
  return (
    <>
      <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={flag} autoHideDuration={5000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity={type}>
          {msg}
        </Alert>
      </Snackbar>
      {loading ? (
        <>
          <div className="overlay show"></div>
          <div className="spanner show">
            <div className="loader show"></div>
          </div>
        </>
      ) : null}
      <BrowserRouter>
        <Routes>
          <Route path="/admin-panel" element={<Login />} />
          <Route element={<Layout />}>
            <Route path="/admin-panel/dashboard" element={<Dashboard />} />
            <Route path="/admin-panel/menus" element={<Menus />} />
            <Route path="/admin-panel/foods" element={<Foods />} />
            <Route path="/admin-panel/update-storage" element={<UpdateStrage />} />
            <Route path="/admin-panel/popular-foods" element={<PopularFoods />} />
            <Route path="/admin-panel/banners" element={<Banner />} />
            <Route path="/admin-panel/orders" element={<Orders />} />
            <Route path="/admin-panel/download" element={<Download />} />
            <Route path="/admin-panel/preference" element={<Preference />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
