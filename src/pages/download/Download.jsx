import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import logo from "../../data/logo.png";

const Download = () => {
  const [data, setData] = useState({});
  console.log(data);
  useEffect(() => {
    let getData = JSON.parse(sessionStorage.getItem("orderBill"));
    if (getData) setData(getData);
  }, []);

  const Print = () => {
    //console.log('print');
    // let printContents = document.getElementById("printablediv").innerHTML;
    // let originalContents = document.body.innerHTML;
    // document.body.innerHTML = printContents;
    document.title = "Order Invoice";
    window.print();
    // document.body.innerHTML = originalContents;
  };
  return (
    <div id="printablediv">
      <button onClick={Print}>Print</button>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItem: "center",
          textAlign: "center",
          flexDirection: "column",
        }}
      >
        <div>
          <img src={logo} height="80px" alt="logo" />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItem: "center",
          }}
        >
          <h6
            style={{
              padding: "10px",
              border: "1px solid black",
              borderRadius: "4px",
              fontSize: "18px",
              maxWidth: "fit-content",
              marginTop: "10px",
            }}
          >
            Order Invoice
          </h6>
        </div>
      </div>
      <div
        style={{
          padding: "50px",
        }}
      >
        <div>
          <p>
            Customer Name: <b>{data?.address?.name}</b>
          </p>
          <p>
            Phone Number: <b>{data?.address?.mobile}</b>
          </p>
          <p>
            Address: <b>{data?.address?.address}</b>
          </p>
          <p>
            Date: <b>{data?.date}</b>
          </p>
        </div>
        <table
          style={{
            width: "100%",
            marginTop: "20px",
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
          {data?.items?.map((ri) => {
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
              <p>Delivery Charge:{data?.delivery_charge}</p>
            </td>
          </tr>
          <tr>
            <td colSpan={4}></td>
            <td align="right">
              <h5>Grand Total Price:{data?.totalPrice + data?.delivery_charge}</h5>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Download;
