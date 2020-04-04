import React, { useState, useEffect } from "react";
import axios from "axios";
import iceCream from "../../img/2x/iceCream2x.png";
import location from "../../img/2x/location2x.png";
import market from "../../img/2x/market2x.png";

export default function About() {
  const [slides, setSlides] = useState([]);
  const [id, setId] = useState(1);
  useEffect(() => {
    axios.get(`slides.json`).then(res => {
      setSlides(res.data);
    });
  });

  const setIds = e => {
    var n = e.target;
    var name =
      n.getAttribute("name") ||
      n.parentNode.getAttribute("name") ||
      n.parentNode.parentNode.getAttribute("name");
    typeof name === "undefined" || name === null
      ? console.log("Error Selecting Slides")
      : setId(name);
  };

  return (
    <div>
      <grid-containter onClick={setIds} id='aboutMenuGrid'>
        <grid-item name='1'>
          <div id='aboutCircle'>
            <img alt='' src={iceCream} />
          </div>
        </grid-item>
        <grid-item name='2'>
          <div id='aboutCircle'>
            <img alt='' src={location} />
          </div>
        </grid-item>
        <grid-item name='3'>
          <div id='aboutCircle'>
            <img alt='' src={market} />
          </div>
        </grid-item>
      </grid-containter>

      <grid-container id='aboutDisplayGrid'>
        <grid-item>
          <div className='aboutDisplay'>
            {slides
              .filter(slider => slider.id.toString() === id || slider.id === id)
              .map(slide => (
                <div key={id}>
                  {slide.description}
                  <br />
                </div>
              ))}
          </div>
        </grid-item>
      </grid-container>
    </div>
  );
}
