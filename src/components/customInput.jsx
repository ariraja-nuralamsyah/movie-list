import React from "react";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";

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
  handleSubmit,
  handleChange,
  value,
  leftIcon, 
  rightIcon,
  placeholder,
  label,
}) => {
  const classes = useStyles();

   const renderLeftIcon = () => {
     if (leftIcon) {
       return (
         <IconButton className={classes.iconButton} type="submit">
           {leftIcon}
         </IconButton>
       );
     }
     return null;
   };

   const renderRightIcon = () => {
     if (rightIcon) {
       return (
         <IconButton className={classes.iconButton} type="submit">
           {rightIcon}
         </IconButton>
       );
     }
     return null;
   };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        className={classes.textField}
        label={label}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        variant="outlined"
        InputProps={{
          startAdornment: renderLeftIcon(),
          endAdornment: renderRightIcon(),
        }}
      />
    </form>
  );
};

export default CustomInput;
