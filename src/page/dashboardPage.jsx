import React, { Component, Fragment } from "react";
import Navbar from "../components/navbar";
import "../utils/myCss.css";
import { navbarType } from "../constants";
import { Grid, Typography, withStyles } from "@material-ui/core";
import { Link } from "react-router-dom/cjs/react-router-dom";
import {
  loadMovies,
  loadTvs,
  loadFavorite,
  loadMyList,
} from "../actions";
import { connect } from "react-redux";
import CustomBox from "../components/customBox";


class DashboardPage extends Component {
  componentDidMount() {
      this.props.loadMovies(this.props.currentpage);
      this.props.loadTvs(this.props.currentpage);
      this.props.loadFavorite();
      this.props.loadMyList();
  }
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Navbar type={navbarType.DASHBOARD} />
        <div className="padding-body">
          <Typography variant="h3" className={classes.title}>
            Welcome
          </Typography>
          <br />
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <CustomBox
                styleTextContent="h4"
                title="Movies"
                content={this.props.movies.length}
              />
            </Grid>
            <Grid item xs={3}>
              <CustomBox
                styleTextContent="h4"
                title="TV Shows"
                content={this.props.tvs.length}
              />
            </Grid>
            <Grid item xs={3}>
              <CustomBox
                styleTextContent="h4"
                title="Suggestions"
                content={this.props.favoriteStorage.favorites.length}
              />
            </Grid>
            <Grid item xs={3}>
              <CustomBox
                styleTextContent="h4"
                title="My Movie List"
                content={this.props.myListStorage.mylist.length}
              />
            </Grid>
          </Grid>
          <Typography
            variant="h6"
            style={{ color: "white", textAlign: "center", padding: "40px" }}
          >
            Quick Links
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Link
                to={{
                  pathname: `/dashboard/suggestion`,
                }}
              >
                <CustomBox styleTextContent="h6" content="Suggestions" />
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link
                to={{
                  pathname: `/dashboard/add`,
                }}
              >
                <CustomBox styleTextContent="h6" content="Add" />
              </Link>
            </Grid>
          </Grid>
        </div>
      </Fragment>
    );
  }
}

const styles = (theme) => ({
title: {
    color: "white",
    paddingTop: "50px",
  },
  
});

const mapStateToProps = ({
  favoriteStorage,
  myListStorage,
  movies,
  tvs,
  currentpage,
}) => ({
  favoriteStorage,
  myListStorage,
  movies,
  tvs,
  currentpage,
});

const mapDispatchToProps = (dispatch) => ({
  loadFavorite: () => dispatch(loadFavorite()),
  loadMyList: () => dispatch(loadMyList()),
  loadMovies: (page) => dispatch(loadMovies(page)),
  loadTvs: (page) => dispatch(loadTvs(page)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(DashboardPage));
