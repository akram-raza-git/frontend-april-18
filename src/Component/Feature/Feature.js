import React from "react";
import { connect } from "react-redux";

const Feature = (props) => {
  return <div>Feature</div>;
};

const mapStateToProps = (state) => ({
  state,
});
export default connect(mapStateToProps, null)(Feature);
