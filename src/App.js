import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './header/Header';
import FoodList from './foodList/FoodList'
import LandingPage from "./landingPage/LandingPage";
class App extends Component {
  render() {
    return (
        <Router>
            <Route exact path="/" component={Header}>
             <Route path = "/home" component = {FoodList}/>
                <Route path = "/login" component = {LandingPage}/>
            </Route>
        </Router>
    );
  }
}

export default App;
