import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import SecureLS from "secure-ls";
import { foodsRef, menusRef, settings, settings2, bannerRef  } from "../config/firebase";

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

  const [banners, setBanners] = useState([]);

  const [acceptOrder, setAcceptOrder] = useState(false);
  const [activeOrders,setActiveOrders] = useState([])

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
            let obj3 = {};
            settings
              .get()
              .then((docs3) => {
                docs3.forEach((doc3) => {
                  obj3[doc3?.id] = doc3.data()?.data;
                });
                if (obj3?.popularFoods) {
                  setPopularFoods(obj3?.popularFoods);
                } else setPopularFoods([]);
                setLoading(false);
                setLoading(true);
                let arr4 = [];
                settings2
                  .get()
                  .then((docs4) => {
                    setLoading(false);
                    docs4.forEach((doc4) => {
                      arr4.push(doc4.data());
                    });
                    setAcceptOrder(arr4[0]?.state);
                    setLoading(true);
                    let arr5 = [];
                    bannerRef
                      .get()
                      .then((docs5) => {
                        docs5.forEach((doc) => {
                          arr5.push(doc.data());
                        });
                        setLoading(false);
                        setBanners([...arr5]);
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
        setBanners,
        banners,
        setActiveOrders,
        activeOrders
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
