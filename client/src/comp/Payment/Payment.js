import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import Header from "../Main/Header";
import Logo from "../Main/Logo";
import Slider from "../Main/Slider";
function Payment(props) {
  const { name, address, cartItem } = props;
  return (
    <div>
      <Header />
      <div style={{ marginTop: "4rem" }}>
        <Logo />
        <Slider />
        <Link to='/ct'>
          <Button>Back to Checkout</Button>
        </Link>
        <h2 style={{ textAlign: "center" }}>Order for {name}</h2>
        <h4 style={{ textAlign: "center" }}>To: {address}</h4>
        <hr />${cartItem.reduce((a, c) => a + c.price * c.count, 0).toFixed(2)}
        <grid-container style={{ gridTemplateColumns: "1fr 1fr" }}>
          <grid-item>
            <Button disabled>Pay Online</Button> <br />
            <i>Currently Unavailable</i>
          </grid-item>
          <Link to='/tu'>
            <Button>Pay In Person</Button>
          </Link>
        </grid-container>
      </div>
    </div>
  );
}

export default Payment;
