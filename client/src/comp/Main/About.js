import React, { useState, useEffect } from "react";
import axios from "axios";
import iceCream from "../../img/4x/iceCream.png";
import location from "../../img/4x/locN.png";
import market from "../../img/4x/marT.png";
import { makeStyles, Button } from "@material-ui/core";
export default function About() {
  const [slides, setSlides] = useState([]);
  const [id, setId] = useState(1);
  useEffect(() => {
    axios.get(`slides.json`).then((res) => {
      setSlides(res.data);
    });
  });
  useEffect(() => {
    setRandomIds();
  }, []);
  const useStyles = makeStyles((theme) => ({
    circle: {
      borderRadius: "50%",
      width: "5rem",
      height: "5rem",
    },
  }));
  const setRandomIds = () => {
    setInterval(() => {
      setId(Math.floor(Math.random() * 3) + 1);
    }, 5500);
  };
  const setIds = (e) => {
    var n = e.target;
    var name =
      n.getAttribute("name") ||
      n.parentNode.getAttribute("name") ||
      n.parentNode.parentNode.getAttribute("name");
    typeof name === "undefined" || name === null
      ? console.log("Error Selecting Slides")
      : setId(name);
  };

  const classes = useStyles();
  return (
    <div id='about'>
      <grid-containter onClick={setIds} id='aboutMenuGrid'>
        <grid-item name='1'>
          <Button
            name='1'
            className={classes.circle}
            variant={id.toString() === "1" ? "outlined" : null}
          >
            <img alt='' src={iceCream} style={{ width: "50%" }} />
          </Button>
        </grid-item>
        <grid-item name='2'>
          <Button
            name='2'
            className={classes.circle}
            variant={id.toString() === "2" ? "outlined" : null}
          >
            <img alt='' src={location} style={{ width: "50%" }} />
          </Button>
        </grid-item>
        <grid-item name='3'>
          <Button
            name='3'
            className={classes.circle}
            variant={id.toString() === "3" ? "outlined" : null}
          >
            <img alt='' src={market} style={{ width: "50%" }} />
          </Button>
        </grid-item>
      </grid-containter>

      <grid-container id='aboutDisplayGrid'>
        <grid-item>
          <div className='aboutDisplay'>
            {slides
              .filter(
                (slider) => slider.id.toString() === id || slider.id === id
              )
              .map((slide) => (
                <div key={id}>
                  <img
                    alt={slide.description}
                    id='aboutImage'
                    src={slide.pic}
                  />
                  <br />
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
