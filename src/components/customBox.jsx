import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  box: {
    backgroundColor: "rgba(18, 24, 50, 1)",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px"
  },
}));

const CustomBox = (prop) => {
  const classes = useStyles();

  return (
    <div className={classes.box}>
      <div style={{ color: "white", textAlign: "center" }}>
        <Typography variant={prop.styleTextContent}>{prop.content}</Typography>
        {prop.title ? <p>{prop.title}</p> : <></>}
      </div>
    </div>
  );
};

export default CustomBox;
