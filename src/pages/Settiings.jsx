import React from "react";
import { toast } from "react-toastify";

const Settings = () => {
  return (
    <>
      <h2>Settings</h2>
      <p>Notification</p>
      <button type="button" onClick={() => toast("Alert")}>
        Show
      </button>
    </>
  );
};

export default Settings;
