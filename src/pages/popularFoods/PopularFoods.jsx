import React, { useState , useEffect } from "react";
import { useGlobalContext } from "../../contextapi/Context";
import {Modal, Fade, Backdrop, TextField } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { settings } from "../../config/firebase";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    borderRadius: "10px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modalForm: {
    width: "400px",
  },
  buttonCol: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-evenly",
  },
}));
const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#009688",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#009688",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#009688",
      },
      "&:hover fieldset": {
        borderColor: "#009688",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#009688",
      },
    },
  },
})(TextField);
const PopularFoods = () => {
  const classes = useStyles();
  const { popularFoods, setPopularFoods, foods, setLoading, setAlert } = useGlobalContext();
  const [addModal, setAddModal] = useState(false);
  const savePopularFoodList = () => {
    setAddModal(false);
    setLoading(true);
    settings
      .doc("popularFoods")
      .set({
        data: popularFoods,
      })
      .then((docs) => {
        setAlert({
          flag: true,
          type: "success",
          msg: "😄 Popular foods updated successfully.",
        });
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
            <i className="fa fa-circle-o"></i> Popular Foods
          </h1>
        </div>
        <ul className="app-breadcrumb breadcrumb">
          <li className="breadcrumb-item">
            <i className="fa fa-home fa-lg"></i>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Popular Foods</a>
          </li>
        </ul>
      </div>
      <div className="tile">
        <div className="row">
          {popularFoods?.map((p) => {
            let food = foods?.filter((f) => f?._id === p);
            if (food?.length > 0) {
              return (
                <div className="col-md-3  p-4 text-center cp ">
                  <img src={food[0]?.image} alt="fdas" style={{ height: "50px" }} />
                  {food[0]?.name}
                  <i
                    class="fa fa-times text-danger cp"
                    aria-hidden="true"
                    onClick={() => {
                      let nowPopulars = popularFoods?.filter((p) => p !== food[0]?._id);
                      setPopularFoods([...nowPopulars]);
                    }}
                  ></i>
                </div>
              );
            }
          })}
          {popularFoods?.length === 0 ? (
            <div className="d-flex justify-content-center align-items-center text-center p-md-5 p-1 w-100">No food selected as popular food</div>
          ) : null}
        </div>
        <div className="mt-5 d-flex justify-content-center">
          <button type="button" className="btn btn-primary mr-3" onClick={() => setAddModal(true)}>
            Add New
          </button>
          <button type="button" className="btn btn-primary ml-3" onClick={() => savePopularFoodList()}>
            Save
          </button>
        </div>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={addModal}
        onClose={() => setAddModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={addModal}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title" style={{ textAlign: "center" }}>
              Update Popular Food
            </h2>
            <div className={classes.modalForm}>
              <div
                style={{
                  maxHeight: "50vh",
                  overflow: "auto",
                }}
              >
                {foods?.map((f) => {
                  if (!popularFoods?.includes(f?._id)) {
                    return (
                      <div className="d-flex justify-content-between ">
                        <p>{f?.name}</p>
                        <i class="fa fa-check text-success cp mr-3" aria-hidden="true" onClick={() => setPopularFoods([...popularFoods, f?._id])}></i>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default PopularFoods;
