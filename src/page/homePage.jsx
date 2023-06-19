import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Navbar from "../components/navbar";
import MovieContainer from "./../components/movieContainer";
import {
  loadMovies,
  loadTvs,
  setQuerySearchMovie,
  setQuerySearchTv,
  loadSearchMovies,
  loadSearchTv,
} from "../actions";
import { cardType, navbarType } from "../constants";
import { Typography, withStyles, Tabs, Tab, Modal, IconButton } from "@material-ui/core";
import CustomInput from "../components/customInput";
import SearchIcon from "@material-ui/icons/Search";
import CustomButton from "../components/customButton";
import CloseIcon from "@material-ui/icons/Close";
import { Link, Subscriptions } from "@material-ui/icons";

class MainPage extends Component {
  componentDidMount() {
    if (
      this.props.match.params.status !== "suggest" &&
      this.props.match.params.status !== "add"
    ) {
      this.props.loadMovies(this.props.currentpage);
      this.props.loadTvs(this.props.currentpage);
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      tabValue: 0,
      tabContent: "All",
      open: false,
    };
  }

  handleChangeSearch = (event) => {
    this.setState({ searchValue: event.target.value });
  };

  handleChangeTab = (event, newValue) => {
    if (newValue === 0) {
      this.props.loadMovies(this.props.currentpage);
      this.props.loadTvs(this.props.currentpage);
      this.setState({ tabContent: "All" });
    } else if (newValue === 1) {
      this.props.loadMovies(this.props.currentpage);
      this.setState({ tabContent: "Movie" });
    } else {
      this.props.loadTvs(this.props.currentpage);
      this.setState({ tabContent: "TV Show" });
    }
    this.setState({ tabValue: newValue });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.tabValue === 0) {
      this.props.setQuerySearchMovie(this.state.searchValue);
      this.props.loadSearchMovies(1);
      this.props.setQuerySearchTv(this.state.searchValue);
      this.props.loadSearchTv(1);
    } else if (this.state.tabValue === 1) {
      this.props.setQuerySearchMovie(this.state.searchValue);
      this.props.loadSearchMovies(1);
    } else {
      this.props.setQuerySearchTv(this.state.searchValue);
      this.props.loadSearchTv(1);
    }
  };

  getPlaceHolderSearchInput = (value) => {
    if (value === 0) {
      return "Search Movies or TV Shows";
    } else if (value === 1 || value === "movie") {
      return "Search Movies";
    } else if (value === 2 || value === "tv") {
      return "Search TV Shows";
    } else {
      return "Search Movies or TV Shows";
    }
  };

  getTypeContent = (value) => {
    if (value === "movie") {
      return "Movies";
    } else if (value === "tv") {
      return "TV Shows";
    } else if (value === "add") {
      return "Add new item";
    } else if (value === "suggestion") {
      return "Suggestions";
    } else {
      return "Suggest me";
    }
  };

  getParamStatus = (value) => {
    if (value === "suggest") {
      return cardType.SUGGEST;
    } else if (value === "suggestion") {
      return cardType.SUGGESTION;
    } else if (value === "add") {
      return cardType.ADD;
    } else {
      return cardType.DEFAULT;
    }
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  checkStatusParams = (status) => {
    if (
      this.props.error !== null ||
      (status !== "movie" &&
        status !== "tv" &&
        status !== "suggest" &&
        status !== "suggestion" &&
        status !== "add" &&
        status != null)
    ) {
      this.props.history.push("/not-found");
    }
  };

  getDisplayData = (movies, tvs, searchmovies, searchtv, tabValue) => {
    const { status } = this.props.match.params;
    const isMovieSearch = searchmovies.length === 0;
    const isTvSearch = searchtv.length === 0;
    const isALlSearch = isMovieSearch && isTvSearch;
    if (tabValue !== null) {
      switch (tabValue) {
        case 0:
          return isALlSearch
            ? [...movies, ...tvs]
            : [...searchmovies, ...searchtv];
        case 1:
          return isMovieSearch ? movies : searchmovies;
        case 2:
          return isTvSearch ? tvs : searchtv;
        default:
          return [];
      }
    } else {
      switch (status) {
        case "movie":
          return isMovieSearch ? movies : searchmovies;
        case "tv":
          return isTvSearch ? tvs : searchtv;
        case "suggestion":
          return [...movies, ...tvs];
        case "add":
          return !isALlSearch ? [...searchmovies, ...searchtv] : [];
        default:
          return [];
      }
    }
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.handleSubmit(e);
    }
  };

  render() {
    const { searchValue, tabValue, tabContent, open } = this.state;
    const { classes } = this.props;
    const { movies, tvs, searchmovies, searchtv } = this.props;
    const { status } = this.props.match.params;
    this.checkStatusParams(status);
    let movieTodisplay = this.getDisplayData(
      movies,
      tvs,
      searchmovies,
      searchtv,
      status !== undefined ? null : tabValue
    );
    let totalMovies = movieTodisplay.length;
    return (
      <Fragment>
        {status === "add" || status === "suggestion" ? (
          <Navbar type={navbarType.DASHBOARD} />
        ) : (
          <Navbar type={navbarType.HOME} />
        )}
        <div className="padding-body">
          {status == null ? (
            <>
              <Typography variant="h3" className={classes.title}>
                MaileHereko
              </Typography>
              <Typography variant="body1" className={classes.subTitle}>
                List of movies and TV Shows, I, Pramod Poudel have watched till
                date.
                <br />
                Explore what I have watched and also feel free to make a
                suggestion. 😉
              </Typography>
            </>
          ) : (
            <>
              {status === "suggest" ? (
                <>
                  <Typography variant="h3" className={classes.title}>
                    {this.getTypeContent(status)}
                  </Typography>
                  <Typography variant="body1" className={classes.subTitle}>
                    I will really appreciate it if you take time to suggest me
                    something good to watch.
                  </Typography>
                </>
              ) : (
                <>
                  {status === "add" || status === "suggestion" ? (
                    <>
                      <Typography variant="h3" className={classes.title}>
                        {this.getTypeContent(status)}
                      </Typography>
                      <br />
                    </>
                  ) : (
                    <>
                      <Typography variant="body1" className={classes.subTitle2}>
                        MaileHereko
                      </Typography>
                      <Typography variant="h3" className={classes.title2}>
                        {this.getTypeContent(status)}
                      </Typography>
                    </>
                  )}
                </>
              )}
            </>
          )}
          <div
            style={
              status === "suggest" || status === "add"
                ? { position: "relative", display: "inline-flex" }
                : {}
            }
          >
            {status !== "suggestion" ? (
              <div style={{ width: "334px" }}>
                <CustomInput
                  handleSubmit={this.handleSubmit}
                  handleChange={this.handleChangeSearch}
                  handleKeyPress={this.handleKeyPress}
                  value={searchValue}
                  placeholder={this.getPlaceHolderSearchInput(
                    status == null ? tabValue : status
                  )}
                  leftIcon={
                    <SearchIcon style={{ color: "rgba(71, 80, 105, 1)" }} />
                  }
                />
              </div>
            ) : (
              <></>
            )}

            {status === "suggest" || status === "add" ? (
              <CustomButton
                label="Search"
                color="primary"
                variant="contained"
                onClick={() => {
                  this.props.setQuerySearchMovie(searchValue);
                  this.props.loadSearchMovies(1);
                  this.props.setQuerySearchTv(searchValue);
                  this.props.loadSearchTv(1);
                }}
              />
            ) : (
              <></>
            )}
          </div>
          {status == null ? (
            <div className={classes.tab}>
              <Tabs
                value={tabValue}
                onChange={this.handleChangeTab}
                TabIndicatorProps={{ className: classes.indicator }}
              >
                <Tab
                  label="All"
                  className={
                    tabValue === 0 ? classes.activeTab : classes.transparentTab
                  }
                />
                <Tab
                  label="Movie"
                  className={
                    tabValue === 1 ? classes.activeTab : classes.transparentTab
                  }
                />
                <Tab
                  label="TV Show"
                  className={
                    tabValue === 2 ? classes.activeTab : classes.transparentTab
                  }
                />
              </Tabs>
            </div>
          ) : (
            <></>
          )}
          {status !== "suggest" &&
          status !== "add" &&
          status !== "suggestion" ? (
            <>
              <Typography variant="h5" className={classes.typeContent} noWrap>
                {status == null ? (
                  <>
                    {tabContent}
                    <span style={{ fontSize: "0.6em" }}>({totalMovies})</span>
                  </>
                ) : (
                  totalMovies + " items"
                )}
              </Typography>
            </>
          ) : (
            <>
              <br />
              <br />
            </>
          )}

          <MovieContainer
            movies={movieTodisplay}
            type={this.getParamStatus(status)}
          />

          {status === "suggest" && movieTodisplay.length !== 0 ? (
            <div style={{ paddingBottom: "100px" }}>
              <h6
                style={{ color: "rgba(118, 126, 148, 1)", textAlign: "center" }}
              >
                Didn't find the one you're looking for?
              </h6>
              <div className={classes.container}>
                <CustomButton
                  label="Suggest Manually"
                  color="primary"
                  variant="contained"
                  onClick={this.handleOpen}
                  style={{ textAlign: "center" }}
                />
              </div>
            </div>
          ) : (
            <>
              <br />
              <br />
            </>
          )}
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
                <h4 style={{ color: "white", textAlign: "center" }}>
                  Suggest something to watch
                </h4>
                <CustomInput
                  placeholder="Title"
                  leftIcon={
                    <Subscriptions style={{ color: "rgba(71, 80, 105, 1)" }} />
                  }
                />
                <br />
                <CustomInput
                  placeholder="Link (if available)"
                  leftIcon={<Link style={{ color: "rgba(71, 80, 105, 1)" }} />}
                />
                <br />
                <div className={classes.container}>
                  <CustomButton
                    label="Suggest"
                    color="primary"
                    variant="contained"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </Fragment>
    );
  }
}

const styles = (theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    /* Additional styles for the container */
  },
  tab: {
    flexGrow: 1,
    marginTop: "50px",
    display: "inline-block",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    padding: "10px",
  },
  title: {
    color: "white",
    paddingTop: "50px",
  },
  subTitle: {
    color: "rgba(142, 149, 169, 1)",
    paddingTop: "10px",
    paddingBottom: "20px",
  },
  title2: {
    color: "white",
    paddingBottom: "20px",
  },
  title3: {
    color: "white",
    paddingTop: "50px",
    paddingBottom: "20px",
  },
  subTitle2: {
    paddingTop: "50px",
    color: "rgba(142, 149, 169, 1)",
    fontSize: "11px",
  },
  transparentTab: {
    backgroundColor: "transparent",
    color: "rgba(235, 233, 254, 1)",
    borderRadius: theme.spacing(1),
    minWidth: "100px",
    textTransform: "none",
  },
  activeTab: {
    backgroundColor: "rgba(123, 110, 246, 1)",
    color: "rgba(235, 233, 254, 1)",
    borderRadius: theme.spacing(1),
    minWidth: "100px",
    textTransform: "none",
  },
  indicator: {
    display: "none",
  },
  typeContent: {
    paddingTop: "20px",
    paddingBottom: "10px",
    color: "rgba(118, 126, 148, 1)",
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
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  closeIcon: {
    color: "#fff",
  },
});

const mapStateToProps = ({
  loading,
  movies,
  tvs,
  error,
  currentpage,
  searchmovies,
  searchtv,
  totalresults,
  searchquery,
  searchpage,
}) => ({
  loading,
  movies,
  tvs,
  error,
  currentpage,
  searchmovies,
  searchtv,
  totalresults,
  searchquery,
  searchpage,
});

const mapDispatchToProps = (dispatch) => ({
  loadMovies: (page) => dispatch(loadMovies(page)),
  loadTvs: (page) => dispatch(loadTvs(page)),
  setQuerySearchMovie: (query) => dispatch(setQuerySearchMovie(query)),
  setQuerySearchTv: (query) => dispatch(setQuerySearchTv(query)),
  loadSearchMovies: (id) => dispatch(loadSearchMovies(id)),
  loadSearchTv: (id) => dispatch(loadSearchTv(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(MainPage));
