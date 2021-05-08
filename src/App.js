import React, { Component } from "react";
import "./app.scss";
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./Component/Navigation/NavigationBar";
import Content from "./Component/Home/Content";
import Memories from "./Component/Memories/Memories";
import PostPage from "./Component/Memories/postpage";
import Post from "./Component/Memories/Post";
import Home from "./Component/Home/Home";
import Feature from "./Component/Feature/Feature";
import history from "./Component/history/history";
import Login from "./Component/Home/Login";
import Register from "./Component/Home/Register";
import Profile from "./Component/User/Profile";
import { authenticated } from "./Component/authenticated/authenticated";

export default class App extends Component {
  componentDidMount() {
    authenticated();
  }

  userLoginRegisterPage = () => (
    <>
      <Route exact path="/u/login" component={Login} />
      <Route exact path="/u/register" component={Register} />
    </>
  );

  handleAllRoutes = () => (
    <>
      <Navbar history={history} />
      <Route exact path="/" component={Content} />
      <Route path="/Create" component={Post} />
      <Route exact path="/Memories" component={Memories} />
      <Route path="/Memories/:id" component={PostPage} />
      <Route path="/Features" component={Feature} />
      <Route path="/Home" component={Home} />
      <Route path="/profile" component={Profile} />
    </>
  );

  render() {
    return (
      <BrowserRouter>
        {authenticated()
          ? this.handleAllRoutes()
          : this.userLoginRegisterPage()}
        <Route path="/profile" component={Profile} />
      </BrowserRouter>
    );
  }
}
