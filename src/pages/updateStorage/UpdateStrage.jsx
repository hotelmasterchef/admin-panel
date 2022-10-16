import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../contextapi/Context";

const UpdateStrage = () => {
  const navigate = useNavigate();
  const { foods, menus , popularFoods,isLoggedIn } = useGlobalContext();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/admin-panel/");
    }
  }, [isLoggedIn]);
  const downloadFile = async () => {
    // json
    let myData = {
      foods: foods,
      menus: menus,
      popularFoods: popularFoods
    };
    const fileName = "data";
    const json = JSON.stringify(myData);
    const blob = new Blob([json], { type: "application/json" });
    const href = await URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <>
      <div className="app-title">
        <div>
          <h1>
            <i className="fa fa-database"></i> Update Storage
          </h1>
        </div>
        <ul className="app-breadcrumb breadcrumb">
          <li className="breadcrumb-item">
            <i className="fa fa-home fa-lg"></i>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Update Storage</a>
          </li>
        </ul>
      </div>
      <div className="tile">
        <h4>NOTE :-</h4>
        <hr />
        <ul>
          <li style={{ fontSize: "22px" }}>If you made any changes in menu table or food table, don't forget to upload the updated file.</li>
          <li style={{ fontSize: "22px" }}>Here I have attached a video please watch.</li>
          <li style={{ fontSize: "22px" }}>First download the updated file from bellow download button.</li>
          <li style={{ fontSize: "22px" }}>
            Then upload the file in bellow link.
            <br />
            <a href="https://github.com/hotelmasterchefdatabase/data/upload" target="_blank">
              Click Here
            </a>
          </li>
          <li style={{ fontSize: "22px", color: "red" }}>Don't share the above link with anyone.</li>
          <li style={{ fontSize: "22px" }}>Rename the file name to "data.json".</li>
        </ul>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button type="button" style={{ margin: "40px 20px", padding: "5px 20px" }} className="btn btn-primary" onClick={() => downloadFile()}>
            Download
          </button>
        </div>
        <video width="100%" height="500" controls>
          <source src="./Videos/video1.mp4" type="video/mp4" />
        </video>
      </div>
    </>
  );
};

export default UpdateStrage;
