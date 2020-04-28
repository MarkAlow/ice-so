import React from "react";
import iceGrey from "../../img/2x/iceGrey.png";
import delivery from "../../img/2x/deliveryLabel.png";
import truck from "../../img/2x/truck.png";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  circle: {
    borderRadius: "50%",
    background: "#333",
    width: "1rem",
    height: "1rem",
    cursor: "pointer",
  },
}));
function Logo() {
  const classes = useStyles();

  return (
    <div>
      <div id='sliderBG' style={{ backgroundImage: `url(${iceGrey})` }}>
        <grid-container id='sliderContainer'>
          <grid-item>
            <img
              src={truck}
              alt='truck'
              id='sliderEnterAnim'
              className='sliderImage'
            ></img>
          </grid-item>
          <grid-item style={{ animationDelay: "0.2s" }}>
            <img
              src={delivery}
              alt='delivery'
              id='sliderEnterAnim'
              className='sliderImage'
            ></img>
          </grid-item>
        </grid-container>
        <div className='sliderCircle' id='sliderEnterAnim'></div>
      </div>
      <div id='logoLINE'></div>
    </div>
  );
}

export default Logo;
