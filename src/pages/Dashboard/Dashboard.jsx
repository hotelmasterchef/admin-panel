import React, { useEffect } from "react";
import { useGlobalContext } from "../../contextapi/Context";
import { useNavigate } from "react-router-dom";
import { Button, Grid, Switch, Typography, withStyles } from "@material-ui/core";
import { activeOrdersRef, orderHistoryRef, processOrdersRef } from "../../config/firebase";
import MaterialTable, { MTableToolbar } from "material-table";
import ConfirmModal from "./ConfirmModal";
import { useState } from "react";
import { v4 } from "uuid";

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
  const {
    isLoggedIn,
    setLoading,
    setAlert,
    processOrders,
    setProcessOrders,
    activeOrders,
    setActiveOrders,
    foods,
    menus,
    acceptOrder,
    setAcceptOrder,
    updateAcceptOrder,
  } = useGlobalContext();
  const [confirmModal, setConfirmModal] = useState({
    state: false,
    data: null,
    type: "",
    msg: "",
    mode: "",
  });
  console.log(activeOrders);
  const [counter, setCounter] = useState(60);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/admin-panel/");
    } else {
      fetchActiveOrders();
      fetchProecessing();
    }
  }, [isLoggedIn]);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (acceptOrder) {
        if (counter !== 0) setCounter(counter - 1);
        else {
          setCounter(60);
          fetchActiveOrders();
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });
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
  const fetchProecessing = async () => {
    setLoading(true);
    let arr = [];
    processOrdersRef
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          arr.push(doc.data());
        });
        setProcessOrders([...arr]);
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
  const handleAcceptOrder = async (data) => {
    setLoading(true);
    setConfirmModal({
      state: false,
      data: null,
      type: "",
      msg: "",
      mode: "",
    });
    let id = v4();
    console.log(data);
    processOrdersRef
      .doc(id)
      .set({
        _id: id,
        address: data?.address,
        delivery_charge: data?.delivery_charge,
        items: data?.items,
        totalPrice: data?.totalPrice,
        date: data?.date
      })
      .then((docs) => {
        setAlert({
          flag: true,
          type: "success",
          msg: "😄 Order accepted.",
        });
        setProcessOrders([
          ...processOrders,
          {
            _id: id,
            address: data?.address,
            delivery_charge: data?.delivery_charge,
            items: data?.items,
            totalPrice: data?.totalPrice,
            date: data?.date
          },
        ]);
        activeOrdersRef
          .doc(data?._id)
          .delete()
          .then((docs) => {
            setLoading(false);
            let activeNow = activeOrders?.filter((ao) => ao?._id !== data?._id);
            setActiveOrders([...activeNow]);
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
  const handleRejectOrder = (data) => {
    setLoading(true);
    setConfirmModal({
      state: false,
      data: null,
      type: "",
      msg: "",
      mode: "",
    });
    activeOrdersRef
      .doc(data?._id)
      .delete()
      .then((docs) => {
        setLoading(false);
        let activeNow = activeOrders?.filter((ao) => ao?._id !== data?._id);
        setActiveOrders([...activeNow]);
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
  const handleRejectProcess = (data) => {
    setLoading(true);
    setConfirmModal({
      state: false,
      data: null,
      type: "",
      msg: "",
      mode: "",
    });
    processOrdersRef
      .doc(data?._id)
      .delete()
      .then((docs) => {
        setLoading(false);
        let activeNow = processOrders?.filter((ao) => ao?._id !== data?._id);
        setProcessOrders([...activeNow]);
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
  const handleCompleteProcess = async (data) => {
    setLoading(true);
    setConfirmModal({
      state: false,
      data: null,
      type: "",
      msg: "",
      mode: "",
    });
    let id = v4();
    orderHistoryRef
      .doc(id)
      .set({
        _id: id,
        address: data?.address,
        delivery_charge: data?.delivery_charge,
        items: data?.items,
        totalPrice: data?.totalPrice,
        date: data?.date
      })
      .then((docs) => {
        setAlert({
          flag: true,
          type: "success",
          msg: "😄 Order delivered successfully.",
        });
        processOrdersRef
          .doc(data?._id)
          .delete()
          .then((docs) => {
            setLoading(false);
            let activeNow = processOrders?.filter((ao) => ao?._id !== data?._id);
            setProcessOrders([...activeNow]);
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
  return (
    <>
      <ConfirmModal
        isOpen={confirmModal?.state}
        handleClose={() =>
          setConfirmModal({
            state: false,
            data: null,
            type: "",
          })
        }
        data={confirmModal?.data}
        msg={confirmModal?.msg}
        type={confirmModal?.type}
        mode={confirmModal?.mode}
        handleConfirm={(mode, t, data) => {
          if (mode === "active") {
            if (t === "accept") handleAcceptOrder(data);
            else if (t === "reject") handleRejectOrder(data);
          } else {
            if (t === "accept") handleCompleteProcess(data);
            else if (t === "reject") handleRejectProcess(data);
          }
        }}
      />
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
            <i className="icon  fa fa-bell-o fa-3x"></i>
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
            <i className="icon fa fa-clock-o fa-3x"></i>
            <div className="info">
              <h4>Pending Orders</h4>
              <p>
                <b>{processOrders?.length}</b>
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-6">
          <div className="widget-small warning coloured-icon">
            <i className="icon fa fa-list-alt fa-3x"></i>
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
            <i className="icon fa fa-cutlery fa-3x"></i>
            <div className="info">
              <h4>Total Foods</h4>
              <p>
                <b>{foods?.length}</b>
              </p>
            </div>
          </div>
        </div>
        <div className="col-8">
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
        <div className="col-4">
          <div className="tile p-md-5 d-flex justify-content-center align-items-center">
            <h4>{counter}</h4>
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
                        padding: "50px",
                      }}
                    >
                      <p>Date: <b>{rowData?.date}</b></p>
                      <table
                        style={{
                          width: "100%",
                        }}
                      >
                        <tr>
                          <th>Name</th>
                          <th>Size</th>
                          <th>Quantity</th>
                          <th>Unit Price</th>
                          <th
                            align="right"
                            style={{
                              textAlign: "right",
                            }}
                          >
                            Total Price
                          </th>
                        </tr>
                        {rowData?.items?.map((ri) => {
                          return (
                            <tr>
                              <td>{ri?.name}</td>
                              <td>{ri?.size}</td>
                              <td>{ri?.quantity}</td>
                              <td>{ri?.price}</td>
                              <td align="right">{ri?.price * ri?.quantity}</td>
                            </tr>
                          );
                        })}
                        <tr>
                          <td colSpan={5}>
                            <hr />
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={4}></td>
                          <td align="right">
                            <p>Delivery Charge:{rowData?.delivery_charge}</p>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={4}></td>
                          <td align="right">
                            <h5>Grand Total Price:{rowData?.totalPrice}</h5>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={4}></td>
                          <td align="right">
                            <button
                              onClick={() => {
                                sessionStorage.setItem("orderBill", JSON.stringify(rowData));
                                navigate("/admin-panel/download");
                              }}
                            >
                              Download Invoice
                            </button>
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
                        variant="contained"
                        style={{ textTransform: "none", marginRight: "10px" }}
                        size="small"
                        className="btn_primary"
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
                  setConfirmModal({
                    state: true,
                    data: rowData,
                    msg: `Confirm with the customer. Call: ${rowData?.address?.mobile}`,
                    type: "accept",
                    mode: "active",
                  });
                },
              },
              {
                icon: "delete",
                tooltip: "Reject Order",
                alignItems: "right",
                onClick: (event, rowData) => {
                  setConfirmModal({
                    state: true,
                    data: rowData,
                    msg: `Inform the customer about rejection. Call: ${rowData?.address?.mobile}`,
                    type: "reject",
                    mode: "active",
                  });
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
        <div className="col-12 mt-5">
          <MaterialTable
            title="Pending Orders"
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
            data={processOrders}
            detailPanel={[
              {
                tooltip: "Show Name",
                render: (rowData) => {
                  return (
                    <div
                      style={{
                        padding: "50px",
                      }}
                    >
                      <p>Date: <b>{rowData?.date}</b></p>
                      <table
                        style={{
                          width: "100%",
                        }}
                      >
                        <tr>
                          <th>Name</th>
                          <th>Size</th>
                          <th>Quantity</th>
                          <th>Unit Price</th>
                          <th
                            align="right"
                            style={{
                              textAlign: "right",
                            }}
                          >
                            Total Price
                          </th>
                        </tr>
                        {rowData?.items?.map((ri) => {
                          return (
                            <tr>
                              <td>{ri?.name}</td>
                              <td>{ri?.size}</td>
                              <td>{ri?.quantity}</td>
                              <td>{ri?.price}</td>
                              <td align="right">{ri?.price * ri?.quantity}</td>
                            </tr>
                          );
                        })}
                        <tr>
                          <td colSpan={5}>
                            <hr />
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={4}></td>
                          <td align="right">
                            <p>Delivery Charge:{rowData?.delivery_charge}</p>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={4}></td>
                          <td align="right">
                            <h5>Grand Total Price:{rowData?.totalPrice}</h5>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={4}></td>
                          <td align="right">
                            <button
                              onClick={() => {
                                sessionStorage.setItem("orderBill", JSON.stringify(rowData));
                                navigate("/admin-panel/download");
                              }}
                            >
                              Download Invoice
                            </button>
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
                        variant="contained"
                        style={{ textTransform: "none", marginRight: "10px" }}
                        size="small"
                        className="btn_primary"
                      >
                        <i class="fa fa-check" aria-hidden="true"></i>&nbsp;Delivered
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
                tooltip: "Order Delivered",
                alignItems: "right",
                onClick: (event, rowData) => {
                  setConfirmModal({
                    state: true,
                    data: rowData,
                    msg: `Confirm with the delivery boy.`,
                    type: "accept",
                    mode: "process",
                  });
                },
              },
              {
                icon: "delete",
                tooltip: "Reject Order",
                alignItems: "right",
                onClick: (event, rowData) => {
                  setConfirmModal({
                    state: true,
                    data: rowData,
                    msg: `Inform the customer about rejection. Call: ${rowData?.address?.mobile}`,
                    type: "reject",
                    mode: "process",
                  });
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
