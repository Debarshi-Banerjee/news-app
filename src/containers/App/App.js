import React, { Component } from "react";
import { Route,Link } from "react-router-dom";
import NewsPage from "../NewsPage/NewsPage";
import NewsDetailsPage from "../NewsDetailsPage/NewsDetailsPage"
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/" exact component={NewsPage} />
        <Route path="/details/:id" component={NewsDetailsPage} />
      </div>
    );
  }
}

export default App;
