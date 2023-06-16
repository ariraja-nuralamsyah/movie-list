import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Navbar from "./navbar";
import MovieContainer from "./movie-container";
import {
  loadMovies,
  loadTvs,
  loadGenre,
  setQuerySearchMovie,
  setQuerySearchTv,
  loadSearchMovies,
  loadSearchTv,
} from "../actions";
import { cardType, navbarType } from "../constants";
import { Typography, withStyles, Tabs, Tab, Modal, IconButton } from "@material-ui/core";
import CustomInput from "./customInput";
import SearchIcon from "@material-ui/icons/Search";
import CustomButton from "./customButton";
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
      this.props.loadGenre();
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
    this.setState({ tabValue: newValue});
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
    } else if(value === 2 || value === "tv"){
      return "Search TV Shows";
    } else{
      return "Search Movies or TV Shows";
    }
  }

  getTypeContent = (value) => {
    if(value === 'movie'){
      return 'Movies';
    }else if (value === "tv") {
      return "TV Shows";
    } else if (value === "add") {
      return "Add new item";
    } else if (value === "suggestion") {
      return "Suggestions";
    } else {
      return "Suggest me";
    }
  }

  getParamStatus = (value) => {
    if (value === "suggest") {
      return cardType.SUGGEST;
    } else if (value === "suggestion") {
      return cardType.SUGGESTION;
    } else if (value === "add") {
      return cardType.ADD;
    }else {
      return cardType.DEFAULT;
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    if (
      this.props.error !== null ||
      (this.props.match.params.status !== "movie" &&
        this.props.match.params.status !== "tv" &&
        this.props.match.params.status !== "suggest" &&
        this.props.match.params.status !== "suggestion" &&
        this.props.match.params.status !== "add" &&
        this.props.match.params.status != null)
    ) {
      this.props.history.push("/not-found");
    }
    const { searchValue, tabValue, tabContent, open } = this.state;
    const { classes } = this.props;
    let movieTodisplay = [];
    let totalMovies = 0;
    const {
      movies,
      genres,
      tvs,
      searchmovies,
      searchtv,
    } = this.props;

    if (this.props.match.params.status == null){
      if (tabValue === 0) {
        if (searchmovies.length === 0 && searchtv.length === 0) {
          movieTodisplay = [...movies, ...tvs];
          totalMovies = movieTodisplay.length;
        } else {
          movieTodisplay = [...searchmovies, ...searchtv];
          totalMovies = searchmovies.length;
        }
      } else if (tabValue === 1) {
        if (searchmovies.length === 0) {
          movieTodisplay = movies;
          totalMovies = movieTodisplay.length;
        } else {
          movieTodisplay = searchmovies;
          totalMovies = searchmovies.length;
        }
      } else if (tabValue === 2) {
        if (searchtv.length === 0) {
          movieTodisplay = tvs;
          totalMovies = tvs.length;
        } else {
          movieTodisplay = searchtv;
          totalMovies = searchtv.length;
        }
      }
    }else{
      if (this.props.match.params.status === "movie") {
        if (searchmovies.length === 0 ) {
          movieTodisplay = movies;
          totalMovies = movieTodisplay.length;
        } else {
          movieTodisplay = searchmovies;
          totalMovies = searchmovies.length;
        }
      } else if (this.props.match.params.status === "tv") {
        if (searchtv.length === 0) {
          movieTodisplay = tvs;
          totalMovies = tvs.length;
        } else {
          movieTodisplay = searchtv;
          totalMovies = searchtv.length;
        }
      }else{
        if (searchmovies.length === 0 && searchtv.length === 0) {
          if (this.props.match.params.status === "suggestion"){
            movieTodisplay = [...movies, ...tvs];
            totalMovies = movieTodisplay.length;
          }else{
            movieTodisplay = [];
            totalMovies = movieTodisplay.length;
          } 
        } else {
          movieTodisplay = [...searchmovies, ...searchtv];
          totalMovies = searchmovies.length;
        }
      }
    }
    return (
      <Fragment>
        {this.props.match.params.status === "add" ||
        this.props.match.params.status === "suggestion" ? (
          <Navbar type={navbarType.DASHBOARD} />
        ) : (
          <Navbar type={navbarType.HOME} />
        )}

        {this.props.match.params.status == null ? (
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
            {this.props.match.params.status === "suggest" ? (
              <>
                <Typography variant="h3" className={classes.title}>
                  {this.getTypeContent(this.props.match.params.status)}
                </Typography>
                <Typography variant="body1" className={classes.subTitle}>
                  I will really appericiate it if you take time to suggest me
                  something good to watch.
                </Typography>
              </>
            ) : (
              <>
                {this.props.match.params.status === "add" ||
                this.props.match.params.status === "suggestion" ? (
                  <>
                    <Typography variant="h3" className={classes.title}>
                      {this.getTypeContent(this.props.match.params.status)}
                    </Typography>
                    <br />
                  </>
                ) : (
                  <>
                    <Typography variant="body1" className={classes.subTitle2}>
                      MaileHereko
                    </Typography>
                    <Typography variant="h3" className={classes.title2}>
                      {this.getTypeContent(this.props.match.params.status)}
                    </Typography>
                  </>
                )}
              </>
            )}
          </>
        )}
        <div
          style={
            this.props.match.params.status === "suggest" ||
            this.props.match.params.status === "add"
              ? { position: "relative", display: "inline-flex" }
              : {}
          }
        >
          {this.props.match.params.status !== "suggestion" ? (
            <div style={{ width: "334px" }}>
              <CustomInput
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChangeSearch}
                value={searchValue}
                placeholder={this.getPlaceHolderSearchInput(
                  this.props.match.params.status == null
                    ? tabValue
                    : this.props.match.params.status
                )}
                leftIcon={
                  <SearchIcon style={{ color: "rgba(71, 80, 105, 1)" }} />
                }
              />
            </div>
          ) : (
            <></>
          )}

          {this.props.match.params.status === "suggest" ||
          this.props.match.params.status === "add" ? (
            <CustomButton
              label="Search"
              color="primary"
              variant="contained"
              onClick={() => {
                this.props.setQuerySearchMovie(this.state.searchValue);
                this.props.loadSearchMovies(1);
                this.props.setQuerySearchTv(this.state.searchValue);
                this.props.loadSearchTv(1);
              }}
            />
          ) : (
            <></>
          )}
        </div>
        {this.props.match.params.status == null ? (
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
        {this.props.match.params.status !== "suggest" &&
        this.props.match.params.status !== "add" &&
        this.props.match.params.status !== "suggestion" ? (
          <>
            <Typography variant="h5" className={classes.typeContent} noWrap>
              {this.props.match.params == null
                ? { tabContent }({ totalMovies })
                : totalMovies + " items"}
            </Typography>
          </>
        ) : (
          <>
            <br />
            <br />
          </>
        )}

        <MovieContainer
          genres={genres}
          movies={movieTodisplay}
          type={
            this.getParamStatus(this.props.match.params.status)
          }
        />

        {this.props.match.params.status === "suggest" &&
        movieTodisplay.length !== 0 ? (
          <div style={{ paddingBottom: "100px" }}>
            <h6
              style={{ color: "rgba(118, 126, 148, 1)", textAlign: "center" }}
            >
              Didin't find the one you looking for?
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
                // handleSubmit={this.handleSubmit}
                // handleChange={this.handleChangeSearch}
                // value={searchValue}
                placeholder="Title"
                leftIcon={
                  <Subscriptions style={{ color: "rgba(71, 80, 105, 1)" }} />
                }
              />
              <br />
              <CustomInput
                // handleSubmit={this.handleSubmit}
                // handleChange={this.handleChangeSearch}
                // value={searchValue}
                placeholder="Link (if available)"
                leftIcon={<Link style={{ color: "rgba(71, 80, 105, 1)" }} />}
              />
              <br />
              <div className={classes.container}>
                <CustomButton
                  label="Suggest"
                  color="primary"
                  variant="contained"
                  // onClick={() => props.history.push("/")}
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          </div>
        </Modal>
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
  genres,
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
  genres,
  searchquery,
  searchpage,
});

const mapDispatchToProps = (dispatch) => ({
  loadMovies: (page) => dispatch(loadMovies(page)),
  loadTvs: (page) => dispatch(loadTvs(page)),
  loadGenre: () => dispatch(loadGenre()),
  setQuerySearchMovie: (query) => dispatch(setQuerySearchMovie(query)),
  setQuerySearchTv: (query) => dispatch(setQuerySearchTv(query)),
  loadSearchMovies: (id) => dispatch(loadSearchMovies(id)),
  loadSearchTv: (id) => dispatch(loadSearchTv(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(MainPage));
