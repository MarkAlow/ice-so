import React from "react";
import { IconButton, TextField, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

export default function Products(props) {
  const {
    iceCreams,
    handleAddToCart,
    cartItem,
    handleSubtractOneFromCart,
    handleChangeAmountInCart,
  } = props;
  var cartLocal = localStorage.getItem("cartItem");
  const objCount = (id) => {
    var cartObj = cartItem.map((item) => ({
      id: item.id,
      count: item.count,
    }));
    var obj = cartObj
      .filter((a) => a.id === id)
      .map((obj) =>
        obj.count !== 0 ? <span>{obj.count}</span> : <span>0</span>
      );
    return obj;
  };

  return (
    <div>
      <p>{localStorage.getItem("cartItem")}</p>
      <Button onClick={() => console.log(cartLocal)}>LOG</Button>
      <grid-container id='iceCreamGrid'>
        {iceCreams.map((item) => (
          <grid-item style={{ padding: "1rem" }} key={item.id}>
            <h4 id={item.id} style={{ textAlign: "center", fontWeight: 500 }}>
              <img src={item.pic} alt={item.name} id='productWidth'></img>{" "}
              <br />
              {item.name}
              <br />
              <span style={{ color: "#aaa" }}>${item.price}0</span>
            </h4>
            <div id='iconButtons'>
              <grid-item>
                <IconButton
                  aria-label='Remove'
                  onClick={(e) => handleSubtractOneFromCart(e, item)}
                >
                  <RemoveIcon />
                </IconButton>
              </grid-item>

              <grid-item style={{ justifySelf: "center" }}>
                <TextField
                  variant='outlined'
                  onChange={(e) => handleChangeAmountInCart(e, item)}
                  size='small'
                ></TextField>
              </grid-item>

              <grid-item>
                <IconButton
                  aria-label='Add'
                  onClick={(e) => handleAddToCart(e, item)}
                >
                  <AddIcon />
                </IconButton>
              </grid-item>
            </div>
          </grid-item>
        ))}
      </grid-container>
    </div>
  );
}
