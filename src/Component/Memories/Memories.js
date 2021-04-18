import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { getMemories } from "../../action/memories";
import logo from "../../assets/3.png";

function Memories(props) {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getMemories()
      .then((resp) => {
        if (resp && resp.data) {
          setMemories(resp.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  const editHandler = (item) => {
    const { history } = props;
    history &&
      history.push({
        pathname: "/Create",
        state: item,
      });
  };
  return (
    <>
      {loading && (
        <div style={{ textAlign: "center" }}>
          <div class="spinner-grow loader" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      )}
      <div className="card-container">
        {memories && memories.length > 0
          ? memories.map((memory) => (
              <div className="card" style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={memory.image || logo}
                  className="_image"
                />
                <div className="card-body">
                  <h5 className="card-title">{memory.title}</h5>
                  <p className="card-text">{memory.post}</p>
                  <div className="text-right">
                    <small className="text-muted ">
                      Author <cite title="Source Title">{memory.author}</cite>
                    </small>
                  </div>
                  <div className="card-buttons">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => editHandler(memory)}
                    >
                      Edit
                    </button>
                    <button type="button" className="btn btn-danger mx-3">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    </>
  );
}

export default Memories;
