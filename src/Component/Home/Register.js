import React, { Component } from "react";
import { connect } from "react-redux";
import { Spinner } from "react-bootstrap";
import { registerUser } from "../../action/auth";
import PopupModal from "../PopupModel/PopupModel";
import "./_content.scss";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      loading: false,
      errorMessage: null,
      successMessage: null,
    };
  }

  handleChanges = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = () => {
    const { name, email, password } = this.state;
    const { history } = this.props;
    if (!name) this.setState({ errorMessage: "Please enter your name" });
    else if (!email) this.setState({ errorMessage: "Please enter your email" });
    else if (!password)
      this.setState({ errorMessage: "Please enter a password" });
    if (name && email && password) {
      this.setState({ loading: true });
      this.props.registerUser({ name, email, password }).then((resp) => {
        if (resp) {
          if (resp && resp.user_id) {
            this.setState(
              { successMessage: "User registered successful" },
              () => {
                setTimeout(() => {
                  this.setState({ loading: false, successMessage: null });
                  history.push("/u/login");
                }, 3000);
              }
            );
          }
          console.log(resp);
          this.setState({ loading: false });
        }
      });
    }
  };

  render() {
    const {
      name,
      email,
      password,
      errorMessage,
      loading,
      successMessage,
      showPopup,
    } = this.state;
    return (
      <div className="bodyElement">
        <form className="form-element">
          <h3>Register</h3>

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              defaultValue=""
              onChange={this.handleChanges}
              name="name"
              className="form-control"
              value={name}
              placeholder="Name"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              defaultValue=""
              onChange={this.handleChanges}
              className="form-control"
              value={email}
              name="email"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.handleChanges}
              defaultValue=""
              className="form-control"
              placeholder="Enter password"
            />
            <small className="text-danger">
              {errorMessage && errorMessage}
            </small>
          </div>
          <button
            type="button"
            disabled={loading}
            onClick={this.handleSubmit}
            className="btn btn-dark btn-lg btn-block"
          >
            {loading ? (
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            ) : (
              `Register`
            )}
          </button>
          <p className="forgot-password text-right">
            Already registered{" "}
            <span onClick={() => this.props.history.push("/u/login")}>
              log in?
            </span>
          </p>
        </form>
        <PopupModal
          showModal={showPopup}
          headerText={<h3 className="text-success">{successMessage}</h3>}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({});
const mapDispatchToProps = () => ({
  registerUser,
});
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
