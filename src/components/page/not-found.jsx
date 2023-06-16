import React from "react";
import Navbar from "../navbar";
import { navbarType } from "../../constants";
import notFound from "../../utils/404_not_found.png";
import { makeStyles } from "@material-ui/core";
import CustomButton from "../customButton";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    /* Additional styles for the container */
  },
  image: {
    width: "30%",
    height: "30%",
  },
}));

const NotFound = props => {
  const classes = useStyles();
  return (
    <div>
      <Navbar type={navbarType.HOME} />
      <div className={classes.container}>
        <img src={notFound} alt="Not Found" className={classes.image} />
      </div>
      <h1 style={{ color: "white", textAlign: "center" }}>Lost your way?</h1>
      <h6 style={{ color: "rgba(142, 149, 169, 1)", textAlign: "center" }}>
        Oops! This is awkward. You are looking for something that doesn't
        actually exist.
      </h6>
      <div className={classes.container}>
        <CustomButton
          label="Go Home"
          color="primary"
          variant="contained"
          onClick={() => props.history.push("/")}
          style={{ textAlign: "center" }}
        />
      </div>
    </div>
  );
};

export default NotFound;
