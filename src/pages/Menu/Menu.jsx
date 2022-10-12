import React, { useEffect, useState } from "react";
import { Button, Modal, Fade, Backdrop, TextField, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel } from "@material-ui/core";
// import { Delete, Add, Edit } from "@material-ui/icons";
import MaterialTable, { MTableToolbar } from "material-table";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useGlobalContext } from "../../contextapi/Context";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";

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
  const classes = useStyles();
  const navigate = useNavigate();
  const { foods, setAlert, setLoading ,menus, setMenus ,isLoggedIn } = useGlobalContext();
  // NOTE: add
  const [addModal, setAddModal] = useState(false);
  const [add_name, setAdd_name] = useState("");
  const [add_showInHome, setAdd_showInHome] = useState("false");
  // NOTE: edit
  const [editModal, setEditModal] = useState({
    state: false,
    data: null,
  });
  const [edit_name, setEdit_name] = useState("");
  const [edit_showInHome, setEdit_showInHome] = useState("false");
  // const []
  // NOTE: delete
  const [deleteModal, setDeleteModal] = useState({
    state: false,
    data: null,
  });;
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/admin-panel/");
    }
  }, [isLoggedIn]);
  const addFood = async () => {
    setLoading(true);
    try {
      if (add_name === "" || add_showInHome === "") {
        setAlert({
          flag: true,
          type: "error",
          msg: "Please enter all mandatory fields.",
        });
        return;
      }
      setAddModal(false);
      let id = v4();
      setMenus([
        ...menus,
        {
          _id: id,
          name: add_name,
          showInHome: add_showInHome,
        },
      ]);
      setAlert({
        flag: true,
        type: "success",
        msg: "😄 Menu added successfully.",
      });
      setLoading(false);
      setAdd_name("");
      setAdd_showInHome("");
    } catch (error) {
      console.log(error);
      setAlert({
        flag: true,
        type: "error",
        msg: "Something went wrong. Please try again.",
      });
      setLoading(false);
    }
  };
  const updateFood = (id) => {
    if (edit_name === "" || edit_showInHome === "") {
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
    try {
      let nowFoodIndex = menus?.findIndex((f) => f?._id === id);
      let nowFoods = menus;
      nowFoods[nowFoodIndex] = {
        _id: id,
        name: edit_name,
        showInHome: edit_showInHome,
      };
      setMenus([...nowFoods]);
      setLoading(false);
      setEdit_name("");
      setEdit_showInHome("");
      setAlert({
        flag: true,
        type: "success",
        msg: "😄 Menu updated successfully.",
      });
    } catch (error) {
      console.log(error);
      setAlert({
        flag: true,
        type: "error",
        msg: "Something went wrong. Please try again.",
      });
      setLoading(false);
    }
  };
  const deleteFood = async (id) => {
    setLoading(true);
    setDeleteModal({
      state: false,
      data: null,
    });
    try {
      let nowFood = menus?.filter((f) => f?._id !== id);
      setMenus([...nowFood]);
      setLoading(false);
      setAlert({
        flag: true,
        type: "success",
        msg: "😄 Food removed successfully.",
      });
    } catch (error) {
      console.log(error);
      setAlert({
        flag: true,
        type: "error",
        msg: "Something went wrong. Please try again.",
      });
      setLoading(false);
    }
  };
  return (
    <>
      <div className="app-title">
        <div>
          <h1>
            <i className="fa fa-list-alt"></i> Menus
          </h1>
        </div>
        <ul className="app-breadcrumb breadcrumb">
          <li className="breadcrumb-item">
            <i className="fa fa-home fa-lg"></i>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Menus</a>
          </li>
        </ul>
      </div>
      <MaterialTable
        title=""
        columns={[
          {
            title: "Name",
            field: "name",
          },
          { title: "Show in Home", field: "showInHome" },
          {
            title: "Total Items",
            field: "size",
            render: (rowData) => {
              let count = 0;
              foods?.map((f) => {
                if (f?.menu === rowData?.name) count++;
              });
              return <p>{count}</p>;
            },
          },
        ]}
        data={menus}
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
                    <i class="fa fa-plus" aria-hidden="true"></i>&nbsp;Add Menu
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
            tooltip: "Add Menu",
            isFreeAction: true,
            onClick: (event, rowData) => {
              setAddModal(true);
            },
          },
          {
            icon: "edit",
            tooltip: "Edit Menu",
            onClick: (event, rowData) => {
              setEditModal({
                state: true,
                data: rowData,
              });
              setEdit_name(rowData?.name);
              setEdit_showInHome(rowData?.showInHome);
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
              Add Menu
            </h2>
            <div className={classes.modalForm}>
              <CssTextField
                required
                type="text"
                label="Menu Name"
                style={{ width: "100%", marginBottom: "10px" }}
                value={add_name}
                onChange={(e) => setAdd_name(e.target.value)}
              />
              <FormControl component="fieldset" style={{ marginTop: "20px" }}>
                <FormLabel component="legend" style={{ color: "black" }}>
                  Show in Home
                </FormLabel>
                <RadioGroup aria-label="type" name="type" value={add_showInHome} onChange={(e) => setAdd_showInHome(e.target.value)}>
                  <FormControlLabel value="Yes" control={<Radio color="default" />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio color="default" />} label="No" />
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
              <FormControl component="fieldset" style={{ marginTop: "20px" }}>
                <FormLabel component="legend">Show in Home</FormLabel>
                <RadioGroup aria-label="type" name="type" value={edit_showInHome} onChange={(e) => setEdit_showInHome(e.target.value)}>
                  <FormControlLabel value="Yes" control={<Radio color="primary" />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio color="primary" />} label="No" />
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

export default Index;
