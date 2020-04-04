import React from "react";
import SimpleMap from "../OrderList/Map";
import { Button, TextField } from "@material-ui/core";
import PlacesAutoComplete from "react-places-autocomplete";
function Checkout(props) {
  return (
    <div>
      <br />
      <TextField
        label='Name'
        onChange={e => props.setName(e.target.value)}
      ></TextField>
      <TextField
        label='Phone'
        onChange={e => props.setPhone(e.target.value)}
      ></TextField>
      <PlacesAutoComplete
        value={props.address}
        onChange={props.setAddress}
        onSelect={props.handleAddressSuggestions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <TextField
              label='Your Address'
              onChange={e => props.setAddress(e.target.value)}
              {...getInputProps({})}
            />
            <div>
              {loading ? <div>...loading</div> : null}
              {suggestions.map(suggestion => {
                const style = {
                  backgroundColor: suggestion.active ? "#39BAE8" : "#f2f4f6"
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
      <SimpleMap
        lat={props.coordinates.lat ? Number(props.coordinates.lat) : 39.764334}
        lng={props.coordinates.lng ? Number(props.coordinates.lng) : -84.190472}
      />
      <Button label='Submit' onClick={props.onSubmit}>
        SUBMIT
      </Button>
      <br />
    </div>
  );
}

export default Checkout;
