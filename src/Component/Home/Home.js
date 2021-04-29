import React from "react";
import { connect } from "react-redux";

function Home() {
  return <div>Home</div>;
}

const mapDispatchToProps = {};
const mapStateToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
