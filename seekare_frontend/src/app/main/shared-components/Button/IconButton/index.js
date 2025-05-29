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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: theme.spacing(0.6, 2),
    cursor: "pointer",
    borderRadius: "10px",
  },
  icon: {
    paddingRight: theme.spacing(1),
    marginTop: theme.spacing(0.7),
  },
  text: {
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "20px",
    transition: "all 0.3s ease",
  },
  light: {
    color: theme.palette.text.white,
    backgroundColor: theme.palette.secondary.main,
    opacity: 0.7,
    border: "none",
  },
  secondary: {
    color: "#000",
    border: `1px solid ${theme.palette.border.main}`,
    backgroundColor: theme.palette.background.paper,
  },
  primary: {
    color: theme.palette.text.white,
    backgroundColor: theme.palette.secondary.main,
    opacity: 1,
    border: "none",
  },
}));

const IconButton = ({ icon, children, theme, ...props }) => {
  // Styles
  const classes = styles();

  // Theme
  if (theme) {
    classes.root = `${classes.root} ${classes[theme]}`;
  }

  return (
    <Box className={classes.root} {...props}>
      {icon && <div className={classes.icon}>{icon}</div>}
      <p className={classes.text}>{children}</p>
    </Box>
  );
};

IconButton.propTypes = {
  icon: PropTypes.node,
  children: PropTypes.node,
  theme: PropTypes.string,
};

IconButton.defaultProps = {
  icon: null,
  children: null,
  // theme: "primary",
};

export default IconButton;
