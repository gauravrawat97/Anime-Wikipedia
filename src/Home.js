import React, { Component } from "react";
import { Spinner, Card, Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "./Footer";
class Home extends Component {
  state = {
    data: [],
    isLoading: true
  };

  search(val) {
    const d = val.target.value;
    if (d.length > 3)
      fetch(`https://api.jikan.moe/v3/search/anime?q= ${d} &page=1`)
        .then(response => response.json())
        .then(data =>
          this.setState({
            data: data.results,
            isLoading: false
          })
        )
        .catch(error => this.setState({ error, isLoading: false }));
  }

  onChangeHandler = async e => {
    this.search(e.target.value);
  };

  render() {
    const { isLoading, data, error } = this.state;

    return (
      <div
        className="mt-5 row justify-content-center"
        style={{ padding: "0 20%" }}
      >
        {" "}
        <input
          className="form-control"
          onChange={e => {
            this.search(e);
          }}
          placeholder="eg: Arifureta"
        />
        <div>{!isLoading ? <Post data={data} /> : ""}</div>
      </div>
    );
  }
}

function Post(prop) {
  const d = prop.data.map((data, id) => (
    <Col key={id} md={6} lg={4} sm={12}>
      <Card
        style={{
          width: "15rem",
          minHeight: "15rem",
          margin: "1rem 1rem",
          padding: "1rem 1rem ",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        }}
      >
        <Card.Img variant="top" src={data.image_url} />
        <Card.Body>
          <Card.Title>{data.title}</Card.Title>
          <Card.Text> {data.synopsis.substr(0, 200)}</Card.Text>
          <Card.Text>Rating: {data.score}</Card.Text>

          <Link to={"/animes/" + data.mal_id} className="btn btn-primary">
            More Info
          </Link>
        </Card.Body>
      </Card>
    </Col>
  ));
  return <Row>{d}</Row>;
}

export default Home;
