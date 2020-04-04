import { ADD_TO_CART } from "./icelistTypes";

export const addToCart = () => {
  return dispatch => {
    console.log("Adding to cart");
    dispatch({
      type: ADD_TO_CART
    });
  };
};
