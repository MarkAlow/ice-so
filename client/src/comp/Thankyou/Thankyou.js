import React from "react";
import { Link } from "react-router-dom";
import { Button, makeStyles } from "@material-ui/core";
import PhoneIcon from "@material-ui/icons/Phone";
import Header from "../Main/Header";
import Footer from "../Main/Footer";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    padding: "1rem 2rem",
    color: "black",
  },
  weight: {
    fontWeight: "300",
  },
}));

export default function Pay(props) {
  const { formatPhoneNumber, phone } = props;
  const classes = useStyles();
  return (
    <div>
      <Header />
      <div id='thankYouWrap'>
        <h1>THANK YOU!</h1>
        <div id='thankYou'>
          <h3>Your Order has been submitted.</h3>
          <p>
            We will give you a call at
            <span style={{ color: "#f2e477" }}>
              {formatPhoneNumber(phone)}
            </span>{" "}
            from
          </p>

          <h2>
            <PhoneIcon style={{ color: "#ccc" }} />
            <div
              style={{
                display: "inline",
                position: "relative",
                top: "-0.3rem",
              }}
            >
              (937) 626 7732
            </div>
          </h2>
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
      </div>
      <Footer />
    </div>
  );
}
