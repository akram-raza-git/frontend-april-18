import React from "react";
import cx from "classnames";
import "./_alert.scss";

class Alerts extends React.Component {
  render() {
    const {
      loading,
      loader,
      message,
      positionCenter,
      displayOnlyInMobile,
      isError,
      defaultMassage,
    } = this.props;
    return (
      <div>
        <div
          className={cx(
            "alert-message",
            positionCenter && "alert-message-password-reset",
            displayOnlyInMobile && "display-none-desktop",
            !loading && !message && "opacity-0"
          )}
        >
          {message && (
            <div
              className={cx(
                "ajax-msg-box text-center mrg-b-lg inner-message",
                !isError ? "success-color" : "danger-color"
              )}
            >
              {loader ? (
                <div className="lds-roller small-loader">
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                </div>
              ) : (
                <i
                  className={cx(
                    "p-r-5",
                    !isError ? "ac-icon-done" : "ac-icon-close"
                  )}
                />
              )}

              {message}
            </div>
          )}
          {loading ? (
            <div className="ajax-msg-box text-center">
              <span className="fa fa-spinner fa-pulse fa-fw" />
              <span className="resp-message p-r-5">
                {!defaultMassage ? `Please wait...` : defaultMassage}{" "}
              </span>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default Alerts;
