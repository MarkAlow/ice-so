import React from "react";
import { makeStyles, Backdrop, Modal, Fade } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    borderRadius: "1rem",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  margin: {
    margin: theme.spacing(1),
    padding: "1rem 2rem",
    color: "black",
  },
}));

export default function Info(props) {
  const classes = useStyles();
  const { open, handleClose, src } = props;

  return (
    <div id='cartBody'>
      <Modal
        aria-labelledby='Info'
        aria-describedby='Your Order:'
        className={classes.modal}
        id='cartModal'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <img src={src} alt='ice cream' />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
