import React, { useState, useEffect } from "react";
import axios from "axios";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import Main from "./comp/Main/Main";
import Checkout from "./comp/Checkout/Checkout";
import Thankyou from "./comp/Thankyou/Thankyou";
import Payment from "./comp/Payment/Payment";
import Orders from "./comp/OrderList/Orders";
import Business from "./comp/Main/Business";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
function App() {
  // -- CUSTOMER STATE
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [sort, setSort] = useState("");
  const [sent, setSent] = React.useState(false);
  //-- CART STATE
  const [cartItem, setCartItem] = useState([]);
  // ADDRESS SUGGESTION + ADDRESS SET FUNCTIONS
  const handleAddressSuggestions = async (addressValue) => {
    const results = await geocodeByAddress(addressValue);
    const latLng = await getLatLng(results[0]);
    setAddress(addressValue);
    setCoordinates(latLng);
  };

  // ORDER ID GENERATOR
  const makeId = (length) => {
    var result = "";
    var characters = "ACEFGHIJKLMOPRSTUVZ";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
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
      otherReport: false,
      iceCreams: cartItem,
    };
    console.log(customer);
    let base;
    window.location.hostname !== "localhost"
      ? (base = "/")
      : (base = "http://localhost:5000/");
    axios
      .post(base + "api/customer", customer)
      .then((res) => console.log(res.data))
      .catch((err) => console.log("Error! - " + err));
  };

  // SUBMITTING THE BUSINESS INFORMATION
  const onBusiness = () => {
    const business = {
      requestId: makeId(4),
      name: name,
      phone: phone,
      email: email,
      message: message,
    };
    console.log(business);
    let base;
    window.location.hostname !== "localhost"
      ? (base = "/")
      : (base = "http://localhost:5000/");
    axios
      .post(base + "api/business", business)
      .then((res) => console.log(res.data))
      .then(setSent(true))
      .catch((err) => setSent(err));
  };
  var cartLocal = JSON.parse(localStorage.getItem("cartItem"));
  const [iceCreams, setIceCreams] = useState([]);

  // START ICE CREAM CART
  const handleAddToCart = (e, product) => {
    let productAlreadyInCart = false;
    cartItem.forEach((item) => {
      if (item.id === product.id) {
        item.count += 1;
        productAlreadyInCart = true;
        // console.log(` ${product.name} count: ${item.count}`);
      }
    });

    if (!productAlreadyInCart) {
      cartItem.push({ ...product, count: 1 });
    }
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
    cartButtonTotal();
    return { cartItem };
  };
  const handleSubtractOneFromCart = (e, product) => {
    cartItem.forEach((item) => {
      if (item.id === product.id) {
        item.count -= 1;
      }
      if (item.id === product.id && item.count <= 0) {
        handleRemoveFromCart(e, product);
      }
    });
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
    cartButtonTotal();
    return { cartItem };
  };
  const handleChangeAmountInCart = (e, product) => {
    handleAddToCart(e, product);
    var num = Number(e.target.value);
    if (Number(e.target.value) < 0) {
      num = 0;
    }
    cartItem.forEach((item) => {
      if (item.id === product.id) {
        item.count = num;
      }
      if (item.id === product.id && item.count <= 0) {
        handleRemoveFromCart(e, product);
      }
      cartButtonTotal();
      return { cartItem };
    });
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
    return { cartItem };
  };
  const handleRemoveFromCart = (e, product) => {
    setCartItem(cartItem.filter((a) => a.id !== product.id));
    cartButtonTotal();
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
    return { cartItem };
  };

  const [total, setTotal] = useState(0.0);
  const cartButtonTotal = () => {
    const total = cartLocal
      .reduce((a, c) => a + c.price * c.count, 0)
      .toFixed(2);
    setTotal(total);
  };

  // END ICE CREAM CART
  // SORT ICE CREAMS
  const listProducts = () => {
    if (sort !== "") {
      iceCreams.sort((a, b) =>
        sort === "lowestprice"
          ? a.price > b.price
            ? 1
            : -1
          : a.price < b.price
          ? 1
          : -1
      );
    }
  };
  const handleSortChange = (e) => {
    setSort(e.target.value);
    listProducts();
  };
  const getIceCreams = () => {
    axios.get(`ice.json`).then((res) => {
      setIceCreams(res.data);
    });
  };

  // FORMAT PHONE NUMBER
  let formatPhoneNumber = (str) => {
    //Filter only numbers from the input
    let cleaned = ("" + str).replace(/\D/g, "");

    //Check if the input is of correct length
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }

    return null;
  };

  useEffect(() => {
    getIceCreams();
  }, [listProducts()]);

  return (
    <Provider store={store}>
      <Router>
        <div>
          <Switch>
            <Route exact path='/'>
              <Main
                iceCreams={iceCreams}
                cartItem={cartItem}
                handleRemoveFromCart={handleRemoveFromCart}
                handleAddToCart={handleAddToCart}
                handleSubtractOneFromCart={handleSubtractOneFromCart}
                handleChangeAmountInCart={handleChangeAmountInCart}
                handleSortChange={handleSortChange}
                sort={sort}
                total={total}
                cartButtonTotal={cartButtonTotal}
                cartLocal={cartLocal}
              />
            </Route>
            <Route path='/ct'>
              <Checkout
                handleRemoveFromCart={handleRemoveFromCart}
                handleAddressSuggestions={handleAddressSuggestions}
                handleChangeAmountInCart={handleChangeAmountInCart}
                coordinates={coordinates}
                setPhone={setPhone}
                setName={setName}
                setAddress={setAddress}
                name={name}
                phone={phone}
                address={address}
                cartItem={cartItem}
                cartLocal={cartLocal}
                onSubmit={onSubmit}
                formatPhoneNumber={formatPhoneNumber}
              />
            </Route>
            <Route path='/pt'>
              <Payment
                address={address}
                name={name}
                phone={phone}
                cartItem={cartItem}
              />
            </Route>
            <Route path='/tu'>
              <Thankyou phone={phone} formatPhoneNumber={formatPhoneNumber} />
            </Route>
            <Route path='/orders'>
              <Orders formatPhoneNumber={formatPhoneNumber} />
            </Route>
            <Route path='/business'>
              <Business
                setMessage={setMessage}
                setPhone={setPhone}
                setName={setName}
                setEmail={setEmail}
                name={name}
                phone={phone}
                email={email}
                message={message}
                formatPhoneNumber={formatPhoneNumber}
                onBusiness={onBusiness}
                sent={sent}
                setSent={setSent}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
