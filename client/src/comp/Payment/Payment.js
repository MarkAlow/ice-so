import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
function Payment() {
  const [count, setCount] = useState(1);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>XX</button>
      {count}
      <h3>Order for Mark Alow</h3>
      <h4>To: 233 Main St. Dayton OH</h4>
      <hr />
      <br />
      <h5>14.89</h5>
      <grid-container style={{ gridTemplateColumns: "1fr 1fr" }}>
        <grid-item>
          <button disabled>Pay Online</button> <br />
          <i>Currently Unavailable</i>
        </grid-item>
        <Link to='/tu'>
          <grid-item>
            <button>Pay In Person</button>
          </grid-item>
        </Link>
      </grid-container>
    </div>
  );
}

export default Payment;
