import React, { useState } from "react";
import Header from "./Header";
import About from "./About";
import Footer from "./Footer";
import Products from "./Products";
import Cart from "./Cart";
import ICEBG from "./ICEbg";
import {
  makeStyles,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import Basket from "../../img/1x/cart.png";
import Truck from "../../img/1x/truck.png";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    padding: "1rem 2rem",
    color: "black",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
// MAIN FUNCTION (HOME PAGE)
function Main(props) {
  const {
    iceCreams,
    cartItem,
    handleAddToCart,
    handleRemoveFromCart,
    handleSortChange,
    sort,
    productCount,
    changeCount,
    slides,
  } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  // MODAL FUNCTIONS
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ marginTop: "3rem" }}>
      <div>
        <br />
        {/* Cart */}
        <Button
          style={{
            background: "#eee",
            borderRadius: "1rem",
            position: "fixed",
            top: 0,
            right: 0,
            zIndex: 999,
            border: "1px solid #ccc",
          }}
          color='primary'
          className={classes.margin}
          type='button'
          onClick={handleOpen}
        >
          <img src={Basket} alt='Cart' style={{ marginRight: "1rem" }} /> Cart{" "}
          <span>
            &nbsp; $
            {cartItem.reduce((a, c) => a + c.price * c.count, 0).toFixed(2)}
          </span>
        </Button>

        <Cart
          open={open}
          handleClose={handleClose}
          cartItem={cartItem}
          changeCount={changeCount}
          handleRemoveFromCart={handleRemoveFromCart}
        />
      </div>
      <br />
      <div id='logoWrapper'>
        <div
          style={{
            backgroundImage: `url(${ICEBG}) repeat`,
            position: "absolute",
            marginLeft: "0.2rem",
            marginTop: "0.2rem",
            color: "#675f68",
          }}
        >
          <span id='daytons'>DAYTON'S</span>
          <br />
          <span id='best'>BEST</span>
        </div>
        <div
          style={{
            position: "relative",
            backgroundImage: `url(${ICEBG})`,
            color: "#f2d68b",
          }}
        >
          <span id='daytons'>DAYTON'S</span>
          <br />
          <span id='best'>BEST</span>
        </div>
      </div>
      <br />
      <About slides={slides} />
      <br />
      <div id='orderWrapper'>
        <div id='orderLine'>
          <div id='orderCircle'>
            <img src={Truck} alt='Order' id='orderImage'></img>
          </div>
        </div>
      </div>
      <br />
      <FormControl variant='outlined' className={classes.formControl}>
        <InputLabel id='demo-simple-select-outlined-label'>Sort By</InputLabel>
        <Select
          labelId='demo-simple-select-outlined-label'
          id='demo-simple-select-outlined'
          value={sort}
          onChange={handleSortChange}
          label='Sort By'
        >
          <MenuItem value={"popularity"} disabled>
            Popularity
          </MenuItem>
          <MenuItem value={"lowestprice"}>Lowest Price</MenuItem>
          <MenuItem value={"highestprice"}>Highest Price</MenuItem>
        </Select>
      </FormControl>
      <Products
        iceCreams={iceCreams}
        handleAddToCart={handleAddToCart}
        cartItem={cartItem}
        productCount={productCount}
      />
      <Header />
      <Footer />
    </div>
  );
}

export default Main;
