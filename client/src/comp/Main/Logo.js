import React from "react";
import ICEBG from "./ICEbg";
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
              <span id='iceso'>ICE.SO</span>
            </div>
            <div
              style={{
                position: "relative",
                backgroundImage: `url(${ICEBG})`,
              }}
              id='labelTop'
            >
              <span id='iceso'>ICE.SO</span>
            </div>
          </grid-item>
        </grid-container>
      </div>
    </div>
  );
}

export default Logo;
