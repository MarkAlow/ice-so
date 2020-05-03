import React from "react";
import { Link } from "react-router-dom";
import { Button, TextField, makeStyles } from "@material-ui/core";
import PhoneIcon from "@material-ui/icons/Phone";
import Header from "./Header";
import Footer from "./Footer";
import Slider from "./Slider";

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
  const {
    onBusiness,
    name,
    phone,
    email,
    message,
    setName,
    setPhone,
    setMessage,
    setEmail,
    formatPhoneNumber,
  } = props;
  const classes = useStyles();
  return (
    <div>
      <br />
      <br />
      <br />
      <Slider />
      <div id='thankYouWrap'>
        <h1>Business Inquiries</h1>
        <br />
        <div id='thankYou'>
          <h3>For business please call</h3>
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
          <br /> <br />
          <h6>Or message us</h6>
          <TextField
            variant='outlined'
            label='Your or Company Name'
            name={name}
            onChange={(e) => setName(e.target.value)}
          ></TextField>
          <br /> <br />
          <TextField
            variant='outlined'
            label='Your or Company Phone'
            phone={phone}
            value={formatPhoneNumber(phone)}
            onChange={(e) => setPhone(e.target.value)}
          ></TextField>
          <br /> <br />
          <TextField
            variant='outlined'
            label='Your or Company Email'
            email={email}
            onChange={(e) => setEmail(e.target.value)}
          ></TextField>
          <br /> <br />
          <TextField
            variant='outlined'
            label='Message'
            multiline
            message={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
          ></TextField>
          <br />
          <br />
          <Button
            onClick={onBusiness}
            style={{
              background: "#ed2c44",
              color: "white",
              padding: "1rem 3rem",
            }}
          >
            Send
          </Button>
          <br />
          <br />
        </div>
      </div>
      <br />
      <br />
      <Header />

      <Footer />
    </div>
  );
}
