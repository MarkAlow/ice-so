import React, { useState, useEffect } from "react";
import Header from "./Header";
import Checkout from "../Checkout/Checkout";
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
  Select
} from "@material-ui/core";
import Basket from "../../img/1x/cart.png";
import axios from "axios";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
    padding: "1rem 2rem",
    color: "black"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));
// MAIN FUNCTION (HOME PAGE)
function Main() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [cartItem, setCartItem] = useState([]);
  const [sort, setSort] = useState("");
  // MODAL FUNCTIONS
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // ADDRESS SUGGESTION + ADDRESS SET FUNCTIONS
  const handleAddressSuggestions = async addressValue => {
    const results = await geocodeByAddress(addressValue);
    const latLng = await getLatLng(results[0]);
    setAddress(addressValue);
    setCoordinates(latLng);
  };

  // SUBMITTING THE CUSTOMER INFORMATION
  const onSubmit = () => {
    const customer = {
      orderId: makeId(5),
      name: name,
      phone: phone,
      address: address,
      date: Date.now(),
      lat: Number(coordinates.lat),
      lng: Number(coordinates.lng),
      closed: false,
      wrongAddress: false,
      noPayment: false,
      otherReport: false
    };
    console.log(customer);
    axios
      .post("http://localhost:5000/api/customer", customer)
      .then(res => console.log(res.data))
      .catch(err => console.log("Error! - " + err));
  };
  // START ICE CREAM CART
  const [iceCreams, setIceCreams] = useState([]);
  useEffect(() => {
    axios.get(`ice.json`).then(res => {
      setIceCreams(res.data);
    });
  }, []);

  const handleAddToCart = (e, product) => {
    let productAlreadyInCart = false;

    cartItem.forEach(item => {
      if (item.id === product.id) {
        item.count += 1;
        productAlreadyInCart = true;
      }
    });

    if (!productAlreadyInCart) {
      cartItem.push({ ...product, count: 1 });
    }
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
    return { cartItem };
  };

  const handleRemoveFromCart = (e, product) => {
    console.log("Removed " + product.id);
    setCartItem(cartItem.filter(a => a.id !== product.id));
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
    return cartItem;
  };

  // END ICE CREAM CART

  // ORDER ID GENERATOR
  const makeId = length => {
    var result = "";
    var characters = "ACEFGHIJKLMOPRSTUVZ";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  // SORT ICE CREAMS

  const listProducts = () => {
    if (sort !== "") {
      iceCreams.sort((a, b) =>
        sort === "lowestprice"
          ? a.price < b.price
            ? 1
            : -1
          : a.price > b.price
          ? 1
          : -1
      );
    } else {
      iceCreams.sort((a, b) => (a.id > b.id ? 1 : -1));
    }
  };
  const handleSortChange = e => {
    setSort(e.target.value);
    listProducts();
  };

  return (
    <div style={{ marginTop: "3rem" }}>
      <Checkout
        handleAddressSuggestions={handleAddressSuggestions}
        coordinates={coordinates}
        setPhone={setPhone}
        setName={setName}
        address={address}
        setAddress={setAddress}
        onSubmit={onSubmit}
      />
      <div>
        <br />
        <Button
          style={{
            background: "#eee",
            borderRadius: "1rem",
            position: "fixed",
            top: 0,
            right: 0,
            zIndex: 999,
            border: "1px solid #ccc"
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
          handleRemoveFromCart={handleRemoveFromCart}
        />
      </div>
      <Header />
      <br />
      <div
        style={{
          backgroundImage: `url(${ICEBG}) repeat`,
          position: "absolute",
          marginLeft: "0.2rem",
          marginTop: "0.2rem",
          color: "#675f68"
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
          color: "#f2d68b"
        }}
      >
        <span id='daytons'>DAYTON'S</span>
        <br />
        <span id='best'>BEST</span>
      </div>
      <br />
      <About />
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
      <Products iceCreams={iceCreams} handleAddToCart={handleAddToCart} />
      <Footer />
    </div>
  );
}

export default Main;
