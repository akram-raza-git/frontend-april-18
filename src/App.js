import React, { Component } from "react";
import "./app.scss";
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./Component/Navigation/NavigationBar";
import Content from "./Component/Home/Content";
import Memories from "./Component/Memories/Memories";
import Post from "./Component/Memories/Post";
import Gradient from "./Component/Navigation/Gradient";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Gradient />
        <Route exact path="/" component={Content} />
        <Route path="/Create" component={Post} />
        <Route path="/Memories" component={Memories} />
      </BrowserRouter>
    );
  }
}
