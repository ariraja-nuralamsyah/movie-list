import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import HomePage from "./components/page/home-page";
import NotFound from "./components/page/not-found";
import MovieDetail from "./components/page/movie-detail";
import LoginPage from "./components/page/login-page";
import {
  createTheme,
  ThemeProvider,
} from "@material-ui/core";
import "./App.css";
import "../src/utils/myCss.css";
import DashboardPage from "./components/page/dashboard-page";
import { connect } from "react-redux";

const theme = createTheme({
  typography: {
    fontFamily: `'Poppins', sans-serif`,
  },
});
class App extends Component {

  render() {
    const { isLoggedIn } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/home-page/:status/:id" component={MovieDetail} />
          <Route path="/home-page/:status" component={HomePage} />
          <Route
            path="/dashboard/:status"
            render={(props) =>
              isLoggedIn ? <HomePage {...props} /> : <Redirect to="/login" />
            }
          />
          <Route
            path="/dashboard"
            render={(props) =>
              isLoggedIn ? (
                <DashboardPage {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route path="/home-page" component={HomePage} />
          <Route path="/not-found" component={NotFound} />
          <Route
            path="/login"
            render={() =>
              isLoggedIn ? <Redirect to="/dashboard" /> : <LoginPage />
            }
          />
          <Redirect from="/" exact to="/home-page" />
          <Redirect to="/not-found" />
        </Switch>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps)(App);
