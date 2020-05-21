import React from "react";
import {
  Spinner,
  Card,
  Button,
  Col,
  Container,
  Row,
  Image
} from "react-bootstrap";
import Jump from "react-reveal/Jump";

import "./styles.css";

class AnimeDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [],
      error: null
    };
    this.url = "https://api.jikan.moe/v3/anime/" + props.match.params.id;
  }
  fetchData() {
    fetch(this.url)
      .then(response => response.json())
      .then(data =>
        this.setState({
          data: data,
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
            <h1 className="text-center mt-4 mb-4">{data.title}</h1>
            <p className="text-center mb-2 text-muted">{data.title_japanese}</p>
            <Genre data={data} />
            <Row className="mt-4">
              <Col lg={12}>
                <iframe
                  src={data.trailer_url}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="video"
                  style={{
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "20rem"
                  }}
                />
              </Col>

              <Col className="mt-4">
                <Post data={data} />
              </Col>
            </Row>
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
  const data = prop.data;
  const d = (
    <Row>
      <Col md={12} lg={4} sm={12}>
        <Jump>
          <Image
            src={data.image_url}
            style={{
              width: "100%",
              maxHeight: "20rem",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
            }}
            fluid
            alt="Anime"
          />
        </Jump>
      </Col>

      <Col className="mt-2">{data.synopsis}</Col>
    </Row>

    /*
    <Col md={6} lg={4} sm={12}>
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
            <Card.Text>Volumes: {data.synopsis}</Card.Text>
          </Card.Body>
        </Card>
      </Flip>
    </Col>
    */
  );
  return <Container>{d}</Container>;
}

function Genre(prop) {
  const data = prop.data.genres;

  const d = data.map(data => (
    <span style={{ borderBottom: "4px dashed" }}>{data.name + "  "}</span>
  ));

  return <Container className="text-center">{d}</Container>;
}

export default AnimeDetail;
