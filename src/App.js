import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import HomePage from "./page/homePage";
import NotFound from "./page/notFound";
import MovieDetail from "./page/movieDetail";
import LoginPage from "./page/loginPage";
import {
  createTheme,
  ThemeProvider,
} from "@material-ui/core";
import "./App.css";
import "../src/utils/myCss.css";
import DashboardPage from "./page/dashboardPage";
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
