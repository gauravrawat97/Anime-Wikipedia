import React from "react";
import { Spinner, Card, Button, Col, Container, Row } from "react-bootstrap";
import Sky from "react-sky";
import Roll from "react-reveal/Roll";
import Swing from "react-reveal/Swing";
import { Link } from "react-router-dom";
import "./styles.css";

class Anime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [],
      error: null
    };
    this.Click = this.Click.bind(this);
  }
  Click() {
    console.log("Okay");
    alert("Okay");
  }
  fetchData() {
    fetch(`https://api.jikan.moe/v3/top/anime`)
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
            <div className="particles">
              <Sky
                images={{
                  /* FORMAT AS FOLLOWS */
                  0: "https://i.dlpng.com/static/png/6948296_preview.png" /* You can pass as many images as you want */,
                  1: "https://cdn46.picsart.com/178892703000202.gif?to=crop&r=256",
                  2: "https://cdn106.picsart.com/206602205002202.jpg?type=webp&to=crop&r=256",
                  3: "https://i.pinimg.com/280x280_RS/4b/5e/f6/4b5ef64f9953697488a6e3b9d2b5cb80.jpg" /* 3: your other image... */
                  /* 4: your other image... */
                  /* 5: your other image... */
                  /* ... */
                }}
                how={
                  50
                } /* Pass the number of images Sky will render chosing randomly */
                time={40} /* time of animation */
                size={"100px"} /* size of the rendered images */
                /* color of background */
              />
            </div>
            <Roll top cascade>
              <h1 style={{ fontSize: "8vw" }} className="text-center mt-4 mb-4">
                TOP ANIMES
              </h1>
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
    <Col key={id} md={6} lg={4} sm={12} xs={12}>
      <Swing>
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

            <Card.Text>Episodes {data.episodes}</Card.Text>
            <Card.Text>Rating: {data.score} </Card.Text>
            <Link to={"/animes/" + data.mal_id} className="btn btn-primary">
              More Info
            </Link>
          </Card.Body>
        </Card>
      </Swing>
    </Col>
  ));
  return <Row>{d}</Row>;
}

export default Anime;
