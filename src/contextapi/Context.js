import React, { useState, useEffect, useContext } from "react";
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
        setIsLoggedIn
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
