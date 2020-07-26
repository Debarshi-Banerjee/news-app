import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import App from "../App/App";
import reducer from '../../store/reducer'

const store = createStore(reducer)

class RouterRoot extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default RouterRoot;
