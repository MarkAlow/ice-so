import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./icelist/icelistReducer";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {};
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(logger, thunk))
);

export default store;
