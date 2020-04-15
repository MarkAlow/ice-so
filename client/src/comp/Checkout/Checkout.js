import React from "react";
import { Link } from "react-router-dom";
import SimpleMap from "../OrderList/Map";
import { Button, TextField } from "@material-ui/core";
import Truck from "../../img/1x/truck.png";
import PlacesAutoComplete from "react-places-autocomplete";
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
    changeCount,
  } = props;
  return (
    <div>
      {cartItem.length > 0 ? (
        <div>
          <div id='orderWrapper'>
            <div id='orderLine'>
              <Link to='/' exact style={{ textDecoration: "none" }}>
                <div id='orderCircle'>
                  <img src={Truck} alt='Order' id='orderImage'></img>
                </div>
              </Link>
            </div>
          </div>
          <div style={{ display: "grid", justifyContent: "center" }}>
            <p>Your Order:</p>
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
                    variant='outlined'
                    onChange={changeCount}
                    size='small'
                  ></TextField>
                </grid-item>
                <grid-item>
                  <span>${(item.price * item.count).toFixed(2)}</span>
                </grid-item>
              </grid-container>
            ))}
          </div>
          <br />
          <p>Total:</p>$
          {cartItem.reduce((a, c) => a + c.price * c.count, 0).toFixed(2)}
          <br />
          <div style={{ margin: "0 auto", textAlign: "center" }}>
            <TextField
              value={name}
              label='Your Name'
              onChange={(e) => setName(e.target.value)}
            ></TextField>{" "}
            <br />
            <TextField
              value={phone}
              label='Your Phone'
              onChange={(e) => setPhone(e.target.value)}
            ></TextField>{" "}
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
          </div>{" "}
          <br />
          <SimpleMap
            lat={coordinates.lat ? Number(coordinates.lat) : 39.764334}
            lng={coordinates.lng ? Number(coordinates.lng) : -84.190472}
          />
          <Link to='/pt' style={{ textDecoration: "none" }}>
            <br />
            <Button
              label='Submit'
              onClick={onSubmit}
              style={{ border: "1px #ccc solid", padding: "1rem" }}
            >
              SUBMIT
            </Button>
          </Link>
          <br />
        </div>
      ) : (
        <div style={{ display: "grid", justifyContent: "center" }}>
          <p>Checkout is unavailable</p>{" "}
          <Link to='/' exact style={{ textDecoration: "none" }}>
            <Button
              label='Submit'
              onClick={onSubmit}
              style={{ border: "1px #ccc solid", padding: "1rem" }}
            >
              BACK TO MAIN
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Checkout;
