import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Fade,
  Backdrop,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  MenuItem,
  InputLabel,
  Input,
  InputAdornment,
} from "@material-ui/core";
// import { Delete, Add, Edit } from "@material-ui/icons";
import MaterialTable, { MTableToolbar } from "material-table";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useGlobalContext } from "../../contextapi/Context";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";
import SecureLS from "secure-ls";
import { foodsRef, settings } from "../../config/firebase";

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
const Index = () => {
  var ls = new SecureLS({ encodingType: "aes" });
  const classes = useStyles();
  const navigate = useNavigate();
  const { foods, setFoods, setAlert, setLoading, menus, isLoggedIn } = useGlobalContext();
  // NOTE: add
  const [addModal, setAddModal] = useState(false);
  const [add_name, setAdd_name] = useState("");
  const [add_url, setAdd_url] = useState("");
  const [add_menu, setAdd_menu] = useState("");
  const [add_type, setAdd_type] = useState("");
  const [add_price, setAdd_price] = useState("");
  // NOTE: edit
  const [editModal, setEditModal] = useState({
    state: false,
    data: null,
  });
  const [edit_name, setEdit_name] = useState("");
  const [edit_url, setEdit_url] = useState("");
  const [edit_menu, setEdit_menu] = useState("");
  const [edit_type, setEdit_type] = useState("");
  const [edit_price, setEdit_price] = useState("");
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
    settings
      .doc("popularFoods")
      .set({
        data: ["e", "2"],
      })
      .then((docs) => {});
  }, [isLoggedIn]);
  const addFood = async () => {
    if (add_name === "" || add_url === "" || add_type === "" || add_price === "" || add_menu === "") {
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
    foodsRef
      .doc(id)
      .set({
        _id: id,
        name: add_name,
        image: add_url,
        size: add_type,
        price: add_price,
        menu: add_menu,
      })
      .then((docs) => {
        setAlert({
          flag: true,
          type: "success",
          msg: "😄 Food added successfully.",
        });
        setLoading(false);
        setFoods([
          ...foods,
          {
            _id: id,
            name: add_name,
            image: add_url,
            size: add_type,
            price: add_price,
            menu: add_menu,
          },
        ]);
        setAdd_name("");
        setAdd_url("");
        setAdd_type("");
        setAdd_price("");
        setAdd_menu("");
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
    if (edit_name === "" || edit_url === "" || edit_type === "" || edit_price === "" || edit_menu === "") {
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
    foodsRef
      .doc(id)
      .update({
        name: edit_name,
        image: edit_url,
        size: edit_type,
        price: edit_price,
        menu: edit_menu,
      })
      .then((docs) => {
        setAlert({
          flag: true,
          type: "success",
          msg: "😄 Food updated successfully.",
        });
        setLoading(false);
        let nowFoodIndex = foods?.findIndex((f) => f?._id === id);
        console.log(nowFoodIndex);
        let nowFoods = foods;
        nowFoods[nowFoodIndex] = {
          _id: id,
          name: edit_name,
          image: edit_url,
          size: edit_type,
          price: edit_price,
          menu: edit_menu,
        };
        setFoods([...nowFoods]);
        setEdit_name("");
        setEdit_url("");
        setEdit_type("");
        setEdit_price("");
        setEdit_menu("");
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
    foodsRef
      .doc(id)
      .delete()
      .then((docs) => {
        setAlert({
          flag: true,
          type: "success",
          msg: "😄 Food removed successfully.",
        });
        setLoading(false);
        let nowFood = foods?.filter((f) => f?._id !== id);
        setFoods([...nowFood]);
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
            <i className="fa fa-cutlery"></i> Foods
          </h1>
        </div>
        <ul className="app-breadcrumb breadcrumb">
          <li className="breadcrumb-item">
            <i className="fa fa-home fa-lg"></i>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Foods</a>
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
                alt="food_image"
                src={rowData?.image}
                style={{
                  widht: "50px",
                  height: "50px",
                  marginLeft: "20px",
                }}
              />
            ),
          },
          { title: "Name", field: "name" },
          {
            title: "Menu",
            field: "menu",
            render: (rowData) => {
              let menuF = menus?.filter((m) => m?._id === rowData?.menu);
              let v = "";
              if (menuF?.length > 0) v = menuF[0]?.name;
              return <p>{v}</p>;
            },
          },
          { title: "Size", field: "size" },
          { title: "Price", field: "price" },
        ]}
        data={foods}
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
                    <i class="fa fa-plus" aria-hidden="true"></i>&nbsp;Add Food
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
            tooltip: "Add Food",
            isFreeAction: true,
            onClick: (event, rowData) => {
              setAddModal(true);
            },
          },
          {
            icon: "edit",
            tooltip: "Edit Food",
            onClick: (event, rowData) => {
              setEditModal({
                state: true,
                data: rowData,
              });
              setEdit_name(rowData?.name);
              setEdit_url(rowData?.image);
              setEdit_type(rowData?.size);
              setEdit_price(rowData?.price);
              setEdit_menu(rowData?.menu);
            },
          },
          {
            icon: "delete",
            tooltip: "Delete Food",
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
              Add Food
            </h2>
            <div className={classes.modalForm}>
              <CssTextField
                required
                type="text"
                label="Food Name"
                style={{ width: "100%", marginBottom: "10px" }}
                value={add_name}
                onChange={(e) => setAdd_name(e.target.value)}
              />
              <CssTextField
                required
                type="text"
                label="Image URL"
                style={{ width: "100%", marginBottom: "20px" }}
                value={add_url}
                onChange={(e) => setAdd_url(e.target.value)}
              />
              <CssTextField
                style={{ width: "100%", margin: "0px 0px 20px 0px" }}
                id="standard-select-menu"
                select
                label="Select Menu"
                value={add_menu}
                onChange={(e) => setAdd_menu(e.target.value)}
              >
                {menus.map((option) => (
                  <MenuItem key={option?._id} value={option?._id}>
                    {option.name}
                  </MenuItem>
                ))}
                <MenuItem key={"none"} value={"None"}>
                  None
                </MenuItem>
              </CssTextField>
              <FormControl fullWidth className={classes.margin}>
                <InputLabel htmlFor="standard-adornment-amount" style={{ color: "black" }}>
                  Price
                </InputLabel>
                <Input
                  id="standard-adornment-amount"
                  value={add_price}
                  onChange={(e) => setAdd_price(e.target.value.replace(/[^0-9]/g, ""))}
                  startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                />
              </FormControl>
              <FormControl component="fieldset" style={{ marginTop: "20px" }}>
                <FormLabel component="legend" style={{ color: "black" }}>
                  Size
                </FormLabel>
                <RadioGroup aria-label="type" name="type" value={add_type} onChange={(e) => setAdd_type(e.target.value)}>
                  <FormControlLabel value="Half" control={<Radio color="default" />} label="Half" />
                  <FormControlLabel value="Full" control={<Radio color="default" />} label="Full" />
                </RadioGroup>
              </FormControl>
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
              Edit Food
            </h2>
            <div className={classes.modalForm}>
              <CssTextField
                required
                type="text"
                label="Food Name"
                style={{ width: "100%", marginBottom: "10px" }}
                value={edit_name}
                onChange={(e) => setEdit_name(e.target.value)}
              />
              <CssTextField
                required
                type="text"
                label="Image URL"
                style={{ width: "100%", marginBottom: "20px" }}
                value={edit_url}
                onChange={(e) => setEdit_url(e.target.value)}
              />

              <CssTextField
                style={{ width: "100%", marginBottom: "20px" }}
                id="standard-select-menu"
                select
                label="Select Menu"
                value={edit_menu}
                onChange={(e) => setEdit_menu(e.target.value)}
                helperText="Please select menu"
              >
                {menus.map((option) => (
                  <MenuItem key={option?._id} value={option?._id}>
                    {option.name}
                  </MenuItem>
                ))}
                <MenuItem key={"none"} value={"None"}>
                  None
                </MenuItem>
              </CssTextField>
              <FormControl fullWidth className={classes.margin}>
                <InputLabel htmlFor="standard-adornment-amount" style={{ color: "black" }}>
                  Price
                </InputLabel>
                <Input
                  id="standard-adornment-amount"
                  value={edit_price}
                  onChange={(e) => setEdit_price(e.target.value.replace(/[^0-9]/g, ""))}
                  startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                />
              </FormControl>
              <FormControl component="fieldset" style={{ marginTop: "20px" }}>
                <FormLabel component="legend" style={{ color: "black" }}>
                  Size
                </FormLabel>
                <RadioGroup aria-label="type" name="type" value={edit_type} onChange={(e) => setEdit_type(e.target.value)}>
                  <FormControlLabel value="Half" control={<Radio color="default" />} label="Half" />
                  <FormControlLabel value="Full" control={<Radio color="default" />} label="Full" />
                </RadioGroup>
              </FormControl>
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
              Delete Food
            </h2>
            <div className={classes.modalForm}>
              <p style={{ textAlign: "center" }}>Are you sure you want to delete the food ?</p>
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
              <Button variant="contained" color="primary" onClick={() => deleteFood(deleteModal?.data)}>
                Yes
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default Index;
