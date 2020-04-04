import React from "react";
import SVG from "./SVGMainLogo";
import { makeStyles, Button } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  margin: {
    padding: "1rem 2rem",
    color: "black"
  }
}));
export default function Header() {
  const classes = useStyles();

  return (
    <div>
      <grid-container id='headerMenu'>
        <SVG style={{ cursor: "pointer" }} />
        <grid-item>
          <Button
            style={{
              background: "#f2d68b",
              borderRadius: "1rem",
              marginTop: "-0.8rem"
            }}
            color='primary'
            className={classes.margin}
            type='button'
          >
            Order
          </Button>
        </grid-item>
        <grid-item>Locations</grid-item>
        <grid-item>About</grid-item>
      </grid-container>
      <br />
    </div>
  );
}
