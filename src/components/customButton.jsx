import React from "react";
import { makeStyles, Button, Icon } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    display: "flex",
    alignItems: "center",
    textTransform: "none",
  },
}));

const CustomButton = (prop) => {
  const classes = useStyles();
  const style = {};
  if (prop.rightIcon != null) {
    style.marginRight = "5px";
  } 
  if (prop.leftIcon != null) {
    style.marginLeft = "5px";
  }

  return (
    <Button style={prop.style} variant={prop.variant} color={prop.color} className={classes.button} onClick={prop.onClick}>
      {prop.leftIcon != null ? (
        <div>
          <Icon color="inherit" size="small">
            {prop.leftIcon}
          </Icon>
        </div>
      ) : (
        <></>
      )}
      <div style={style}>{prop.label}</div>
      {prop.rightIcon != null ? (
        <div>
          <Icon color="inherit" size="small">
            {prop.rightIcon}
          </Icon>
        </div>
      ) : (
        <></>
      )}
    </Button>
  );
};

export default CustomButton;
