import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Redirect, Route, Router, Switch } from "react-router";

import { createBrowserHistory } from "history";

import reportWebVitals from "./reportWebVitals";

import "src/index.css";

// components
import LoadingSpinner from "src/components/LoadingSpinner";
import NotFoundPage from "src/components/Pages/NotFound";
import ArtistsPage from "src/components/Pages/Artists";
// store
import store from "src/store";
import ReleasesPage from "src/components/Pages/Releases";

const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <LoadingSpinner />
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            <Redirect to="/artists" />
          </Route>
          <Route exact path="/artists">
            <ArtistsPage />
          </Route>
          <Route path="/artists/:id?">
            <ReleasesPage />
          </Route>
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
