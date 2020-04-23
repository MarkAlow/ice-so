import React from "react";
import ICEBG from "./ICEbg";
import ILogo from "../../img/2x/iii.png";
import BG from "../../img/2x/iceBg.png";
function Logo() {
  return (
    <div>
      <div
        id='logoBG'
        style={{ backgroundImage: `url(${BG})`, opacity: "0.37" }}
      ></div>

      <div id='logoW'>
        <grid-container id='logoWrapper'>
          <grid-item>
            <div
              style={{
                backgroundImage: `url(${ICEBG}) repeat`,
                position: "absolute",
                marginLeft: "0.2rem",
                marginTop: "0.2rem",
              }}
              id='labelBottom'
            >
              <span id='daytons'>DAYTON'S</span>
              <br />
              <span id='best'>BEST</span>
            </div>
            <div
              style={{
                position: "relative",
                backgroundImage: `url(${ICEBG})`,
              }}
              id='labelTop'
            >
              <span id='daytons'>DAYTON'S</span>
              <br />
              <span id='best'>BEST</span>
            </div>
          </grid-item>
          <grid-item id='iii'>
            <img src={ILogo} alt='Order' id='orderImage' />
          </grid-item>
        </grid-container>
      </div>
      <div id='logoLINE'></div>
    </div>
  );
}

export default Logo;
