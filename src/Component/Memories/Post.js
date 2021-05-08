import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import FileBase64 from "react-file-base64";
import { connect } from "react-redux";
import "./post.scss";
import { createMemory, updateMemory } from "../../action/memories";
import logo from "../../assets/3.png";
import Loader from "../Loader/Loader";

function Post(props) {
  const [post, setPost] = useState({
    post: "",
    title: "",
    author: "",
    image: "",
    userId: localStorage.getItem("userId"),
  });
  const [loading, setLoading] = useState(false);
  const [updateId, setUpdate] = useState(false);

  useEffect(() => {
    const { state } = props.location;
    if (state) {
      setUpdate(state._id);
      const { post, title, author, image } = state;
      setPost({ post, title, author, image });
    }
  }, [props, updateId]);

  const handleImageUploade = (imageUpload) => {
    if (
      Array.isArray(imageUpload) &&
      imageUpload.length > 0 &&
      imageUpload[0].base64
    ) {
      setPost({ ...post, image: imageUpload[0].base64 });
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (updateId) {
      setLoading(true);
      props.updateMemory(updateId, post).then((resp) => {
        if (resp._id === updateId) {
          const { history } = props;
          history &&
            history.push({
              pathname: "/Memories",
            });
          setLoading(false);
        }
      });
    } else {
      props
        .createMemory(post)
        .then((resp) => {
          setLoading(false);
          if (resp && resp.message === "memory saved") {
            const { history } = props;
            history &&
              history.push({
                pathname: "/Memories",
              });
          }
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="container-r">
        <div className="post-items">
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="title"
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="author">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="author"
                value={post.author}
                onChange={(e) => setPost({ ...post, author: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="post">
              <Form.Label>Post</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                value={post.post}
                onChange={(e) => setPost({ ...post, post: e.target.value })}
              />
            </Form.Group>

            <FileBase64 multiple={true} onDone={handleImageUploade} />
            <Button variant="primary" type="submit" style={{ float: "right" }}>
              {updateId ? `Update` : `Submit`}
            </Button>
          </Form>
        </div>
        <div className="card-item">
          Preview
          <Card>
            <Card.Img
              variant="top"
              src={post.image || logo}
              className="_image"
            />
            <Card.Body>
              <Card.Title>
                {post.title || `Title are awsome to explain in short words`}
              </Card.Title>
              <Card.Text>
                {post.post ||
                  `This is a longer paragraph with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.`}
              </Card.Text>
              <footer className="blockquote-footer text-right px-4">
                <small className="text-muted">
                  Author
                  <cite title="Source Title">{post.author || `N/A`}</cite>
                </small>
              </footer>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}

const mapDispatchToProps = {
  createMemory,
  updateMemory,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
