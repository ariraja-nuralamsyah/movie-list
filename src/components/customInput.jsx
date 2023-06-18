import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Icon } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      borderRadius: theme.spacing(1), // Set the border radius
      borderColor: "rgba(50, 59, 84, 1)", // Set the border color
      "& fieldset": {
        borderColor: "rgba(50, 59, 84, 1)", // Set the border color
      },
      "& input": {
        color: "rgba(71, 80, 105, 1)", // Set the text color
      },
    },
  },
  iconButton: {
    padding: 8,
  },
}));

const CustomInput = ({
  handleChange,
  handleKeyPress,
  value,
  leftIcon, 
  rightIcon,
  placeholder,
  label,
  type,
  style
}) => {
  const classes = useStyles();

   const renderLeftIcon = () => {
     if (leftIcon) {
       return (
         <Icon className={classes.iconButton} type="submit">
           {leftIcon}
         </Icon>
       );
     }
     return null;
   };

   const renderRightIcon = () => {
     if (rightIcon) {
       return (
         <Icon className={classes.iconButton} type="submit">
           {rightIcon}
         </Icon>
       );
     }
     return null;
   };

  return (
    <TextField
      className={classes.textField}
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      type={type}
      variant="outlined"
      InputProps={{
        startAdornment: renderLeftIcon(),
        endAdornment: renderRightIcon(),
      }}
      style={style}
      onKeyPress={handleKeyPress}
    />
  );
};

export default CustomInput;
