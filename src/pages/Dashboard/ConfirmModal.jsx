import { Backdrop, Button, Fade, Modal } from "@material-ui/core";
import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";

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
const ConfirmModal = ({ isOpen, handleClose, msg, handleConfirm, mode, type, data }) => {
  const classes = useStyles();
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <div className={classes.paper}>
          <h2 id="transition-modal-title" style={{ textAlign: "center" }}>
            Please Confirm
          </h2>
          <div className={classes.modalForm}>
            <h5
              style={{
                textAlign: "center",
                margin: "10px 0px",
              }}
            >
              {msg}
            </h5>
          </div>
          <div className={classes.buttonCol}>
            <Button variant="contained" onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button variant="contained" className="btn_primary" onClick={() => handleConfirm(mode, type, data)}>
              Confirm
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default ConfirmModal;
