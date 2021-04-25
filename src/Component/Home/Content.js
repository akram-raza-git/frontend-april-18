import React, { useEffect } from "react";
import "./_content.scss";
import { Image } from "react-bootstrap";
import logo from "../../assets/2.jpg";
import { authenticated } from "../authenticated/authenticated";

function ContentItem(props) {
  useEffect(() => {
    authenticated();
  });

  return (
    <>
      <div className="Container">
        <div className="child-comp1">
          <Image src={logo} className="image-style" />
        </div>
        <div className="child-comp2">content</div>
      </div>
    </>
  );
}

export default ContentItem;
