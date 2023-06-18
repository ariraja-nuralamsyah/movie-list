import React, { Fragment, useState } from "react";
import Navbar from "../navbar";
import "../../utils/myCss.css";
import { navbarType } from "../../constants";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import loginIcon from "../../utils/login_icon.png";
import CustomInput from "../customInput";
import { Email, LockOpen } from "@material-ui/icons";
import CustomButton from "../customButton";
import { loginRequest } from "./../../actions";
import { connect } from "react-redux";

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

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

     const { handleLogin, error } = props;

     const handleSubmit = (e) => {
       e.preventDefault();
       handleLogin(username, password);
     };

     const handleKeyPress = (e) => {
       if (e.key === "Enter") {
         handleSubmit(e);
       }
     };
  
    return (
      <Fragment>
        <Navbar type={navbarType.DASHBOARD} />
        <div
          style={{
            padding: "0px 100px 0px",
          }}
        >
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
              {error && <p style={{ color: "red" }}>{error}</p>}
              <Typography variant="h3" className={classes.title}>
                Login
              </Typography>
              <form onSubmit={handleSubmit}>
                <CustomInput
                  placeholder="Username / Email"
                  leftIcon={<Email style={{ color: "rgba(71, 80, 105, 1)" }} />}
                  value={username}
                  handleChange={(e) => setUsername(e.target.value)}
                  handleKeyPress={handleKeyPress}
                  style={{ paddingTop: "20px" }}
                />
                <CustomInput
                  placeholder="Password"
                  leftIcon={
                    <LockOpen style={{ color: "rgba(71, 80, 105, 1)" }} />
                  }
                  type="password"
                  value={password}
                  handleChange={(e) => setPassword(e.target.value)}
                  handleKeyPress={handleKeyPress}
                  style={{ paddingTop: "20px", paddingBottom: "20px" }}
                />
                <div className={classes.container}>
                  <CustomButton
                    label="Login"
                    color="primary"
                    variant="contained"
                    style={{ width: "100%" }}
                    onClick={handleSubmit}
                  />
                </div>
              </form>
            </Grid>
          </Grid>
        </div>
      </Fragment>
    );
}

const mapStateToProps = (state) => ({
  error: state.auth.error,
});

const mapDispatchToProps = (dispatch) => ({
  handleLogin: (username, password) =>
    dispatch(loginRequest(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
