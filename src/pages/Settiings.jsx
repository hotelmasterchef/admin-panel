import React from "react";
import { toast } from "react-toastify";
import { useGlobalContext } from "../contextapi/Context";

const Settings = () => {
  const { setLoading } = useGlobalContext();
  return (
    <>
      <h2>Settings</h2>
      <p>Notification</p>
      <button type="button" onClick={() => toast("Alert")}>
        Show
      </button>
      <p>Loading</p>
      <button type="button" onClick={() => setLoading(true)}>
        Show
      </button>
    </>
  );
};

export default Settings;
