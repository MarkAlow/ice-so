import React from "react";
import { Link } from "react-router-dom";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
    padding: "1rem 2rem",
    color: "black"
  }
}));

export default function Pay() {
  const classes = useStyles();
  return (
    <div>
      <h1>THANK YOU!</h1>
      <h3>Your Order has been submitted.</h3>
      <h5>We will give you a call at from</h5>
      <h2>937 546 7777</h2>
      <Link to='/' style={{ textDecoration: "none" }}>
        <Button
          style={{ background: "#eee", borderRadius: "1rem" }}
          color='primary'
          className={classes.margin}
          type='button'
        >
          Back To Store
        </Button>
      </Link>
    </div>
  );
}
