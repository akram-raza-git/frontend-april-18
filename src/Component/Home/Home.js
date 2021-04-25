import React, { useEffect } from "react";
import { connect } from "react-redux";

function Home(props) {
  useEffect(() => {
    console.log(props);
  });
  return <div>Home</div>;
}

const mapDispatchToProps = (dispatch) => {};
const mapStateToProps = (state) => ({ loginReducer: state.loginReducer });

export default connect(mapStateToProps, mapDispatchToProps)(Home);
