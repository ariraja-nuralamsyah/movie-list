import { Card, CardMedia, Typography, CardContent,  Box, makeStyles } from "@material-ui/core";
import React from "react";
import StarIcon from "@material-ui/icons/StarBorder";
import { cardType } from "../constants";
import { Add, CloudDone, ThumbUpAlt } from "@material-ui/icons";
import CustomButton from "./customButton";
import { Link } from "react-router-dom/cjs/react-router-dom";

const useStyles = makeStyles((theme) => ({
  titleCard: {
    color: "white",
    padding: "5px 5px 20px",
  },
  cardGridContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    alignItems: "stretch",
  },
  card: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    textAlign: "left",
    backgroundColor: "rgba(32, 40, 62, 0.8)",
    borderRadius: "8px",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: "8px",
  },
  rating: {
    position: "absolute",
    top: theme.spacing(2),
    left: theme.spacing(2),
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "rgba(255, 173, 73, 1)",
    padding: theme.spacing(1),
    borderRadius: theme.spacing(0.5),
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  suggestThis: {
    position: "absolute", 
    bottom: 0, 
    left: 0, 
    borderRadius: theme.spacing(0.5),
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
    color: "rgba(123, 110, 246, 1)",
  },
  starIcon: {
    marginRight: theme.spacing(0.5),
  },
  imageContainer: {
    height: "400px",
  },
}));

const MovieCard = props => {
  const imgUrl = "https://image.tmdb.org/t/p/w500";
  const { res, type, onClickSuggest, isSuggest, isMyList, pathName } = props;
  const classes = useStyles();

  return (
    <div className={classes.cardGridContainer}>
      <Card className={classes.card}>
        <div className={classes.rating}>
          <StarIcon className={classes.starIcon} />
          <Typography variant="body2">{res.vote_average}</Typography>
        </div>
        <Link to={pathName}>
          <Box
            p={1}
            display="flex"
            justifyContent="center"
            className={classes.imageContainer}
          >
            <CardMedia
              component="img"
              image={imgUrl + res.poster_path}
              alt="..."
              className={classes.image}
              onError={(e) => {
                e.target.src =
                  "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg";
              }}
            />
          </Box>
        </Link>
        <CardContent style={{height: "130px"}}>
          <Typography
            variant="body1"
            component="h2"
            className={classes.titleCard}
          >
            {res.title == null ? res.original_name : res.title}
          </Typography>
          {type === cardType.SUGGEST ? (
            <div className={classes.suggestThis}>
              <CustomButton
                color="inherit"
                leftIcon={
                  <ThumbUpAlt
                    className={classes.starIcon}
                    style={{ color: "" }}
                  />
                }
                label={isSuggest === false ? "Suggest This" : "Suggested"}
                onClick={onClickSuggest}
              />
            </div>
          ) : (
            <></>
          )}
          {type === cardType.SUGGESTION || type === cardType.ADD ? (
            <div className={classes.suggestThis}>
              <CustomButton
                color="inherit"
                leftIcon={
                  isMyList === false ? (
                    <Add className={classes.starIcon} />
                  ) : (
                    <CloudDone className={classes.starIcon} />
                  )
                }
                label={
                  isMyList === false ? "Add to my list" : "Already watched"
                }
                onClick={onClickSuggest}
                style={
                  isMyList === false
                    ? { color: "rgba(123, 110, 246, 1)" }
                    : { color: "rgba(55, 216, 167, 1)" }
                }
              />
            </div>
          ) : (
            <></>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MovieCard;
