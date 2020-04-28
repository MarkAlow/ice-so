import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Products from "./Products";
import Cart from "./Cart";
import Logo from "./Logo";
import Slider from "./Slider";
import { makeStyles, Button } from "@material-ui/core";
import Basket from "../../img/4x/carT.png";
import Truck from "../../img/2x/truck2x.png";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    padding: "1rem 2rem",
    color: "black",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "40%",
    left: 0,
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
    cartCounter,
    total,
    countr,
    handleSubtractOneFromCart,
    handleChangeAmountInCart,
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

  // !! Fix the cart total ondelete
  // React.useEffect(() => {
  //   console.log("used");
  // }, [open]);
  const cartButton = (
    <Button
      style={{
        background: "#fff",
        borderRadius: "1rem",
        position: "fixed",
        top: 0,
        zIndex: 1100,
        right: 0,
        border: "1px solid #ccc",
      }}
      color='primary'
      className={classes.margin}
      type='button'
      onClick={handleOpen}
    >
      <img
        src={Basket}
        alt='Cart'
        style={{ marginRight: "1rem", width: "15%" }}
      />
      <span style={{ fontFamily: "Cubano" }}>Cart &nbsp; ${total}</span>
    </Button>
  );
  return (
    <div style={{ marginTop: "3rem" }}>
      <div>
        <br />
        <Header />
        {/* Cart */}
        {cartButton}
        <Cart
          open={open}
          handleClose={handleClose}
          cartItem={cartItem}
          handleRemoveFromCart={handleRemoveFromCart}
          handleChangeAmountInCart={handleChangeAmountInCart}
          total={total}
        />
      </div>
      <br />
      <div>
        <Logo />
        <Slider />
      </div>
      <div id='mainFlexWrapper'>
        <br />
        <div id='orderWrapper'>
          <div id='orderLine'>
            <div id='orderCircle'>
              <img src={Truck} alt='Order' id='orderImage'></img>
            </div>
          </div>
        </div>
        <br />
        <Products
          iceCreams={iceCreams}
          handleAddToCart={handleAddToCart}
          handleSubtractOneFromCart={handleSubtractOneFromCart}
          handleChangeAmountInCart={handleChangeAmountInCart}
          cartItem={cartItem}
          cartCounter={cartCounter}
          countr={countr}
          sort={sort}
          handleSortChange={handleSortChange}
        />
      </div>
      <Footer />
    </div>
  );
}

export default Main;
