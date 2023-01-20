import MaterialTable, { MTableToolbar } from "material-table";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { orderHistoryRef } from "../../config/firebase";
import { useGlobalContext } from "../../contextapi/Context";

const Orders = () => {
  const navigate = useNavigate();
  const { setLoading, setAlert } = useGlobalContext();
  const [orderHistoryList, setOrderHistoryList] = useState([]);
  useEffect(() => {
    fetchOrderHistory();
  }, []);

  const fetchOrderHistory = async () => {
    setLoading(true);
    let arr = [];
    orderHistoryRef
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          arr.push(doc.data());
        });
        setOrderHistoryList([...arr]);
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
  return (
    <>
      <div className="app-title">
        <div>
          <h1>
            <i className="fa fa-bell-o"></i> Orders
          </h1>
        </div>
        <ul className="app-breadcrumb breadcrumb">
          <li className="breadcrumb-item">
            <i className="fa fa-home fa-lg"></i>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Orders</a>
          </li>
        </ul>
      </div>
      <MaterialTable
        title="Order History"
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
        data={orderHistoryList}
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
                  <p>
                    Date: <b>{rowData?.date}</b>
                  </p>
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
                        <h5>Grand Total Price:{rowData?.totalPrice + rowData?.delivery_charge}</h5>
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
          Toolbar: (props) => (
            <div style={{}}>
              <MTableToolbar {...props} />
            </div>
          ),
        }}
        options={{
          pageSize: 5,
          actionsColumnIndex: -1,
          exportButton: true,
          exportAllData: true,
          headerStyle: { fontWeight: "bold", color: "white", background: "#009688" },
        }}
        onRowClick={(event, rowData, togglePanel) => togglePanel()}
      />
    </>
  );
};

export default Orders;
