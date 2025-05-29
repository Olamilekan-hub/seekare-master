import React, { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import {
  Box,
  Divider,
  Grid,
  makeStyles,
  Button,
  MenuItem,
  MenuList,
  Typography,
} from "@material-ui/core";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import Logo from "app/main/shared-components/Logo";
import CustomButton from "app/main/shared-components/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { openModal } from "app/store/ui/actions";
import useAuth from "app/hooks/useAuth";
import AvatarComponent from "app/main/shared-components/AvatarComponent";
import { logout } from "app/store/auth/actions";
import useClickOutside from "app/hooks/useClickOutside";
import "./style.css";

import { FaSearch, FaHeart } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";

import IconInput from "app/main/shared-components/Inputs/IconInput";
import IconButton from "app/main/shared-components/Button/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#FFFFFF",
    zIndex: 1000,
    width: "100%",
    [theme.breakpoints.down(426)]: {
      padding: "0 0.5rem",
    },
    borderBottom: "1px solid #f2f2f2",
  },
  logo: {
    padding: "0.5rem",
    [theme.breakpoints.down(426)]: {
      "& img": {
        width: "7%",
      },
    },
  },
  support: {
    marginLeft: "auto",
    background: "#a7c6fa",
    alignItems: "center",
    padding: "5px 10px",
    borderRadius: "10px",
    textTransform: "capitalize !important",
    "&:hover": {
      background: "#fc8f81",
    },
    [theme.breakpoints.down(426)]: {
      "& p": {
        fontSize: "0.7rem",
      },
    },
  },
  rightSide: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "1rem",
    maxWidth: "max-content",
  },
  button: {
    margin: "0 0.5rem",
  },
  qSetting: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
  },
  qSettingText: {
    padding: "2px 6px",
    background: theme.palette.secondary.main,
    color: "white",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  userDropdown: {
    position: "relative",
    cursor: "pointer",
    "& .dropdown-header": {
      display: "flex",
      alignItems: "center",
    },
    "& .dropdown-menu": {
      position: "absolute",
      top: "100%",
      right: "0",
      background: "white",
      borderRadius: "8px",
      padding: "10px",
      listStyle: "none",
      opacity: 0,
      transition: "all 0.3s ease-in",
      marginTop: "-20px",
      visibility: "hidden",
      zIndex: 1000,
      "& li": {
        minWidth: "140px",
        padding: "10px 0",
        "& a": {
          color: theme.palette.text.secondary,
          "&:hover": {
            color: theme.palette.text.primary,
          },
        },
      },

      "&.show": {
        marginTop: "10px",
        opacity: 1,
        visibility: "visible",
      },
    },
  },
  similarQueries: {
    position: "absolute",
    top: "100%",
    width: "100%",
    background: "white",
    borderRadius: "4px",
    padding: "10px",
    zIndex: 1000,
    boxShadow: "0 10px 10px -8px grey",
    visibility: "visible",
    opacity: 1,
    marginTop: 10,
  },
  hidden: {
    opacity: 1,
    visibility: "hidden",
    marginTop: -100,
  },

  similarQueryItem: {
    margin: "5px 0",
    cursor: "pointer",
    padding: "5px",
    "&:hover": {
      background: theme.palette.background.paper,
    },
  },
  menuButton: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  menuButtonSmall: {
    position: "relative",
    [theme.breakpoints.up(960)]: {
      display: "none",
    },
  },
  menu: {
    position: "absolute",
    background: "white",
    borderRadius: "3px",
    zIndex: "10",
    top: "70px",
    right: "10px",
  },
  searchInputWrapper: {
    position: "relative",
    width: "100%",
    maxWidth: "400px",
  },
  searchInput: {
    fontFamily: "Poppins",
    background: "#F6F7F9",
    height: "50px",
    padding: "0 12px",
    width: "100%",
    borderRadius: "8px",
    border: "1px solid #EDF1FF",
    outline: "none",
    fontSize: "16px",
    "&::placeholder": {
      color: "#999",
    },
  },
}));

const WikiHeader = () => {
  // hooks
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isAuthenticated, currentUser } = useAuth();

  // states
  const [selectMenu, setSelectMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // refs
  const dropdownRef = useRef(null);
  const anchorRef = useRef(null);

  // hooks
  useClickOutside(dropdownRef, () => {
    setOpenDropdown(false);
  });

  // functions
  const openLoginModal = useCallback(() => {
    return dispatch(openModal("LOGIN_MODAL"));
  }, [dispatch]);

  const openSignUpModal = useCallback(() => {
    return dispatch(openModal("REGISTER_MODAL"));
  }, [dispatch]);

  const onLogOut = useCallback(() => dispatch(logout()), [dispatch]);

  // handlers
  const onClickDropdownHeader = () => {
    setOpenDropdown(!openDropdown);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    // <Grid
    //   component="div"
    //   container
    //   className={classes.root}
    //   alignItems="center"
    //   justify="space-between"
    // >
    //   <Box width="20%" maxWidth="20%" className={classes.logo}>
    //     <Logo />
    //   </Box>
    //   <Button className={classes.support}>
    //     <a
    //       href="https://www.buymeacoffee.com/seekare.org"
    //       target="_blank"
    //       style={{
    //         display: "flex",
    //         alignItems: "center",
    //         justifyContent: "space-between",
    //       }}
    //     >
    //       <FaHeart style={{ marginRight: "5px" }} color="red" />
    //       <Typography style={{ color: "white" }}>Support Seekare</Typography>
    //     </a>
    //   </Button>
    //   <Grid
    //     item
    //     xs={3}
    //     sm={6}
    //     md={3}
    //     className={`${classes.rightSide} rightSideHeader`}
    //   >
    //     {!isAuthenticated ? (
    //       <>
    //         <Box className={classes.menuButton}>
    //           <CustomButton
    //             className={classes.button}
    //             type="button"
    //             onClick={openLoginModal}
    //           >
    //             Login
    //           </CustomButton>
    //           &nbsp;
    //           <CustomButton
    //             className={classes.button}
    //             variant="outlined"
    //             color="secondary"
    //             size="md"
    //             onClick={openSignUpModal}
    //           >
    //             Sign up
    //           </CustomButton>
    //         </Box>
    //         <div className={classes.menuButtonSmall}>
    //           <Button
    //             aria-controls="simple-menu"
    //             aria-haspopup="true"
    //             onClick={(e, prev) => setSelectMenu(!prev)}
    //           >
    //             <div id="nav-icon2" className={selectMenu ? "open" : ""}>
    //               <span></span>
    //               <span></span>
    //               <span></span>
    //               <span></span>
    //               <span></span>
    //               <span></span>
    //             </div>
    //           </Button>
    //           <Popper
    //             open={selectMenu}
    //             anchorEl={anchorRef.current}
    //             role={undefined}
    //             transition
    //             disablePortal
    //             placement="right-start"
    //             style={{
    //               top: "0 !important",
    //               left: "inherit !important",
    //               right: "10px",
    //               zIndex: "10",
    //             }}
    //           >
    //             {({ TransitionProps, placement }) => (
    //               <Grow
    //                 {...TransitionProps}
    //                 style={{
    //                   transformOrigin:
    //                     placement === "bottom" ? "center top" : "center bottom",
    //                 }}
    //               >
    //                 <Paper>
    //                   <ClickAwayListener
    //                     onClickAway={() => setSelectMenu(false)}
    //                   >
    //                     <MenuList>
    //                       <MenuItem>
    //                         <CustomButton
    //                           className={classes.button}
    //                           variant="outlined"
    //                           size="md"
    //                           color="secondary"
    //                           onClick={openLoginModal}
    //                           style={{
    //                             width: "100%",
    //                           }}
    //                         >
    //                           Login
    //                         </CustomButton>
    //                       </MenuItem>
    //                       <MenuItem>
    //                         <CustomButton
    //                           className={classes.button}
    //                           variant="outlined"
    //                           color="secondary"
    //                           size="md"
    //                           onClick={openSignUpModal}
    //                         >
    //                           Sign up
    //                         </CustomButton>
    //                       </MenuItem>
    //                     </MenuList>
    //                   </ClickAwayListener>
    //                 </Paper>
    //               </Grow>
    //             )}
    //           </Popper>
    //         </div>
    //       </>
    //     ) : (
    //       <Box className={classes.userDropdown} ref={dropdownRef}>
    //         <Box className="dropdown-header" onClick={onClickDropdownHeader}>
    //           <AvatarComponent user={currentUser} />
    //           <Box ml={1} fontWeight="bold">
    //             {currentUser.username}
    //           </Box>
    //         </Box>

    //         <Box
    //           className={["dropdown-menu", openDropdown ? "show" : ""].join(
    //             " "
    //           )}
    //           component="ul"
    //         >
    //           <Box component="li" display="flex" alignItems="center">
    //             <Box mr={1} display="flex" alignItems="center">
    //               <img src="/images/icons/accountIcon.png" alt="account" />
    //             </Box>
    //             <Link to="/profile">Profile Setting</Link>
    //           </Box>
    //           <Divider />
    //           <Box
    //             component="li"
    //             display="flex"
    //             alignItems="center"
    //             justifyContent="space-between"
    //           >
    //             <Link to="#" onClick={onLogOut}>
    //               Log Out
    //             </Link>
    //             <Box>
    //               <img src="/images/icons/logout.png" alt="logout" />
    //             </Box>
    //           </Box>
    //         </Box>
    //       </Box>
    //     )}
    //   </Grid>
    // </Grid>

    <Grid
      component="div"
      container
      className={classes.root}
      alignItems="center"
      justify="space-between"
    >
      <Grid item xs={3} sm={6} md={8} className={classes.leftSide}>
        <Grid container alignItems="center" justify="flex-start">
          <Box className={classes.logo}>
            <Logo />
          </Box>

          {/* Search Input */}
          <Box className={classes.searchInputWrapper}>
            <IconInput
              icon={<FaSearch size={21} color="#4C6FFF" />}
              placeholder="Search pages..."
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className={classes.searchInput}
            />
          </Box>
        </Grid>
      </Grid>

      <Grid item xs={3} sm={6} md={6} className={classes.rightSide}>
        {/* Login & Signup buttons */}
        <Box marginRight={2}>
          <IconButton
            onClick={openLoginModal}
            icon={<FaHeart size={21} color="#FFFFFF" />}
            theme="light"
          >
            Support SEEKARE
          </IconButton>
        </Box>
        <Box marginRight={2}>
          <IconButton
            onClick={openLoginModal}
            theme="secondary"
            icon={<BiLogIn size={21} color="#00051A" />}
          >
            Sign Up
          </IconButton>
        </Box>
        <Box className="">
          <IconButton
            onClick={openLoginModal}
            theme="primary"
            icon={<BiLogIn size={21} color="#FFFFFF" />}
          >
            Log In
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  );
};

export default WikiHeader;
