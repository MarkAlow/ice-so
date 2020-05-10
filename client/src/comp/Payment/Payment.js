import React from "react";
import { Link } from "react-router-dom";
import { Button, makeStyles } from "@material-ui/core";
import Header from "../Main/Header";
import Logo from "../Main/Logo";
import LocationSearchingIcon from "@material-ui/icons/LocationSearching";
import Slider from "../Main/Slider";
const useStyles = makeStyles((theme) => ({
  padding: {
    margin: theme.spacing(1),
    padding: "1rem 2rem",
    color: "black",
  },
  pay: {
    margin: theme.spacing(2),
    padding: "1rem 8rem",
    color: "black",
    background: "orange",
  },
}));
function Payment(props) {
  const classes = useStyles();
  const { name, address, cartItem } = props;
  return (
    <div>
      <Header />
      <div style={{ marginTop: "4rem" }}>
        <Logo />
        <Slider />

        <Link to='/ct' style={{ textDecoration: "none" }}>
          <Button
            variant='contained'
            className={classes.padding}
            color='primary'
          >
            Back to Checkout
          </Button>
        </Link>
        <h2 style={{ textAlign: "center" }}>Order for {name}</h2>
        <div
          style={window.innerWidth <= 760 ? { width: "50%" } : { width: "90%" }}
        >
          <div
            id='orderLocation'
            style={
              window.innerWidth <= 760
                ? { margin: "0 auto" }
                : {
                    position: "relative",
                    width: "50%",
                    margin: "0 auto",
                  }
            }
          >
            <LocationSearchingIcon
              style={
                window.innerWidth <= 760
                  ? { display: "none" }
                  : { position: "absolute", left: "3 rem", display: "flex" }
              }
            />
            {address}

            <br />
          </div>
          <br /> <br />
          <div
            id='paymentTotal'
            style={window.innerWidth <= 760 ? { display: "none" } : null}
          >
            <h3 style={{ textAlign: "center" }}>
              ${cartItem.reduce((a, c) => a + c.price * c.count, 0).toFixed(2)}
            </h3>
          </div>
        </div>
        <grid-container style={{ gridTemplateRows: "1fr 1fr" }}>
          <grid-item>
            <Button variant='disabled' className={classes.pay} color='primary'>
              Pay Online
            </Button>{" "}
            <br />
            <i>Currently Unavailable</i>
          </grid-item>
          <Link to='/tu' style={{ textDecoration: "none" }}>
            <Button variant='contained' className={classes.pay} color='primary'>
              Pay In Person
            </Button>
          </Link>
        </grid-container>
      </div>
    </div>
  );
}

export default Payment;
