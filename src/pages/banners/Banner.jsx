import React, { useEffect, useState } from "react";
import { Button, Modal, Fade, Backdrop, TextField, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel } from "@material-ui/core";
// import { Delete, Add, Edit } from "@material-ui/icons";
import MaterialTable, { MTableToolbar } from "material-table";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useGlobalContext } from "../../contextapi/Context";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { bannerRef } from "../../config/firebase";

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
const Banner = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { foods, setAlert, setLoading, banners, setBanners, isLoggedIn } = useGlobalContext();
  // NOTE: add
  const [addModal, setAddModal] = useState(false);
  const [add_name, setAdd_name] = useState("");
  const [add_desc, setAdd_desc] = useState("");
  const [add_image, setAdd_image] = useState("");
  // NOTE: edit
  const [editModal, setEditModal] = useState({
    state: false,
    data: null,
  });
  const [edit_name, setEdit_name] = useState("");
  const [edit_desc, setEdit_desc] = useState("");
  const [edit_image, setEdit_image] = useState("");
  // const []
  // NOTE: delete
  const [deleteModal, setDeleteModal] = useState({
    state: false,
    data: null,
  });
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/admin-panel/");
    }
  }, [isLoggedIn]);
  const addFood = async () => {
    if (add_name === "" || add_desc === "" || add_image === "") {
      setAlert({
        flag: true,
        type: "error",
        msg: "Please enter all mandatory fields.",
      });
      return;
    }
    setAddModal(false);
    setLoading(true);
    let id = v4();
    bannerRef
      .doc(id)
      .set({
        _id: id,
        title: add_name,
        desc: add_desc,
        image: add_image,
      })
      .then((docs) => {
        setAlert({
          flag: true,
          type: "success",
          msg: "😄 Banner added successfully.",
        });
        setLoading(false);
        setBanners([
          ...banners,
          {
            _id: id,
            title: add_name,
            desc: add_desc,
            image: add_image,
          },
        ]);
        setAdd_name("");
        setAdd_desc("");
        setAdd_image("");
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
  const updateFood = (id) => {
    if (edit_name === "" || edit_desc === "" || edit_image === "") {
      setAlert({
        flag: true,
        type: "error",
        msg: "Please enter all mandatory fields.",
      });
      return;
    }
    setEditModal({
      state: false,
      data: null,
    });
    setLoading(true);
    bannerRef
      .doc(id)
      .update({
        title: edit_name,
        desc: edit_desc,
        image: edit_image,
      })
      .then((docs) => {
        setAlert({
          flag: true,
          type: "success",
          msg: "😄 Menu updated successfully.",
        });
        setLoading(false);
        let nowFoodIndex = banners?.findIndex((f) => f?._id === id);
        let nowFoods = banners;
        nowFoods[nowFoodIndex] = {
          _id: id,
          title: edit_name,
          desc: edit_desc,
          image: edit_image,
        };
        setBanners([...nowFoods]);
        setEdit_name("");
        setEdit_desc("");
        setEdit_image("");
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
  const deleteFood = async (id) => {
    setLoading(true);
    setDeleteModal({
      state: false,
      data: null,
    });
    bannerRef
      .doc(id)
      .delete()
      .then((docs) => {
        setAlert({
          flag: true,
          type: "success",
          msg: "😄 Banner removed successfully.",
        });
        setLoading(false);
        let nowFood = banners?.filter((f) => f?._id !== id);
        setBanners([...nowFood]);
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
            <i className="fa fa-picture-o"></i> Banners
          </h1>
        </div>
        <ul className="app-breadcrumb breadcrumb">
          <li className="breadcrumb-item">
            <i className="fa fa-home fa-lg"></i>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Banners</a>
          </li>
        </ul>
      </div>
      <MaterialTable
        title=""
        columns={[
          {
            title: "Image",
            field: "image",
            render: (rowData) => (
              <img
                alt="banner_image"
                src={rowData?.image}
                style={{
                  widht: "80px",
                  height: "50px",
                  marginLeft: "20px",
                }}
              />
            ),
          },
          {
            title: "Title",
            field: "title",
          },
          { title: "Description", field: "desc" },
        ]}
        data={banners}
        components={{
          Action: (props) => {
            switch (props?.action?.icon) {
              case "add":
                return (
                  <Button
                    onClick={(event) => props.action.onClick(event, props.data)}
                    size="small"
                    variant="contained"
                    style={{
                      textTransform: "none",
                      backgroundColor: "#009688",
                      color: "white",
                    }}
                  >
                    <i class="fa fa-plus" aria-hidden="true"></i>&nbsp;Add Banner
                  </Button>
                );
              case "edit":
                return (
                  <span
                    onClick={(event) => props.action.onClick(event, props.data)}
                    style={{
                      cursor: "pointer",
                      margin: "0 10px",
                    }}
                  >
                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                  </span>
                );
              case "delete":
                return (
                  <span
                    onClick={(event) => props.action.onClick(event, props.data)}
                    style={{
                      cursor: "pointer",
                      margin: "0 10px",
                    }}
                  >
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </span>
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
            icon: "add",
            tooltip: "Add Banner",
            isFreeAction: true,
            onClick: (event, rowData) => {
              setAddModal(true);
            },
          },
          {
            icon: "edit",
            tooltip: "Edit Banner",
            onClick: (event, rowData) => {
              setEditModal({
                state: true,
                data: rowData,
              });
              setEdit_name(rowData?.title);
              setEdit_desc(rowData?.desc);
              setEdit_image(rowData?.image);
            },
          },
          {
            icon: "delete",
            tooltip: "Delete Banner",
            onClick: (event, rowData) => {
              setDeleteModal({
                state: true,
                data: rowData?._id,
              });
            },
          },
        ]}
        options={{
          pageSize: 10,
          actionsColumnIndex: -1,
          exportButton: true,
          exportAllData: true,
          headerStyle: { fontWeight: "bold", color: "white", background: "#009688" },
        }}
      />
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
              Add Banner
            </h2>
            <div className={classes.modalForm}>
              <CssTextField
                required
                type="text"
                label="title"
                style={{ width: "100%", marginBottom: "10px" }}
                value={add_name}
                onChange={(e) => setAdd_name(e.target.value)}
              />
              <CssTextField
                required
                type="text"
                label="description"
                style={{ width: "100%", marginBottom: "10px" }}
                value={add_desc}
                onChange={(e) => setAdd_desc(e.target.value)}
              />
              <CssTextField
                required
                type="text"
                label="image"
                style={{ width: "100%", marginBottom: "10px" }}
                value={add_image}
                onChange={(e) => setAdd_image(e.target.value)}
              />
            </div>
            <div className={classes.buttonCol}>
              <Button variant="contained" onClick={() => setAddModal(false)} color="secondary">
                Cancel
              </Button>
              <Button variant="contained" className="btn_primary" onClick={() => addFood()}>
                Save
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={editModal?.state}
        onClose={() =>
          setEditModal({
            state: false,
            data: null,
          })
        }
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={editModal?.state}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title" style={{ textAlign: "center" }}>
              Edit Menu
            </h2>
            <div className={classes.modalForm}>
              <TextField
                required
                type="text"
                label="Menu Name"
                style={{ width: "100%", marginBottom: "10px" }}
                value={edit_name}
                onChange={(e) => setEdit_name(e.target.value)}
              />
              <CssTextField
                required
                type="text"
                label="description"
                style={{ width: "100%", marginBottom: "10px" }}
                value={edit_desc}
                onChange={(e) => setEdit_desc(e.target.value)}
              />
              <CssTextField
                required
                type="text"
                label="image"
                style={{ width: "100%", marginBottom: "10px" }}
                value={edit_image}
                onChange={(e) => setEdit_image(e.target.value)}
              />
            </div>
            <div className={classes.buttonCol}>
              <Button
                variant="contained"
                onClick={() =>
                  setEditModal({
                    state: false,
                    data: null,
                  })
                }
                color="secondary"
              >
                Cancel
              </Button>
              <Button variant="contained" color="primary" onClick={() => updateFood(editModal?.data?._id)}>
                Update
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={deleteModal?.state}
        onClose={() =>
          setDeleteModal({
            state: false,
            data: null,
          })
        }
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={deleteModal?.state}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title" style={{ textAlign: "center" }}>
              Delete Menu
            </h2>
            <div className={classes.modalForm}>
              <p style={{ textAlign: "center" }}>Are you sure you want to delete the menu ?</p>
            </div>
            <div className={classes.buttonCol}>
              <Button
                variant="contained"
                onClick={() =>
                  setDeleteModal({
                    state: false,
                    data: null,
                  })
                }
                color="secondary"
              >
                Cancel
              </Button>
              <Button variant="contained" className="btn_primary" onClick={() => deleteFood(deleteModal?.data)}>
                Yes
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default Banner;
