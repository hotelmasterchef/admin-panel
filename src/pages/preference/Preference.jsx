import React from "react";
import { useState } from "react";
import { settings2 } from "../../config/firebase";
import { useGlobalContext } from "../../contextapi/Context";

const Preference = () => {
  const { setLoading, setAlert, delivery, setDelivery } = useGlobalContext();

  const saveDeliveryCharge = () => {
    if (delivery !== "") {
      setLoading(true);
      try {
        settings2.doc("delivery_charge").set({
          state: delivery,
        });
        setAlert({
          flag: true,
          type: "success",
          msg: "Delivery Charge Updated",
        });
        setLoading(false);
      } catch (error) {
        setAlert({
          flag: true,
          type: "error",
          msg: error.message,
        });
        setLoading(false);
      }
    }
  };
  return (
    <>
      <div className="app-title">
        <div>
          <h1>
            <i className="fa fa-circle-o"></i> Preference
          </h1>
        </div>
        <ul className="app-breadcrumb breadcrumb">
          <li className="breadcrumb-item">
            <i className="fa fa-home fa-lg"></i>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Preference</a>
          </li>
        </ul>
      </div>
      <div className="tile">
        <div className="mt-5 d-flex ">
          <h5>Delivery Charge</h5>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input type="number" value={delivery} onChange={(e) => setDelivery(e.target.value)} />
        </div>
        <div className="mt-5 d-flex justify-content-center">
          <button type="button" className="btn btn-primary ml-3" onClick={() => saveDeliveryCharge()}>
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default Preference;
