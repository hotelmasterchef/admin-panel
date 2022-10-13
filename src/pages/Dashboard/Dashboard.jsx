import React, { useEffect } from "react";
import { useGlobalContext } from "../../contextapi/Context";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isLoggedIn, foods, menus } = useGlobalContext();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/admin-panel/");
    }
  }, [isLoggedIn]);
  return (
    <>
      <div className="app-title">
        <div>
          <h1>
            <i className="fa fa-dashboard"></i> Dashboard
          </h1>
        </div>
        <ul className="app-breadcrumb breadcrumb">
          <li className="breadcrumb-item">
            <i className="fa fa-home fa-lg"></i>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Dashboard</a>
          </li>
        </ul>
      </div>
      <div className="row">
        <div className="col-md-6 col-lg-6">
          <div className="widget-small primary coloured-icon">
            <i className="icon fa fa-bandcamp fa-3x"></i>
            <div className="info">
              <h4>New Orders</h4>
              <p>
                <b>0</b>
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-6">
          <div className="widget-small info coloured-icon">
            <i className="icon fa fa-thumbs-o-up fa-3x"></i>
            <div className="info">
              <h4>Total Orders</h4>
              <p>
                <b>0</b>
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-6">
          <div className="widget-small warning coloured-icon">
            <i className="icon fa fa-files-o fa-3x"></i>
            <div className="info">
              <h4>Total Menus</h4>
              <p>
                <b>{menus?.length}</b>
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-6">
          <div className="widget-small danger coloured-icon">
            <i className="icon fa fa-star fa-3x"></i>
            <div className="info">
              <h4>Total Foods</h4>
              <p>
                <b>{foods?.length}</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
