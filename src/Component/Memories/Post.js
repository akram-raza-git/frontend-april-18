import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import FileBase64 from "react-file-base64";
import "./post.scss";
import { createMemory } from "../../action/memories";
import logo from "../../assets/3.png";

function Post(props) {
  const [post, setPost] = useState({
    post: "",
    title: "",
    author: "",
    image: "",
  });

  useEffect(() => {
    const { state } = props.location;
    console.log(state);
    if (state) {
      const { post, title, author, image } = state;
      setPost({ post, title, author, image });
    }
  }, [props]);

  const handleImageUploade = (image) => {
    console.log(image);
    if (Array.isArray(image) && image.length > 0 && image[0].base64) {
      setPost({ ...post, image: image[0].base64 });
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    createMemory(post)
      .then((resp) => console.log(resp))
      .catch((error) => console.log(error));
  };
  return (
    <div className="container">
      <div className="post-items">
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="title"
              onChange={(e) => setPost({ ...post, title: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="author">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              placeholder="author"
              onChange={(e) => setPost({ ...post, author: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="post">
            <Form.Label>Post</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              onChange={(e) => setPost({ ...post, post: e.target.value })}
            />
          </Form.Group>

          <FileBase64 multiple={true} onDone={handleImageUploade} />
          <Button variant="primary" type="submit" style={{ float: "right" }}>
            Submit
          </Button>
        </Form>
      </div>
      <div className="card-item">
        Preview
        <Card>
          <Card.Img variant="top" src={post.image || logo} className="_image" />
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
                Author <cite title="Source Title">{post.author || `N/A`}</cite>
              </small>
            </footer>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Post;
