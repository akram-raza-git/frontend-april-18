import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button, Spinner } from "react-bootstrap";
import { loginUser } from "../../action/auth";
import PopupModal from "../PopupModel/PopupModel";
import { user_login } from "../../Redux/action/auth.action";
import "./_content.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      loading: false,
      showPopup: false,
      hasError: false,
      errorMessage: null,
      successMessage: null,
    };
  }

  handleUserLogin = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    console.log(email, password);
    if (email && password) {
      this.setState({ loading: true });
      this.props
        .loginUser({ email, password })
        .then((resp) => {
          if (resp && resp.token) {
            const { user } = resp;
            const userId = user._id;
            localStorage.setItem("token", resp.token);
            localStorage.setItem("userId", userId);
            if (user) this.props.user_login(user);
            this.setState(
              {
                successMessage: "Login Successful",
                errorMessage: null,
                loading: false,
                showPopup: true,
              },
              () => {
                setTimeout(() => {
                  this.setState({ successMessage: null, showPopup: false });
                  window.location.href = `/profile/${userId}`;
                }, 3000);
              }
            );
          } else {
            this.setState({
              errorMessage: "something went wrong",
              loading: false,
            });
          }
        })
        .catch((error) => console.log(error));
    } else {
      if (!email) this.setState({ errorMessage: "Please enter your email" });
      else if (!password)
        this.setState({ errorMessage: "Please enter your password" });
    }
  };

  render() {
    const { errorMessage, loading, successMessage, showPopup } = this.state;
    return (
      <div className="bodyElement">
        <Form className="form-element" onSubmit={this.handleUserLogin}>
          <h3>Log in</h3>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              onChange={(e) => this.setState({ email: e.target.value })}
              className="form-control"
              placeholder="Enter email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              onChange={(e) => this.setState({ password: e.target.value })}
              placeholder="Enter password"
            />
          </div>

          {errorMessage ? (
            <p className="text-danger">
              {errorMessage} <br />
            </p>
          ) : null}
          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div>

          <Button
            type="submit"
            className="btn btn-dark btn-lg btn-block"
            disabled={loading}
            loading={loading}
          >
            {loading ? (
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            ) : (
              `Sign in`
            )}
          </Button>
          <p className="forgot-password text-right ">
            Forgot <span>password?</span>
          </p>
          <Button
            type="button"
            onClick={() => this.props.history.push("/u/register")}
            className="btn btn-primary btn-lg btn-block mt-4"
          >
            Create a new account
          </Button>
        </Form>
        <PopupModal
          showModal={showPopup}
          headerText={<h3 className="text-success">{successMessage}</h3>}
        />
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  loginUser,
  user_login: (data) => dispatch(user_login(data)),
});
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
