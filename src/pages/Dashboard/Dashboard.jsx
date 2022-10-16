import React, { useEffect } from "react";
import { useGlobalContext } from "../../contextapi/Context";
import { useNavigate } from "react-router-dom";
import { Grid, Switch, Typography, withStyles } from "@material-ui/core";

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 38,
    height: 26,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    "&$checked": {
      transform: "translateX(12px)",
      color: theme.palette.common.white,
      "& + $track": {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 22,
    height: 22,
    boxShadow: "none",
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

const Dashboard = () => {
  const navigate = useNavigate();
  const { isLoggedIn, foods, menus, acceptOrder, setAcceptOrder  ,updateAcceptOrder} = useGlobalContext();

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
        <div className="col">
          <div className="tile p-md-5 d-flex justify-content-between align-items-center ">
            <h3>Accept Order</h3>
            <Typography component="div">
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>Off</Grid>
                <Grid item>
                  <AntSwitch checked={acceptOrder} onChange={(e) => {
                    setAcceptOrder(e.target.checked)
                    updateAcceptOrder(e.target.checked)
                  }} name="checkedC" />
                </Grid>
                <Grid item>On</Grid>
              </Grid>
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
