import React from "react";
import { makeStyles } from "@material-ui/core";
import PhoneIcon from "@material-ui/icons/Phone";
import LocationOnIcon from "@material-ui/icons/LocationOn";
const useStyles = makeStyles((theme) => ({
  grid: {
    display: "grid",
    justifyContent: "center",
    marginBottom: "1rem",
    marginTop: "3rem",
  },
}));
export default function Footer() {
  const classes = useStyles();
  const year = () => {
    var d = new Date();
    return d.getFullYear();
  };
  return (
    <div id='footerW'>
      <span
        className={classes.grid}
        style={{
          textAlign: "center",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        <div>
          <PhoneIcon style={{ color: "#ccc" }} />
          <div
            style={{
              display: "inline",
              position: "relative",
              top: "-0.3rem",
              fontSize: "1.3rem",
            }}
          >
            {"  "}
            (937) 626 7732
          </div>
        </div>
        <div>
          <LocationOnIcon style={{ color: "#ccc" }} />
          <div
            style={{
              display: "inline",
              position: "relative",
              top: "-0.3rem",
              fontSize: "1.3rem",
            }}
          >
            {"  "}1 Main St. Dayton, OH 45424
          </div>
        </div>
      </span>
      <span className={classes.grid} style={{ color: "#ccc" }}>
        HM Frozen Food, LLC. {year()}
      </span>
    </div>
  );
}
