import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchUserProfile, updateUserProfile } from "./action";
import Alert from "../PopupModel/Alert";
import "./profile.scss";

const userId = localStorage.getItem("userId");

function Profile(props) {
  const [user, setUser] = useState({});
  const [address, setAddress] = useState({});
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const { userProfileInfo } = props;
    if (userProfileInfo && userProfileInfo._id) {
      setUser(userProfileInfo);
      setAddress(userProfileInfo.address);
    } else fetchUserProfileData();
  }, []);

  const fetchUserProfileData = () => {
    setLoading(true);
    userId &&
      props
        .fetchUserProfile(userId)
        .then((resp) => {
          if (resp && resp.email) {
            setUser(resp);
            setAddress(resp.address);
          } else {
            setMessage("Something went wrong");
            setError(true);
          }
          setLoading(false);
          clearMessage(2000);
        })
        .catch((error) => console.log(error));
  };

  const clearMessage = (timeOut) => {
    setTimeout(() => {
      setError(false);
      setMessage(false);
    }, timeOut);
  };

  const handleProfileUpdate = () => {
    user.address = address;
    setLoading(true);
    props
      .updateUserProfile(user)
      .then((resp) => {
        if (resp && resp.errorMessage) {
          setMessage(resp.errorMessage);
          setError(true);
          loading(false);
          clearMessage(3000);
        }
        if (resp) {
          setMessage("Profile updated successful");
          clearMessage(2000);
          fetchUserProfileData();
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Alert loading={loading} message={message} isError={error} />
      <div class="container">
        <div class="row gutters">
          <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
            <div class="card h-100">
              <div class="card-body">
                <div class="account-settings">
                  <div class="user-profile">
                    <div class="user-avatar">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar1.png"
                        alt="Maxwell Admin"
                      />
                    </div>
                    <h5 class="user-name">{user.name}</h5>
                    <h6 class="user-email mb-2">{user.mobile}</h6>
                    <h6 class="user-email">{user.email}</h6>
                  </div>
                  {user.Bio && (
                    <div class="about">
                      <h5 class="mb-2 text-primary">About</h5>
                      <p>{user.Bio}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
            <div class="card h-100">
              <div class="card-body">
                <div class="row gutters">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 class="mb-3 text-primary">Profile details</h6>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="fullName">Full Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="fullName"
                        onChange={(event) =>
                          setUser({ ...user, name: event.target.value })
                        }
                        value={user && user.name ? user.name : ""}
                        placeholder="Enter full name"
                      />
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="eMail">Email</label>
                      <input
                        type="email"
                        class="form-control"
                        id="eMail"
                        onChange={(event) =>
                          setUser({ ...user, email: event.target.value })
                        }
                        value={user && user.email ? user.email : ""}
                        placeholder="Enter email ID"
                      />
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="phone">Phone</label>
                      <input
                        value={user && user.mobile ? user.mobile : ""}
                        class="form-control"
                        id="phone"
                        onChange={(event) =>
                          setUser({ ...user, mobile: event.target.value })
                        }
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="website">About</label>
                      <input
                        class="form-control"
                        id="website"
                        value={user && user.Bio ? user.Bio : ""}
                        onChange={(event) =>
                          setUser({ ...user, Bio: event.target.value })
                        }
                        placeholder="About"
                      />
                    </div>
                  </div>
                </div>
                <div class="row gutters">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 class="mb-3 text-primary">Address</h6>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="Street">Street</label>
                      <input
                        type="name"
                        class="form-control"
                        value={address && address.street ? address.street : ""}
                        id="Street"
                        onChange={(e) =>
                          setAddress({ ...address, street: e.target.value })
                        }
                        placeholder="Enter Street"
                      />
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="ciTy">City</label>
                      <input
                        type="name"
                        class="form-control"
                        onChange={(e) =>
                          setAddress({ ...address, city: e.target.value })
                        }
                        id="city"
                        value={address && address.city ? address.city : ""}
                        placeholder="Enter City"
                      />
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="state">State</label>
                      <input
                        type="text"
                        class="form-control"
                        id="state"
                        value={address && address.state ? address.state : ""}
                        onChange={(e) =>
                          setAddress({ ...address, state: e.target.value })
                        }
                        placeholder="Enter State"
                      />
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="zIp">Zip Code</label>
                      <input
                        type="text"
                        class="form-control"
                        value={address && address.zip ? address.zip : ""}
                        onChange={(e) =>
                          setAddress({ ...address, zip: e.target.value })
                        }
                        id="zIp"
                        placeholder="Zip Code"
                      />
                    </div>
                  </div>
                </div>
                <div class="row gutters">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div class="text-right">
                      <button
                        type="button"
                        onClick={handleProfileUpdate}
                        class="btn btn-primary"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  fetchUserProfile,
  updateUserProfile,
};
const mapStateToProps = (state) => ({
  userProfileInfo: state.storeUserProfileInfo,
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
