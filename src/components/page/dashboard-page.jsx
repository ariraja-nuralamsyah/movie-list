import React, { Component, Fragment } from "react";
import Navbar from "../navbar";
import "../../utils/myCss.css";
import { navbarType } from "../../constants";
import { Grid, Typography, withStyles } from "@material-ui/core";
import { Link } from "react-router-dom/cjs/react-router-dom";
import {
  loadMovies,
  loadTvs,
  loadFavorite,
  loadMyList,
} from "../../actions";
import { connect } from "react-redux";

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
        <div
          style={{
            padding: "0px 100px 0px",
          }}
        >
          <Typography variant="h3" className={classes.title}>
            Welcome
          </Typography>
          <br />
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <div className={classes.box}>
                <div style={{ color: "white", textAlign: "center" }}>
                  <h2>{this.props.movies.length}</h2>
                  <p>Movies</p>
                </div>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div className={classes.box}>
                <div style={{ color: "white", textAlign: "center" }}>
                  <h3>{this.props.tvs.length}</h3>
                  <p>TV Shows</p>
                </div>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div className={classes.box}>
                <div style={{ color: "white", textAlign: "center" }}>
                  <h2>{this.props.favoriteStorage.favorites.length}</h2>
                  <p>Suggestions</p>
                </div>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div className={classes.box}>
                <div style={{ color: "white", textAlign: "center" }}>
                  <h2>{this.props.myListStorage.mylist.length}</h2>
                  <p>My Movie List</p>
                </div>
              </div>
            </Grid>
          </Grid>
          <h5
            style={{ color: "white", textAlign: "center", paddingTop: "30px" }}
          >
            Quick Links
          </h5>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Link
                to={{
                  pathname: `/dashboard/suggestion`,
                }}
              >
                <div className={classes.box}>
                  <div style={{ color: "white", textAlign: "center" }}>
                    <h4>Suggestions</h4>
                  </div>
                </div>
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link
                to={{
                  pathname: `/dashboard/add`,
                }}
              >
                <div className={classes.box}>
                  <div style={{ color: "white", textAlign: "center" }}>
                    <h4>Add</h4>
                  </div>
                </div>
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
  box: {
    backgroundColor: "rgba(18, 24, 50, 1)",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
