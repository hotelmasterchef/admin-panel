import React, { useEffect } from "react";
import { useGlobalContext } from "../../contextapi/Context";
import { useNavigate } from "react-router-dom";
import { Button, Grid, Switch, Typography, withStyles } from "@material-ui/core";
import { activeOrdersRef } from "../../config/firebase";
import MaterialTable, { MTableToolbar } from "material-table";

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
  const { isLoggedIn, setLoading, setAlert, activeOrders, setActiveOrders, foods, menus, acceptOrder, setAcceptOrder, updateAcceptOrder } = useGlobalContext();
  console.log(activeOrders);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/admin-panel/");
    } else {
      fetchActiveOrders();
    }
  }, [isLoggedIn]);

  const fetchActiveOrders = async () => {
    setLoading(true);
    let arr = [];
    activeOrdersRef
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          arr.push(doc.data());
        });
        setActiveOrders([...arr]);
        setLoading(false);
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
  const handleAcceptOrder = async () => {};
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
                <b>{activeOrders?.length}</b>
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
                  <AntSwitch
                    checked={acceptOrder}
                    onChange={(e) => {
                      setAcceptOrder(e.target.checked);
                      updateAcceptOrder(e.target.checked);
                    }}
                    name="checkedC"
                  />
                </Grid>
                <Grid item>On</Grid>
              </Grid>
            </Typography>
          </div>
        </div>
        <div className="col-12">
          <MaterialTable
            title="New Orders"
            columns={[
              {
                title: "Name",
                field: "name",
                render: (rowData) => {
                  return <p>{rowData?.address?.name}</p>;
                },
              },
              {
                title: "Mobile",
                field: "mobile",
                render: (rowData) => {
                  return <p>{rowData?.address?.mobile}</p>;
                },
              },
              {
                title: "Address",
                field: "address",
                render: (rowData) => {
                  return <p>{rowData?.address?.address}</p>;
                },
              },
            ]}
            data={activeOrders}
            detailPanel={[
              {
                tooltip: "Show Name",
                render: (rowData) => {
                  console.log(rowData);
                  return (
                    <div
                      style={{
                        padding: "20px",
                        paddingLeft: "50px",
                      }}
                    >
                      <table
                        style={{
                          width: "100%",
                        }}
                      >
                        <tr>
                          <th>Name</th>
                          <th>Size</th>
                          <th>Quantity</th>
                          <th>Price</th>
                        </tr>
                        {rowData?.items?.map((ri) => {
                          return (
                            <tr>
                              <td>{ri?.name}</td>
                              <td>{ri?.size}</td>
                              <td>{ri?.quantity}</td>
                              <td>{ri?.price}</td>
                            </tr>
                          );
                        })}
                        <tr>
                          <td colSpan={4}>
                            <hr />
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3}></td>
                          <td>
                            <h5>Total Price:{rowData?.totalPrice}</h5>
                          </td>
                        </tr>
                      </table>
                    </div>
                  );
                },
              },
            ]}
            components={{
              Action: (props) => {
                switch (props?.action?.icon) {
                  case "edit":
                    return (
                      <Button
                        onClick={(event) => props.action.onClick(event, props.data)}
                        color="primary"
                        variant="contained"
                        style={{ textTransform: "none", marginRight: "10px" }}
                        size="small"
                      >
                        <i class="fa fa-check" aria-hidden="true"></i>&nbsp;Accept
                      </Button>
                    );
                  case "delete":
                    return (
                      <Button
                        onClick={(event) => props.action.onClick(event, props.data)}
                        color="secondary"
                        variant="contained"
                        style={{ textTransform: "none", marginRight: "10px" }}
                        size="small"
                      >
                        <i class="fa fa-times" aria-hidden="true"></i>&nbsp;Reject
                      </Button>
                    );
                  default:
                    return (
                      <Button
                        onClick={(event) => props.action.onClick(event, props.data)}
                        color="primary"
                        variant="contained"
                        style={{ textTransform: "none" }}
                        size="small"
                      >
                        default
                      </Button>
                    );
                }
              },
              Toolbar: (props) => (
                <div style={{}}>
                  <MTableToolbar {...props} />
                </div>
              ),
            }}
            actions={[
              {
                icon: "edit",
                tooltip: "Accept Order",
                alignItems: "right",
                onClick: (event, rowData) => {
                  // setEditModal({
                  //   state: true,
                  //   data: rowData,
                  // });
                  // setEdit_name(rowData?.name);
                  // setEdit_showInHome(rowData?.showInHome);
                },
              },
              {
                icon: "delete",
                tooltip: "Reject Order",
                alignItems: "right",
                onClick: (event, rowData) => {
                  // setDeleteModal({
                  //   state: true,
                  //   data: rowData?._id,
                  // });
                },
              },
            ]}
            options={{
              pageSize: 5,
              actionsColumnIndex: -1,
              exportButton: true,
              exportAllData: true,
              headerStyle: { fontWeight: "bold", color: "white", background: "#009688" },
            }}
            onRowClick={(event, rowData, togglePanel) => togglePanel()}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
