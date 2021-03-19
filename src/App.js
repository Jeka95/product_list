import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import ProductDetails from './containers/ProductDetails';
import ProductList from './containers/ProductList';


function App() {
  return (
    <div className="App">
      <Router>

        <Switch>
          <Route exact path="/" component={ProductList}></Route>
          <Route path="/details" component={ProductDetails}></Route>
        </Switch>
      </Router>


    </div>
  );
}

export default App;
