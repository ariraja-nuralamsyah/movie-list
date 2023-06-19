import React, { Component, Fragment } from "react";
import Navbar from "./components/navbar";
import "../utils/myCss.css";
import { navbarType } from "../constants";

class Background extends Component {
  render() {
    return (
      <Fragment>
        <Navbar type={navbarType.HOME}/>
      </Fragment>
    );
  }
}

export default Background;
