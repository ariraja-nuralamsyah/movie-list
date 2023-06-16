import { Box, Grid, Typography, makeStyles } from "@material-ui/core";
import React from "react";
import Navbar from "./navbar";
import { navbarType } from "../constants";
import { StarBorder } from "@material-ui/icons";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  box: {
    position: "relative",
    width: "100%",
    height: 300,
    borderRadius: theme.spacing(4),
    overflow: "hidden", // Mengatur gambar terpotong saat melebihi batas div container
    margin: "0 auto", // Mengatur div container menjadi di tengah
  },
  box2: {
    width: "100%",
    height: "450px",
    borderRadius: theme.spacing(4),
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: theme.spacing(4),
    objectFit: "cover",
  },
  image2: {
    width: "100%",
    height: "100%",
    borderRadius: theme.spacing(2),
    objectFit: "fill",
  },
  caption: {
    position: "absolute",
    top: 330,
    left: theme.spacing(25),
    backgroundColor: "rgba(32, 40, 62, 0.8)",
    padding: "20px",
    borderRadius: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
    zIndex: 1,
    width: "25%",
  },
  title: {
    color: "white",
  },
  subTitle: {
    color: "white",
    fontSize: "10px",
  },
  grid: {
    paddingLeft: theme.spacing(12.5),
    paddingRight: theme.spacing(15),
    paddingTop: "100px",
  },
  titleInfo: {
    paddingTop: "15px",
  },
  info: {
    paddingTop: "5px",
  },
  rating: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "rgba(255, 173, 73, 1)",
    padding: theme.spacing(1),
    borderRadius: theme.spacing(0.5),
    display: "flex",
    alignItems: "center",
    width: "10%",
  },
  starIcon: {
    marginRight: theme.spacing(0.5),
  },
}));

const numberTogenre = (genres) => {
  let genNames = [];
  if(genres !== undefined){
    genres.map((res, index) =>
      index === 0 ? genNames.push(res.name) : genNames.push(', '+res.name)
    );
  }
  

  return genNames;
};

const printRoute = (route) => {
  const pathArray = route.split("/").slice(1, -1);

  const formattedPath = pathArray.map((item) => {
    // Capitalize the first letter and replace hyphens with spaces
    const formattedItem = item.charAt(0).toUpperCase() + item.slice(1);
    return formattedItem;
  });
  const formattedString = formattedPath.join(" / ");

  return formattedString;
};

const getTypeContent = (route) => {
  const pathArray = route.split("/").slice(1, -1);

  const formattedPath = pathArray.map((item) => {
    // Capitalize the first letter and replace hyphens with spaces
    const formattedItem = item.charAt(0).toUpperCase() + item.slice(1);
    return formattedItem;
  });

  return formattedPath[1];
}

const Amovie = ({ movieinfo }) => {
  const classes = useStyles();
  const location = useLocation();
  const imgUrl = "https://image.tmdb.org/t/p/w300";
  return (
    <div>
      <Navbar type={navbarType.HOME} />
      <div>
        <div className={classes.caption}>
          <div className={classes.captionContainer}>
            <Typography variant="body1" className={classes.subTitle}>
              {printRoute(location.pathname)}
            </Typography>
            <Typography variant="h4" className={classes.title}>
              {movieinfo.original_title != null
                ? movieinfo.original_title
                : movieinfo.name}
            </Typography>
          </div>
        </div>
        <Box
          p={1}
          display="flex"
          justifyContent="center"
          className={classes.box}
        >
          <img
            className={classes.image}
            src={imgUrl + movieinfo.backdrop_path}
            alt="Gambar"
          />
        </Box>
      </div>
      <div className={classes.grid}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Box
              p={1}
              display="flex"
              justifyContent="center"
              className={classes.box2}
            >
              <img
                className={classes.image2}
                src={imgUrl + movieinfo.backdrop_path}
                alt="Gambar"
              />
            </Box>
          </Grid>
          <Grid item xs={8} style={{ paddingLeft: "30px" }}>
            <div className="col-9 movieInfo">
              <h1 style={{ width: "100%" }}>
                {movieinfo.tagline !== ""
                  ? movieinfo.tagline
                  : "Not Have Tagline"}
              </h1>
              <p>{movieinfo.overview}</p>
              <div>
                <div style={{ paddingTop: "15px", paddingBottom: "15px" }}>
                  <div className={classes.rating}>
                    <StarBorder className={classes.starIcon} />
                    <Typography variant="body2">
                      {movieinfo.vote_average}
                    </Typography>
                  </div>
                </div>
                {getTypeContent(location.pathname) === "Movie" ? (
                  <>
                    <Typography variant="body1" className={classes.titleInfo}>
                      Type
                    </Typography>
                    <Typography variant="h6" className={classes.info}>
                      Movie
                    </Typography>
                    <Typography variant="body1" className={classes.titleInfo}>
                      Release Date
                    </Typography>
                    <Typography variant="h6" className={classes.info}>
                      {movieinfo.release_date}
                    </Typography>
                    <Typography variant="body1" className={classes.titleInfo}>
                      Run time
                    </Typography>
                    <Typography variant="h6" className={classes.info}>
                      {movieinfo.runtime} min
                    </Typography>
                    <Typography variant="body1" className={classes.titleInfo}>
                      Genres
                    </Typography>
                    <Typography variant="h6" className={classes.info}>
                      {numberTogenre(movieinfo.genres)}
                    </Typography>
                  </>
                ) : (
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <Typography variant="body1" className={classes.titleInfo}>
                        Type
                      </Typography>
                      <Typography variant="h6" className={classes.info}>
                        Tv Show
                      </Typography>
                      <Typography variant="body1" className={classes.titleInfo}>
                        First air date
                      </Typography>
                      <Typography variant="h6" className={classes.info}>
                        {movieinfo.first_air_date}
                      </Typography>
                      <Typography variant="body1" className={classes.titleInfo}>
                        No. of Seasons
                      </Typography>
                      <Typography variant="h6" className={classes.info}>
                        {movieinfo.number_of_seasons}
                      </Typography>
                      <Typography variant="body1" className={classes.titleInfo}>
                        Episode run time
                      </Typography>
                      <Typography variant="h6" className={classes.info}>
                        {movieinfo.episode_run_time} min
                      </Typography>
                      <Typography variant="body1" className={classes.titleInfo}>
                        Genres
                      </Typography>
                      <Typography variant="h6" className={classes.info}>
                        {numberTogenre(movieinfo.genres)}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1" className={classes.titleInfo}>
                        Status
                      </Typography>
                      <Typography variant="h6" className={classes.info}>
                        {movieinfo.status}
                      </Typography>
                      <Typography variant="body1" className={classes.titleInfo}>
                        Last air date
                      </Typography>
                      <Typography variant="h6" className={classes.info}>
                        {movieinfo.last_air_date}
                      </Typography>
                      <Typography variant="body1" className={classes.titleInfo}>
                        No. of episodes
                      </Typography>
                      <Typography variant="h6" className={classes.info}>
                        {movieinfo.number_of_episodes}
                      </Typography>
                    </Grid>
                  </Grid>
                )}
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Amovie;
