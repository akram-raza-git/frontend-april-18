import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import cx from "classnames";
import { Nav } from "react-bootstrap";
import { withRouter } from "react-router";
import "./_navbar.scss";
import { fetchUserProfile } from "../User/action";

const authenticated = localStorage.getItem("token");
const userId = localStorage.getItem("userId");

const Side = (props) => {
  const [name, setName] = useState("");
  useEffect(() => {
    const { profileInfo } = props;
    if (profileInfo && profileInfo.name)
      setName(profileInfo && profileInfo.name);
    else {
      props.fetchUserProfile(userId).then((resp) => {
        setName(resp.name);
      });
    }
  }, []);
  const { sidebar, callback } = props;
  return (
    <>
      <Nav
        className={cx(
          "col-md-12 d-none d-md-block bg-light sidebar",
          sidebar ? "open-sidebar" : "hide-sidebar"
        )}
        activeKey="/home"
        // onSelect={}
      >
        <div className="sidebar-sticky"></div>
        <div className="d-flex f-direction-column justify-content-between h-100">
          <div>
            <Nav.Item>
              <Nav.Link className={cx()} onClick={() => callback("profile")}>
                {name}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className={cx()} eventKey="1">
                Link
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className={cx()} eventKey="2">
                Link
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className={cx()} eventKey="3">
                Link
              </Nav.Link>
            </Nav.Item>
          </div>
          <Nav.Item>
            <Nav.Link
              eventKey="4"
              onClick={() => callback(authenticated ? "logout" : "login")}
            >
              {authenticated ? "Logout" : "Login"}
            </Nav.Link>
          </Nav.Item>
        </div>
      </Nav>
      <div
        className={cx(sidebar && "sidebar-container")}
        onClick={() => callback("hideSidebar")}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  profileInfo: state.storeUserProfileInfo,
});

const mapDispatchToProps = {
  fetchUserProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Side));
