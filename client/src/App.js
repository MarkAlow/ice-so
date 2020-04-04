import React from "react";
import Main from "./comp/Main/Main";
import Checkout from "./comp/Checkout/Checkout";
import Thankyou from "./comp/Thankyou/Thankyou";
import Payment from "./comp/Payment/Payment";
import Orders from "./comp/OrderList/Orders";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Switch>
            <Route exact path='/'>
              <Main />
            </Route>
            <Route path='/ct'>
              <Checkout />
            </Route>
            <Route path='/pt'>
              <Payment />
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
