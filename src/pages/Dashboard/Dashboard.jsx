import React from "react";

const Dashboard = () => {
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
        <div className="col-md-6 col-lg-3">
          <div className="widget-small primary coloured-icon">
            <i className="icon fa fa-users fa-3x"></i>
            <div className="info">
              <h4>Users</h4>
              <p>
                <b>5</b>
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="widget-small info coloured-icon">
            <i className="icon fa fa-thumbs-o-up fa-3x"></i>
            <div className="info">
              <h4>Likes</h4>
              <p>
                <b>25</b>
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="widget-small warning coloured-icon">
            <i className="icon fa fa-files-o fa-3x"></i>
            <div className="info">
              <h4>Uploades</h4>
              <p>
                <b>10</b>
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="widget-small danger coloured-icon">
            <i className="icon fa fa-star fa-3x"></i>
            <div className="info">
              <h4>Stars</h4>
              <p>
                <b>500</b>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="tile">
            <h3 className="tile-title">Monthly Sales</h3>
            <div className="embed-responsive embed-responsive-16by9">
              <canvas className="embed-responsive-item" id="lineChartDemo"></canvas>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="tile">
            <h3 className="tile-title">Support Requests</h3>
            <div className="embed-responsive embed-responsive-16by9">
              <canvas className="embed-responsive-item" id="pieChartDemo"></canvas>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
