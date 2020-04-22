import React from "react";
import ICEBG from "./ICEbg";
import ILogo from "../../img/2x/iii.png";

function Logo() {
  return (
    <div id='logoW'>
      <grid-container id='logoWrapper'>
        <grid-item>
          <div
            style={{
              backgroundImage: `url(${ICEBG}) repeat`,
              position: "absolute",
              marginLeft: "0.2rem",
              marginTop: "0.2rem",
              color: "#675f68",
            }}
          >
            <span id='daytons'>DAYTON'S</span>
            <br />
            <span id='best'>BEST</span>
          </div>
          <div
            style={{
              position: "relative",
              backgroundImage: `url(${ICEBG})`,
              color: "#f2d68b",
            }}
          >
            <span id='daytons'>DAYTON'S</span>
            <br />
            <span id='best'>BEST</span>
          </div>
        </grid-item>
        <grid-item id='iii'>
          <img src={ILogo} alt='Order' id='orderImage'></img>
        </grid-item>
      </grid-container>
    </div>
  );
}

export default Logo;
