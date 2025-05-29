// React
import React from "react";
import PropTypes from "prop-types";

// Material UI
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

// Styles
const styles = makeStyles((theme) => ({
  root: {
    position: "relative",
    padding: theme.spacing(0.1, 0),
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    border: "1px solid #EDF1FF",
    borderRadius: "8px",
    backgroundColor: "#F6F7F9",
  },
  icon: {
    position: "absolute",
    left: theme.spacing(2),
    top: "50%",
    transform: "translateY(-40%)",
    color: "#aaa",
    fontSize: "20px",
    pointerEvents: "none", // Prevents the icon from capturing mouse events
    zIndex: 1,
    transition: "color 0.3s ease",
    "&:hover": {
      color: theme.palette.primary.main,
    },
    "&:focus": {
      color: theme.palette.primary.main,
    },
  },
  input: {
    fontFamily: "Poppins",
    backgroundColor: "transparent",
    width: "100%",
    flex: "1",
    padding: theme.spacing(0.7, 2, 0.7, 6), // left padding to accommodate the icon
    border: "none",
    outline: "none",
    fontSize: "16px",
    borderRadius: "8px",
    "&::placeholder": {
      color: "#aaa",
    },
    "&:focus": {
      border: "none",
      outline: "none",
    },
    "& input": {
      border: "none",
      outline: "none",
    },
    "& fieldset": {
      border: "none",
    },
    "&:hover": {
      border: "none",
      outline: "none",
    },
  },
}));

const IconInput = ({ icon, placeholder, type, value, onChange }) => {
  // Styles
  const classes = styles();

  return (
    <Box className={classes.root}>
      <span className={classes.icon}>{icon}</span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={classes.input}
      />
    </Box>
  );
};

IconInput.defaultProps = {
  type: "text",
  value: "",
  onChange: () => {},
};

IconInput.propTypes = {
  icon: PropTypes.element.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default IconInput;
