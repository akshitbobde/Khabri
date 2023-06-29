import "./App.css";

import React, { Component, Fragment } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

//ye ho hai isko apan bole hai class bease dcomponents to pichle me apan ne function based components use kiya tha isiliye but abhi apan components based components padh rahe hai isiliye apan aasa kar rahe hai ki aaur render ka kaam hai jsz ko html me complie aur bas jo likha hai iuske js ko chalne ka kaam kar raha hai
export default class App extends Component {
  state = {
    progress: 10,
  };

  setProgress = (progress) => {
    this.setState({ progress: progress });
  };
  render() {
    return (
      <div>
        <Router>
          <LoadingBar
            color="#f11946"
            progress={this.state.progress}
            height={3}
          />
          <Fragment>
            <Navbar />
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <News
                    setProgress={this.setProgress}
                    key="general"
                    country="in"
                    category="general"
                  />
                }
              />
              <Route
                exact
                path="/entertainment"
                element={
                  <News
                    setProgress={this.setProgress}
                    key="entertainment"
                    country="in"
                    category="entertainment"
                  />
                }
              />
              <Route
                exact
                path="/business"
                element={
                  <News
                    setProgress={this.setProgress}
                    key="business"
                    country="in"
                    category="business"
                  />
                }
              />
              <Route
                exact
                path="/general"
                element={
                  <News
                    setProgress={this.setProgress}
                    key="general"
                    country="in"
                    category="general"
                  />
                }
              />
              <Route
                exact
                path="/health"
                element={
                  <News
                    setProgress={this.setProgress}
                    key="health"
                    country="in"
                    category="health"
                  />
                }
              />
              <Route
                exact
                path="/science"
                element={
                  <News
                    setProgress={this.setProgress}
                    key="science"
                    country="in"
                    category="science"
                  />
                }
              />
              <Route
                exact
                path="/sports"
                element={
                  <News
                    setProgress={this.setProgress}
                    key="sports"
                    country="in"
                    category="sports"
                  />
                }
              />
              <Route
                exact
                path="/technology"
                element={
                  <News
                    setProgress={this.setProgress}
                    key="technology"
                    country="in"
                    category="technology"
                  />
                }
              />
            </Routes>
          </Fragment>
        </Router>
      </div>
    );
  }
}
