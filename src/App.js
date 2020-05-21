import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Anime from "./Anime";
import Manga from "./Manga";
import AnimeDetail from "./AnimeDetail";
import MangaDetail from "./MangaDetail";
import Footer from "./Footer";
import Home from "./Home";
import Navbars from "./Navbars";
class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <Navbars />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/anime" component={Anime} />
            <Route exact path="/manga" component={Manga} />
            <Route exact path="/animes/:id" component={AnimeDetail} />
            <Route exact path="/manga/:id" component={MangaDetail} />
          </Switch>
        </Router>
        <Footer />
      </React.Fragment>
    );
  }
}
export default App;
