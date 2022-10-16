import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import SecureLS from "secure-ls";
import { foodsRef, menusRef, settings, settings2 } from "../config/firebase";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  var ls = new SecureLS({ encodingType: "aes" });
  // global
  const [isLoggedIn, setIsLoggedIn] = useState(ls.get("7e2bad80-f8a4-4180-9682-1198cbc35725") ? true : false);
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
  const [popularFoods, setPopularFoods] = useState([]);

  const [acceptOrder, setAcceptOrder] = useState(false);

  useEffect(() => {
    let data = ls.get("7e2bad80-f8a4-4180-9682-1198cbc35725");
    if (data) {
      setIsLoggedIn(data?.data);
    } else setIsLoggedIn(false);
  }, []);
  useEffect(() => {
    if (isLoggedIn) fetchAll();
  }, [isLoggedIn]);
  // const response = await axios("https://raw.githubusercontent.com/hotelmasterchefdatabase/data/main/data.json");

  const fetchAll = async () => {
    setLoading(true);
    let arr = [];
    menusRef
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          arr.push(doc.data());
        });
        setMenus([...arr]);
        setLoading(false);
        setLoading(true);
        let arr2 = [];
        foodsRef
          .get()
          .then((docs) => {
            docs.forEach((doc) => {
              arr2.push(doc.data());
            });
            setFoods([...arr2]);
            setLoading(false);
            setLoading(true);
            let arr3 = [];
            settings
              .get()
              .then((docs3) => {
                docs3.forEach((doc3) => {
                  arr3.push(doc3.data());
                });
                setPopularFoods(arr3[0]?.data);
                setLoading(false);
                let arr4 = [];
                setLoading(true);
                settings2
                  .get()  
                  .then((docs4) => {
                    setLoading(false);
                    docs4.forEach((doc4) => {
                      arr4.push(doc4.data());
                    });
                    setAcceptOrder(arr4[0]?.state);
                  })
                  .catch((err) => {
                    setAlert({
                      flag: true,
                      type: "error",
                      msg: err.message,
                    });
                    setLoading(false);
                  });
              })
              .catch((err) => {
                setAlert({
                  flag: true,
                  type: "error",
                  msg: err.message,
                });
                setLoading(false);
              });
          })
          .catch((err) => {
            setAlert({
              flag: true,
              type: "error",
              msg: err.message,
            });
            setLoading(false);
          });
      })
      .catch((err) => {
        setAlert({
          flag: true,
          type: "error",
          msg: err.message,
        });
        setLoading(false);
      });
  };
  const updateAcceptOrder = (stat) => {
    settings2.doc("accpet_order").set({
      state: stat,
    });
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
        popularFoods,
        setPopularFoods,
        setAcceptOrder,
        acceptOrder,
        updateAcceptOrder,
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
