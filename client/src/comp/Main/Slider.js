import React from "react";
import iceGrey from "../../img/2x/iceGrey.png";
import delivery from "../../img/2x/deliveryLabel.png";
import business from "../../img/2x/busInq.png";
import truck from "../../img/2x/truck.png";

function Logo() {
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
              src={
                window.location.href.includes("business") ? business : delivery
              }
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
