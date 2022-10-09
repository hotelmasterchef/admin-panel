import React, { useEffect } from "react";
import Layout from "./layout/Index";
import "./css/main.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Auth/Login";
import Settings from "./pages/Settiings";
import { useGlobalContext } from "./contextapi/Context";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Menus from "./pages/Menu/Menu";

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
          <Route path="/login" element={<Login />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/menus" element={<Menus />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
