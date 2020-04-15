import React, { useState, useEffect } from "react";
import axios from "axios";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import Main from "./comp/Main/Main";
import Checkout from "./comp/Checkout/Checkout";
import Thankyou from "./comp/Thankyou/Thankyou";
import Payment from "./comp/Payment/Payment";
import Orders from "./comp/OrderList/Orders";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
function App() {
  // -- CUSTOMER STATE
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [sort, setSort] = useState("");

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

  const [iceCreams, setIceCreams] = useState([]);

  // START ICE CREAM CART
  const handleAddToCart = (e, product) => {
    let productAlreadyInCart = false;

    cartItem.forEach((item) => {
      if (item.id === product.id) {
        item.count += 1;
        productAlreadyInCart = true;
      }
    });

    if (!productAlreadyInCart) {
      cartItem.push({ ...product, count: 1 });
    }
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
    cartButtonTotal();
    return { cartItem };
  };

  const handleRemoveFromCart = (e, product) => {
    setCartItem(cartItem.filter((a) => a.id !== product.id));
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
    return cartItem;
  };

  //PRODUCT CART COUNT
  const productCount = (order) => {
    var countArr = [];
    var count = cartItem.map((item) => (
      <span key={item.name}>{item.count}</span>
    ));
    countArr.push(count);
    const countARR = countArr[0];
    return countARR[order];
  };

  //CHANGE CART PRODUCT COUNT
  const changeCount = (e, item) => {
    console.log(item, e.target.value);
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
    } else {
      iceCreams.sort((a, b) => (a.id > b.id ? 1 : -1));
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
  const [total, setTotal] = useState(0.0);
  const cartButtonTotal = () => {
    const total = cartItem
      .reduce((a, c) => a + c.price * c.count, 0)
      .toFixed(2);
    setTotal(total);
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
                handleSortChange={handleSortChange}
                sort={sort}
                productCount={productCount}
                changeCount={changeCount}
                total={total}
              />
            </Route>
            <Route path='/ct'>
              <Checkout
                handleAddressSuggestions={handleAddressSuggestions}
                coordinates={coordinates}
                setPhone={setPhone}
                setName={setName}
                address={address}
                name={name}
                phone={phone}
                setAddress={setAddress}
                cartItem={cartItem}
                onSubmit={onSubmit}
                changeCount={changeCount}
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
              <Thankyou />
            </Route>
            <Route parth='/orders'>
              <Orders />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
