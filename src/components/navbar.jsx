import React from "react";
import logo from "../utils/logo.png";
import {
  AppBar,
  Toolbar,
  makeStyles,
} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowForward";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import { navbarType } from "../constants";
import CustomButton from "./customButton";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "rgba(18, 24, 41, 0.8)",
    boxShadow: "none",
    borderBottom: "none",
  },
  button: {
    display: "flex",
    alignItems: "center",
    textTransform: "none",
  },
  icon: {
    fontSize: "0.8rem",
  },
}));

const Navbar = (prop) => {
  const history = useHistory();
  const classes = useStyles();

  const handleClick = (destination) => {
    if (history.location.pathname === destination) {
      history.replace(destination);
    } else {
      history.push(destination);
    }
  };

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar style={{ padding: "0px" }}>
        <div style={{ flexGrow: 1 }}>
          <Link
            to={{
              pathname: "/",
            }}
          >
            <img src={logo} alt="Logo" style={{ height: "30px" }} />
          </Link>
        </div>
        {prop.type === navbarType.HOME ? (
          <>
            <CustomButton
              color="inherit"
              label="Movies"
              onClick={() => handleClick("/home-page/movie")}
            />
            <CustomButton
              color="inherit"
              label="TV Shows"
              onClick={() => handleClick("/home-page/tv")}
            />
            <CustomButton
              color="inherit"
              rightIcon={<ArrowRightIcon className={classes.icon} />}
              label="Suggest Me"
              onClick={() => handleClick("/home-page/suggest")}
            />
          </>
        ) : (
          <>
            <CustomButton
              color="inherit"
              label="Dashboard"
              onClick={() => handleClick("/dashboard")}
            />
            <CustomButton
              color="inherit"
              label="Suggestions"
              onClick={() => handleClick("/dashboard/suggestion")}
            />
            <CustomButton
              color="inherit"
              label="Add"
              onClick={() => handleClick("/dashboard/add")}
            />
            <CustomButton
              color="inherit"
              leftIcon={<LogoutIcon className={classes.icon} />}
              label="Logout"
            />
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
