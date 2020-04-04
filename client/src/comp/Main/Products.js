import React from "react";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

export default function Products(props) {
  return (
    <div>
      <grid-container id='iceCreamGrid'>
        {props.iceCreams.map(icecream => (
          <grid-item
            style={{ padding: "1rem" }}
            key={icecream.id}
            onClick={e => props.handleAddToCart(e, icecream)}
          >
            <h4
              id={icecream.id}
              style={{ textAlign: "center", fontWeight: 500 }}
            >
              <img src={icecream.pic} alt={icecream.name}></img> <br />
              {icecream.name}
              <br />
              <span style={{ color: "#aaa" }}>${icecream.price}0</span>
            </h4>
            <IconButton aria-label='Remove'>
              <RemoveIcon />
            </IconButton>
            <span>0</span>
            <IconButton aria-label='Add'>
              <AddIcon />
            </IconButton>
          </grid-item>
        ))}
      </grid-container>
    </div>
  );
}
