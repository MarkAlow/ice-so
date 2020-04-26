import React, { useEffect, useState } from "react";
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
  const [id, setId] = useState(1);
  useEffect(() => {
    setRandomIds();
  }, []);
  const setRandomIds = () => {
    setInterval(() => {
      setId(Math.floor(Math.random() * 3) + 1);
    }, 5500);
  };
  const classes = useStyles();
  const icons = (
    <grid-containter id='sliderMenuGrid'>
      <grid-item name='1'>
        <div className={classes.circle} name='1'></div>
      </grid-item>
      <grid-item name='2'>
        {" "}
        <div className={classes.circle} name='1'></div>
      </grid-item>
      <grid-item name='3'>
        {" "}
        <div className={classes.circle} name='1'></div>
      </grid-item>
    </grid-containter>
  );
  return (
    <div>
      <div id='sliderBG' style={{ backgroundImage: `url(${iceGrey})` }}>
        {" "}
        <grid-container id='sliderContainer'>
          <grid-item id='sliderEnterAnim'>
            <img src={truck} alt='truck' style={{ width: "75%" }}></img>
          </grid-item>
          <grid-item id='sliderEnterAnim' style={{ animationDelay: "0.2s" }}>
            <img src={delivery} alt='delivery' style={{ width: "75%" }}></img>
          </grid-item>
        </grid-container>
        <div
          class='sliderCircle'
          id='sliderEnterAnim'
          style={{ animationDelay: "0.3s" }}
        ></div>
      </div>
      <div id='logoLINE'></div>
    </div>
  );
}

export default Logo;
