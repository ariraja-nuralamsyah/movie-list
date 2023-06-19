import React, { Component } from "react";
import MovieCard from "./movieCard";
import { Grid, IconButton, Modal, withStyles } from "@material-ui/core";
import thankyou from "../utils/thankyou.png";
import { cardType } from "../constants";
import CloseIcon from "@material-ui/icons/Close";
import {
  saveFavorite,
  loadFavorite,
  saveMyList,
  loadMyList,
  deleteFavorite,
  deleteMyList,
} from "../actions";

import { connect } from "react-redux";

class MovieContainer extends Component {
  componentDidMount() {
    this.props.loadFavorite();
    this.props.loadMyList();
  }
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  addToFavorite = (value) => {
    if (this.isFavorite(value) === false) {
      this.props.saveFavorite(value);
      this.handleOpen();
    } else {
      this.props.deleteFavorite(value.id);
    }
  };

  addToList = (value, username) => {
    if (this.isMyList(value, username) === false) {
      this.props.saveMyList(value, username);
    } else {
      this.props.deleteMyList(value.id, username);
    }
  };

  isFavorite = (value) => {
    if (this.props.favoriteStorage.favorites == null) return false;

    return this.props.favoriteStorage.favorites.some(
      (obj) => obj.id === value.id
    );
  };

  isMyList = (value, username) => {
    if (this.props.myListStorage.mylist.filter((obj) => obj.username === username).length === 0) return false;

    return this.props.myListStorage.mylist
      .filter((obj) => obj.username === username)[0]
      .list.some((obj) => obj.id === value.id);
  };

  render() {
    const { movies, genres, type, auth } = this.props;
    const { classes } = this.props;
    const { open } = this.state;
    return (
      <>
        <Grid container spacing={2}>
          {(type === cardType.SUGGESTION &&
          this.props.favoriteStorage.favorites != null
            ? this.props.favoriteStorage.favorites
            : movies
          ).map((res) => (
            <Grid item xs={3} key={res.id}>
              {type === cardType.SUGGEST ? (
                <MovieCard
                  genres={genres}
                  res={res}
                  type={type}
                  isSuggest={this.isFavorite(res)}
                  onClickSuggest={() => this.addToFavorite(res)}
                  pathName={{
                    pathname: `/home-page/${
                      res.title != null ? "movie" : "tv"
                    }/${res.id}`,
                  }}
                />
              ) : (
                <MovieCard
                  genres={genres}
                  res={res}
                  type={type}
                  isMyList={this.isMyList(res, auth.username)}
                  onClickSuggest={() => this.addToList(res, auth.username)}
                  pathName={{
                    pathname: `/home-page/${
                      res.title != null ? "movie" : "tv"
                    }/${res.id}`,
                  }}
                />
              )}
            </Grid>
          ))}
        </Grid>
        <Modal open={open} onClose={this.handleClose}>
          <div className={classes.modalContainer}>
            <div className={classes.modalContent}>
              <div className={classes.closeButtonContainer}>
                <IconButton
                  className={classes.closeButton}
                  onClick={this.handleClose}
                >
                  <CloseIcon className={classes.closeIcon} />
                </IconButton>
              </div>
              <div className={classes.container}>
                <img src={thankyou} alt="Thankyou" className={classes.image} />
              </div>
              <h1 style={{ color: "white", textAlign: "center" }}>
                Thank you for your suggestion
              </h1>
              <h6
                style={{ color: "rgba(142, 149, 169, 1)", textAlign: "center" }}
              >
                Your suggestion has been succesfully added to <br />
                my watchlist, I will manage sometime to watch <br />
                your suggestion. ❤
              </h6>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}


const styles = (theme) => ({
container: {
    display: "flex",
    justifyContent: "center",
    /* Additional styles for the container */
  },
  image: {
    width: "30%",
    height: "30%",
  },
  modalContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor:
      "rgba(32, 40, 62, 0.8)" /* Adjust the background color and opacity as desired */,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "rgba(32, 40, 62, 0.8)",
    padding: "20px",
    borderRadius: "4px",
    textAlign: "center",
    position: "relative",
  },
  closeButtonContainer: {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor:
      "rgba(0, 0, 0, 0.3)" 
  },
  closeIcon: {
    color: "#fff",
  },
});

const mapStateToProps = ({
  favoriteData,
  favoriteStorage,
  myListStorage,
  favorites,
  auth,
}) => ({
  favoriteData,
  favoriteStorage,
  myListStorage,
  favorites,
  auth,
});

const mapDispatchToProps = (dispatch) => ({
  saveFavorite: (favorites) => dispatch(saveFavorite(favorites)),
  loadFavorite: () => dispatch(loadFavorite()),
  saveMyList: (mylist, username) => dispatch(saveMyList(mylist, username)),
  loadMyList: () => dispatch(loadMyList()),
  deleteFavorite: (movieId) => dispatch(deleteFavorite(movieId)),
  deleteMyList: (movieId, username) =>
    dispatch(deleteMyList(movieId, username)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(MovieContainer));
