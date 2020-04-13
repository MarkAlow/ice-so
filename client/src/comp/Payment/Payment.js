import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
function Payment(props) {
  const { name, address, cartItem } = props;
  return (
    <div>
      <h3>Order for {name}</h3>
      <h4>To: {address}</h4>
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
  );
}

export default Payment;
