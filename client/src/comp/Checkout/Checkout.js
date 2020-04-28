import React from "react";
import { Link } from "react-router-dom";
import Header from "../Main/Header";
import SimpleMap from "../OrderList/Map";
import { Button, TextField } from "@material-ui/core";
import Truck from "../../img/1x/truck.png";
import PlacesAutoComplete from "react-places-autocomplete";
import DeleteIcon from "@material-ui/icons/Delete";

function Checkout(props) {
  const {
    cartItem,
    name,
    setName,
    phone,
    setPhone,
    address,
    setAddress,
    handleAddressSuggestions,
    coordinates,
    onSubmit,
    formatPhoneNumber,
    handleRemoveFromCart,
    handleChangeAmountInCart,
  } = props;
  return (
    <div>
      {/* {cartItem.length > 0 ? ( */}
      <div id='mainFlexWrapper' style={{ marginTop: "5rem" }}>
        <div id='orderWrapper'>
          <div id='orderLine'>
            <Link to='/' exact style={{ textDecoration: "none" }}>
              <div id='orderCircle'>
                <img src={Truck} alt='Order' id='orderImage'></img>
              </div>
            </Link>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            justifyContent: "center",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h2>Your Order:</h2>
          {cartItem.map((item) => (
            <grid-container key={item.id} id='cartItem'>
              <grid-item>
                <img
                  src={item.pic}
                  alt={item.name}
                  style={{ width: "3rem" }}
                ></img>
              </grid-item>
              <grid-item>
                <span>{item.name}</span>
              </grid-item>
              <grid-item>
                <TextField
                  defaultValue={item.count}
                  type='number'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant='outlined'
                  onChange={(e) => handleChangeAmountInCart(e, item)}
                  size='small'
                ></TextField>
              </grid-item>
              <grid-item>
                <span>${(item.price * item.count).toFixed(2)}</span>
              </grid-item>
              <grid-item>
                <DeleteIcon
                  onClick={(e) => handleRemoveFromCart(e, item)}
                  fontSize='small'
                />
              </grid-item>
            </grid-container>
          ))}
        </div>
        <br />
        <span style={{ position: "relative", margin: "0 auto" }}>
          <p>Total:</p>$
          {cartItem.reduce((a, c) => a + c.price * c.count, 0).toFixed(1)}0
        </span>
        <br />
        <div style={{ margin: "0 auto", textAlign: "center" }}>
          <TextField
            variant='outlined'
            value={name}
            label='Your Name'
            onChange={(e) => setName(e.target.value)}
          ></TextField>
          <br />
          <br />
          <TextField
            variant='outlined'
            value={formatPhoneNumber(phone)}
            label='Your Phone'
            onChange={(e) => setPhone(e.target.value)}
          ></TextField>{" "}
          <br />
          <br />
          <PlacesAutoComplete
            value={address}
            onChange={setAddress}
            onSelect={handleAddressSuggestions}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <TextField
                  variant='outlined'
                  label='Your Address'
                  onChange={(e) => setAddress(e.target.value)}
                  {...getInputProps({})}
                />
                <div>
                  {loading ? <div>...loading</div> : null}
                  {suggestions.map((suggestion) => {
                    const style = {
                      backgroundColor: suggestion.active
                        ? "#39BAE8"
                        : "#f2f4f6",
                    };
                    return (
                      <div {...getSuggestionItemProps(suggestion, { style })}>
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutoComplete>
        </div>
        <br />
        <SimpleMap
          lat={coordinates.lat ? Number(coordinates.lat) : 39.764334}
          lng={coordinates.lng ? Number(coordinates.lng) : -84.190472}
        />
        <br />
        {formatPhoneNumber(phone) &&
        address &&
        name.length > 2 &&
        name.length < 20 &&
        coordinates.lat ? (
          <Link to='/pt' style={{ textDecoration: "none", margin: "0 auto" }}>
            <Button
              label='Submit'
              onClick={onSubmit}
              style={{
                border: "1px #ccc solid",
                padding: "1rem",
                margin: "0 auto",
                textAlign: "center",
              }}
            >
              SUBMIT ORDER
            </Button>
          </Link>
        ) : (
          <Button
            label='Submit'
            style={{
              border: "1px #ccc solid",
              padding: "1rem",
              width: "50%",
              margin: "0 auto",
              textAlign: "center",
            }}
            disabled
          >
            PLEASE FILL THE FORM OUT
          </Button>
        )}
        <br />
      </div>
      {/* // ) : (
      //   <div id='mainFlexWrapper' style={{ marginTop: "6rem" }}>
      //     <p>Checkout is unavailable</p>
      //     <Link to='/' exact style={{ textDecoration: "none" }}>
      //       <Button */}
      {/*        label='Submit'
             onClick={onSubmit}
              style={{ border: "1px #ccc solid", padding: "1rem" }}
            >
             BACK TO MAIN */}
      {/*       </Button> */}
      {/*     </Link> */}
      {/*   </div> */}
      {/*  )} */}
      <Header />
    </div>
  );
}

export default Checkout;
