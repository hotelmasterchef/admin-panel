import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import SecureLS from "secure-ls";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  // global
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    flag: false,
    type: "",
    msg: "",
  });
  const [reload, setReload] = useState(1);

  const [menus, setMenus] = useState([]);
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    var ls = new SecureLS({ encodingType: "aes" });
    let data = ls.get("7e2bad80-f8a4-4180-9682-1198cbc35725");
    if (data) {
      console.log(data)
      setIsLoggedIn(data?.data);
    } else setIsLoggedIn(false);
  }, []);
  useEffect(() => {
    if (isLoggedIn) fetchData();
  }, [isLoggedIn]);
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios("https://raw.githubusercontent.com/hotelmasterchefdatabase/data/main/data.json");
      setLoading(false);
      setMenus([...response?.menus]);
      setFoods([...response?.foods]);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setAlert({
        flag: true,
        type: "error",
        msg: "Something went wrong. Please try again.",
      });
      setLoading(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        alert,
        setAlert,
        reload,
        setReload,
        user,
        setUser,
        loading,
        setLoading,
        isLoggedIn,
        setIsLoggedIn,
        menus,
        setMenus,
        foods,
        setFoods,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export default AppProvider;
