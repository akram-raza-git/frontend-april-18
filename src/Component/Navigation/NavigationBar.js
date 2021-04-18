import React, { useState } from "react";
import { Navbar, Nav, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import PopupModel from "../PopupModel/PopupModel";
import { loginUser, registerUser } from "../../action/auth";

const navigationItems = ["Home", "Features", "Create", "Memories"];
const authenticated = localStorage.getItem("token");
function NavigationBar(props) {
  const [handleShow, setHandleuser] = useState({
    showLogin: false,
    showRegister: false,
  });
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    message: "",
    errorMessage: "",
    user_id: null,
  });
  const [hasError, setError] = useState(false);

  const handleShowLogin = (l, falseogin, register) => {
    setHandleuser({ ...handleShow, showLogin: login, showRegister: register });
  };
  const handleRegister = (show) => {
    setHandleuser({ ...handleShow, showLogin: !show, showRegister: show });
  };
  const handleClose = () => {
    if (!hasError)
      setHandleuser({ ...handleShow, showLogin: false, showRegister: false });
    setRegister({ ...register, message: false });
  };

  const loginInputHandler = (event) => {
    setLogin({ ...login, [event.target.id]: event.target.value });
  };

  const registeInputHandler = (event) => {
    setRegister({ ...register, [event.target.id]: event.target.value });
  };

  const handleUserLogin = (event) => {
    event.preventDefault();
    if (login && login.email && login.password) {
      loginUser(login)
        .then((resp) => {
          if (resp && resp.data) {
            const { token } = resp.data;
            localStorage.setItem("token", token);
            setError(false);
            setRegister({ ...register, message: "Login Successful" });
            setTimeout(() => handleClose(), 3000);
          }
          console.log(resp);
        })
        .catch((error) => console.log(error));
    } else {
      setError(true);
    }
  };

  const handleUserRegister = (event) => {
    event.preventDefault();
    if (register && register.name && register.email && register.password) {
      registerUser(register)
        .then((resp) => {
          if (resp && resp.data) {
            const { message } = resp.data || {};
            setError(false);
            setRegister({
              ...register,
              message,
            });
            setTimeout(() => {
              handleClose();
            }, 3000);
          } else if (resp && resp.errorMessage) {
            setError(true);
            setRegister({
              ...register,
              errorMessage: resp.errorMessage,
              message: "",
            });
          }
        })
        .then((error) => console.log(error));
    } else {
      setError(true);
      setRegister({
        ...register,
        errorMessage: "Please enter your details",
        message: "",
      });
    }
  };

  return (
    <>
      <Navbar bg="dark" size="lg" variant="dark">
        <Link to="/">
          <Navbar.Brand>Profile</Navbar.Brand>
        </Link>
        <Nav className="mr-auto">
          {navigationItems.map((type) => (
            <Link className="px-3" to={`/${type}`} style={{ color: "#8a8a8a" }}>
              {type}
            </Link>
          ))}
          {!authenticated && (
            <Form.Label
              className="px-3 register-button"
              onClick={() => handleRegister(true)}
            >
              Register
            </Form.Label>
          )}
        </Nav>
        <Form inline>
          {!authenticated ? (
            <Button onClick={() => handleShowLogin(true, false, false)}>
              Login
            </Button>
          ) : (
            <Button>Logout</Button>
          )}
        </Form>
      </Navbar>
      <PopupModel
        showModal={handleShow.showLogin}
        onCloseFunc={handleClose}
        closeButton={handleClose}
        headerText={<div className="align-center">Login</div>}
      >
        {register.message ? (
          <h3 className="text-success">{register.message}</h3>
        ) : (
          <Form onSubmit={handleUserLogin}>
            <Form.Group controlId="email">
              <Form.Label name="email">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={loginInputHandler}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label name="password">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={loginInputHandler}
              />
            </Form.Group>
            {hasError ? (
              <span className="text-danger">{login.errorMessage}</span>
            ) : null}
            <Form.Group>
              <Form.Label className="btn text-secondary">
                Forgot password
              </Form.Label>
              <br />
              <Form.Label>
                New user?
                <span
                  className="btn p-0 mb-1 text-primary"
                  onClick={() => handleRegister(true)}
                >
                  Create an account
                </span>
              </Form.Label>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleUserLogin}>
              Login
            </Button>
          </Form>
        )}
      </PopupModel>
      <PopupModel
        showModal={handleShow.showRegister}
        onCloseFunc={handleClose}
        closeButton={handleClose}
        headerText={<div className="align-center">Register</div>}
      >
        <Form onSubmit={handleUserRegister}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              onChange={registeInputHandler}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              onChange={registeInputHandler}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={registeInputHandler}
            />
          </Form.Group>
          {hasError ? (
            <span className="text-danger">{register.errorMessage}</span>
          ) : null}
          <Form.Group>
            <Form.Label>
              Already have an account?{" "}
              <span
                className="btn p-0 mb-1 text-primary"
                onClick={() => handleShowLogin(true, false)}
              >
                Login
              </span>
            </Form.Label>
          </Form.Group>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </PopupModel>
    </>
  );
}

export default NavigationBar;
