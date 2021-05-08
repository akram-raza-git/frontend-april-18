import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Card, Button } from "react-bootstrap";
import { doGetMemoryById } from "../../action/memories";

const PostPage = (props) => {
  const [memory, setMemory] = useState({});

  useEffect(() => {
    const { id } = (props.match && props.match.params) || {};
    if (id) {
      props.doGetMemoryById(id).then((resp) => setMemory(resp));
    }
  }, [props]);

  return (
    <div className="">
      <Button
        className="btn btn-prime position-absolute"
        onClick={() => props.history.goBack()}
      >
        Back
      </Button>
      <div className="post-memory">
        <Card.Img variant="top" src={memory.image} className="_image" />
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  doGetMemoryById,
};
export default connect(null, mapDispatchToProps)(PostPage);
