import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function Navbars() {
  return (
    <Navbar fixed="top" bg="dark" variant="dark">
      <Navbar.Brand>
        <Link to="/">Home</Link>
      </Navbar.Brand>
      <Nav className="mr-auto">
        {" "}
        <Link className="nav-link" to="/anime">
          Anime
        </Link>{" "}
        <Link className="nav-link" to="/manga">
          Manga
        </Link>
      </Nav>
    </Navbar>
  );
}

export default Navbars;
