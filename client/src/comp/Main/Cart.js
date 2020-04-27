import React from "react";
import { Link } from "react-router-dom";
import {
  makeStyles,
  Button,
  Backdrop,
  Modal,
  Fade,
  TextField,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
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

export default function Cart(props) {
  const classes = useStyles();
  const {
    open,
    handleClose,
    cartItem,
    handleRemoveFromCart,
    handleChangeAmountInCart,
  } = props;

  return (
    <div id='cartBody'>
      <Modal
        aria-labelledby='Cart'
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
            <h2 id='transition-modal-title'>
              {cartItem.length > 0 ? "Your Order" : "Cart is empty"}
            </h2>
            {cartItem.map((item) => (
              <grid-container key={item.id} id='cartItem'>
                <grid-item>
                  <img
                    src={item.pic}
                    alt={item.name}
                    style={{ width: "3rem" }}
                  ></img>
                </grid-item>
                <grid-item>
                  <span>{item.name}</span>
                </grid-item>
                <grid-item>
                  <TextField
                    defaultValue={item.count}
                    variant='outlined'
                    onChange={(e) => handleChangeAmountInCart(e, item)}
                    size='small'
                  ></TextField>
                </grid-item>
                <grid-item>
                  <span>${(item.price * item.count).toFixed(2)}</span>
                </grid-item>
                <grid-item>
                  <DeleteIcon
                    onClick={(e) => handleRemoveFromCart(e, item)}
                    fontSize='small'
                  />
                </grid-item>
              </grid-container>
            ))}
            <div style={{ float: "right" }}>
              <span>Total:</span>
              <span>
                $
                {cartItem.reduce((a, c) => a + c.price * c.count, 0).toFixed(2)}
              </span>
            </div>
            <br /> <br />
            <Link to='/ct' style={{ textDecoration: "none" }}>
              {cartItem.length > 0 && (
                <Button
                  style={{ background: "#f2d68b", borderRadius: "1rem" }}
                  color='primary'
                  className={classes.margin}
                  type='button'
                >
                  Check Out
                </Button>
              )}
            </Link>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
