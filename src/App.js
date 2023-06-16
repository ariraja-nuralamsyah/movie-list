import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import HomePage from "./components/home-page";
import NotFound from "./components/not-found";
import MovieDetail from "./components/movie-detail";
import LoginPage from "./components/login-page";
import {
  createTheme,
  ThemeProvider,
} from "@material-ui/core";
import "./App.css";
import "../src/utils/myCss.css";
import DashboardPage from "./components/dashboard-page";

const theme = createTheme({
  typography: {
    fontFamily: `'Poppins', sans-serif`,
  },
});
class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/home-page/:status/:id" component={MovieDetail} />
          <Route path="/home-page/:status" component={HomePage} />
          <Route path="/dashboard/:status" component={HomePage} />
          <Route path="/dashboard" component={DashboardPage} />
          <Route path="/home-page" component={HomePage} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/login" component={LoginPage} />
          <Route path="/login" component={LoginPage} />
          <Redirect from="/" exact to="/home-page" />
          <Redirect to="/not-found" />
        </Switch>
      </ThemeProvider>
    );
  }
}

export default App;
