import React, { Fragment } from "react";
import Navbar from "./navbar";
import "../utils/myCss.css";
import { navbarType } from "../constants";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import loginIcon from "../utils/login_icon.png";
import CustomInput from "./customInput";
import { Email, LockOpen } from "@material-ui/icons";
import CustomButton from "./customButton";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    /* Additional styles for the container */
  },
  image: {
    width: "90%",
    height: "90%",
  },
  title: {
    color: "white",
  },
}));

const LoginPage = props => {
    const classes = useStyles();
    return (
      <Fragment>
        <Navbar type={navbarType.DASHBOARD} />
        <Grid
          container
          spacing={3}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={6}>
            <div className={classes.container}>
              <img src={loginIcon} alt="Thankyou" className={classes.image} />
            </div>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h3" className={classes.title}>
              Login
            </Typography>
            <br />
            <CustomInput
              // handleSubmit={this.handleSubmit}
              // handleChange={this.handleChangeSearch}
              // value={searchValue}
              placeholder="Title"
              leftIcon={<Email style={{ color: "rgba(71, 80, 105, 1)" }} />}
            />
            <br />
            <CustomInput
              // handleSubmit={this.handleSubmit}
              // handleChange={this.handleChangeSearch}
              // value={searchValue}
              placeholder="Link (if available)"
              leftIcon={<LockOpen style={{ color: "rgba(71, 80, 105, 1)" }} />}
            />
            <br />
            <div className={classes.container}>
              <CustomButton
                label="Suggest"
                color="primary"
                variant="contained"
                style={{ width: "100%" }}
                // onClick={() => props.history.push("/")}
              />
            </div>
          </Grid>
        </Grid>
      </Fragment>
    );
}

export default LoginPage;
