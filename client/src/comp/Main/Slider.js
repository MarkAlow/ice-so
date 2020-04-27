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
  const icons = (
    <grid-containter id='sliderMenuGrid'>
      <grid-item name='1'>
        <div className={classes.circle} name='1'></div>
      </grid-item>
      <grid-item name='2'>
        <div className={classes.circle} name='1'></div>
      </grid-item>
      <grid-item name='3'>
        <div className={classes.circle} name='1'></div>
      </grid-item>
    </grid-containter>
  );
  return (
    <div>
      <div id='sliderBG' style={{ backgroundImage: `url(${iceGrey})` }}>
        <grid-container id='sliderContainer'>
          <grid-item id='sliderEnterAnim'>
            <img src={truck} alt='truck' id='sliderImage'></img>
          </grid-item>
          <grid-item id='sliderEnterAnim' style={{ animationDelay: "0.2s" }}>
            <img src={delivery} alt='delivery' id='sliderImage'></img>
          </grid-item>
        </grid-container>
        <div
          className='sliderCircle'
          id='sliderEnterAnim'
          style={{ animationDelay: "0.3s" }}
        ></div>
      </div>
      <div id='logoLINE'></div>
    </div>
  );
}

export default Logo;
