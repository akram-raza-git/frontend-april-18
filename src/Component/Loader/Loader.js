import React from "react";
import "./loading.scss";

function Loader() {
  return (
    <div className="loader-page">
      <div class="spinner-grow" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Loader;
