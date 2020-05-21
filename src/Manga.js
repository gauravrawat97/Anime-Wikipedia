import React from "react";
import { Spinner, Card, Button, Col, Container, Row } from "react-bootstrap";
import Roll from "react-reveal/Roll";
import Flip from "react-reveal/Flip";
import { Link } from "react-router-dom";
import "./styles.css";

class Manga extends React.Component {
  state = {
    isLoading: true,
    data: [],
    error: null
  };
  fetchData() {
    fetch(`https://api.jikan.moe/v3/top/manga`)
      .then(response => response.json())
      .then(data =>
        this.setState({
          data: data.top,
          isLoading: false
        })
      )
      .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.fetchData();
  }
  render() {
    const { isLoading, data, error } = this.state;
    //const val = this.state.data["Genre"].map((data, id) => <li>{data}</li>);
    //console.log(this.state.data);
    if (!isLoading) {
      return (
        <React.Fragment>
          <Container>
            <Roll top cascade>
              <h1 className="text-center mt-4 mb-4">TOP MANGA</h1>
            </Roll>
            <br />
            <br />
            <Post data={data} />
          </Container>
        </React.Fragment>
      );
    } else {
      return (
        <div className="spinner">
          <Spinner animation="border" />;
        </div>
      );
    }
  }
}

function Post(prop) {
  const d = prop.data.map((data, id) => (
    <Col key={id} md={6} lg={4} sm={12}>
      <Flip left>
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
            <Card.Text>Volumes: {data.volumes}</Card.Text>
            <Card.Text>Rating: {data.score}</Card.Text>

            <Link to={"/manga/" + data.mal_id} className="btn btn-primary">
              More Info
            </Link>
          </Card.Body>
        </Card>
      </Flip>
    </Col>
  ));
  return <Row>{d}</Row>;
}

export default Manga;
