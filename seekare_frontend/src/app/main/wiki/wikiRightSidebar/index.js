import React, { useState, forwardRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, Box, Typography } from "@material-ui/core";
import { setSearchTerm } from "app/store/question/actions";

import SearchInput from "app/main/shared-components/SearchInput";
import Questions from "./Questions";
import CustomButton from "app/main/shared-components/Button";
import useAuth from "app/hooks/useAuth";
import { useHistory } from "react-router-dom";
import { changeResponsive, openModal } from "app/store/ui/actions";
import { ASKING } from "app/constants";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { useWikiContext } from "../wikiContext";

// Images for rotating header
import ModeratedByPhysicians from "../../../../assets/images/moderated-by-physicians.png";
import ShareYourExperiences from "../../../../assets/images/share-your-experiences.png";
import FightAgainstMisinformation from "../../../../assets/images/fight-against-misinformation.png";

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden",
    display: "flex",
    height: "100%",
    flexDirection: "column",
    padding: 10,
  },
  menuIcon: {
    fontSize: 25,
    cursor: "pointer",
  },
  searchInputWrapper: {
    padding: "10px 5px",
  },
  mainContent: {
    background: (props) =>
      props.activeContent === "question" ? "#EAE9FF" : "white",
    border: (props) =>
      props.activeContent === "question"
        ? "1px solid #9E99E4"
        : "1px solid transparent",
    padding: 10,
    borderRadius: "1rem",
    height: "calc(100% - 240px)", // Adjusted for rotating header
  },
  wikiListTitle: {
    width: "234px",
    textAlign: "center",
    fontSize: "1.7rem",
    fontWeight: "bold",
    color: theme.palette.text.secondary,
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  titleIcon: {
    color: theme.palette.secondary.main,
  },
  responsiveTabs: {
    textAlign: "center",
    fontSize: "1rem",
    fontWeight: "bold",
    color: theme.palette.text.secondary,
    display: "flex",
    alignItems: "center",
    width: "50%",
    borderRadius: "12px",
    borderWidth: "1px",
    "& span": {
      marginLeft: "0.5rem",
    },
    [theme.breakpoints.down("sm")]: {
      borderRadius: "0",
    },
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  searchinput: {
    background: "#e6e6e6",
    color: "black !important",
    borderRadius: "1rem",
  },
  addPostBtn: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "10px",
      fontWeight: "0",
    },
    [theme.breakpoints.down(375)]: {
      padding: "0.2rem",
    },
  },
  switchControl: {
    [theme.breakpoints.down("sm")]: {
      paddingTop: "40px",
      marginTop: "-100px",
      marginRight: "-200px",
    },
  },
  itemImage: {
    [theme.breakpoints.down(375)]: {
      width: "20px",
      height: "20px",
    },
  },
  // New styles for rotating header
  rotatingHeader: {
    width: "95%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: "15px",
    padding: theme.spacing(2, 2),
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
    border: `1px solid #EDF1FF`,
    marginBottom: theme.spacing(2),
    minHeight: "60px",
    position: "relative",
    overflow: "hidden",
    margin: "0 auto 16px auto",
    [theme.breakpoints.down('sm')]: {
      width: "100%",
      padding: theme.spacing(1.5, 1),
      gap: theme.spacing(1),
      minHeight: "50px",
    },
  },
  headerContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
    opacity: 1,
    transform: "translateY(0)",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  headerImage: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    marginRight: theme.spacing(1.5),
    [theme.breakpoints.down('sm')]: {
      width: "30px",
      height: "30px",
      marginRight: theme.spacing(1),
    },
  },
  headerText: {
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: "18px",
    lineHeight: "22px",
    color: "#000000",
    textAlign: "center",
    [theme.breakpoints.down('sm')]: {
      fontSize: "14px",
      lineHeight: "18px",
    },
  },
  divider: {
    width: "4px",
    height: "30px",
    backgroundColor: "#4C6FFF",
    borderRadius: "10px",
    marginLeft: theme.spacing(1.5),
    [theme.breakpoints.down('sm')]: {
      width: "3px",
      height: "25px",
    },
  },
}));

// Header messages data
const headerMessages = [
  {
    image: ModeratedByPhysicians,
    text: "Moderated by physicians",
    alt: "Moderated By Physicians"
  },
  {
    image: ShareYourExperiences,
    text: "Share your experiences",
    alt: "Share Your Experiences"
  },
  {
    image: FightAgainstMisinformation,
    text: "Fight against misinformation",
    alt: "Fight Against Misinformation"
  }
];

const WikiRightSidebar = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const { isAuthenticated, isMd, isAdmin } = useAuth();

  const history = useHistory();
  const location = useLocation();
  const pathname = location.pathname;
  const activeContent = useSelector((state) => state.ui.content.activeContent);

  const { id: activeWikiId } = useSelector((state) => state.wiki.activeWiki);
  const responsive = useSelector((state) => state.ui.responsive.responsiveType);

  const { searchTerm = '' } = useSelector((state) => state.question || {});
  const classes = useStyles({
    activeContent,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [referencedPosts, setReferencedPosts] = useState(false);
  const { pageNum, setPageNum, questions, setQuestions } = useWikiContext();

  // State for rotating header
  const [currentHeaderIndex, setCurrentHeaderIndex] = useState(0);
  const [isHeaderTransitioning, setIsHeaderTransitioning] = useState(false);

  // Function for header transitions
  const handleHeaderTransition = () => {
    setIsHeaderTransitioning(true);
    
    setTimeout(() => {
      setCurrentHeaderIndex((prevIndex) => 
        (prevIndex + 1) % headerMessages.length
      );
      setIsHeaderTransitioning(false);
    }, 300);
  };

  useEffect(() => {
    // Reset context when navigating to home
    if (window.location.pathname === '/') {
      setQuestions([]);
      setPageNum(0);
    }
  }, [setQuestions, setPageNum]);

  useEffect(() => {
    console.log('WikiRightSidebar state:', {
      searchTerm: searchTerm?.length,
      questionsLength: questions?.length,
      pathname: location.pathname,
      responsive
    });
  }, [searchTerm, questions, location.pathname, responsive]);

  // Effect for header rotation - every 5 seconds
  useEffect(() => {
    const headerInterval = setInterval(() => {
      handleHeaderTransition();
    }, 5000);

    return () => clearInterval(headerInterval);
  }, []);

  const handleSetReferenced = () => {
    setReferencedPosts((prev) => !prev);
    setQuestions([]);
    setPageNum(0);
  };

  const onKeyUpHandler = (e) => {
    if (e.keyCode === 13 && searchQuery !== searchTerm) {
      dispatch(setSearchTerm(searchQuery));
      setPageNum(0);
    }
  };

  const onChangeHandler = (value) => {
    setSearchQuery(value);
  };

  const handleNewQuestionPost = () => {
    if (isAuthenticated) {
      dispatch(changeResponsive("addPost"));
      history.push("/wiki/question/ask");
    } else {
      dispatch(
        openModal("LOGIN_MODAL", {
          state: ASKING,
        })
      );
    }
  };

  const handleClickKareBook = () => {
    dispatch(changeResponsive("kareBook"));
  };

  const handleClickKarePost = () => {
    dispatch(changeResponsive("karePost"));
  };

  return (
    <Box
      className={`${classes.root} karePost`}
      style={{
        display: responsive === "karePost" ? "block" : "",
      }}
    >
      {/* Rotating Header */}
      <Box className={classes.rotatingHeader}>
        <Box 
          className={classes.headerContent}
          style={{
            opacity: isHeaderTransitioning ? 0 : 1,
            transform: isHeaderTransitioning 
              ? "translate(-50%, -60%)" 
              : "translate(-50%, -50%)",
          }}
        >
          <img
            src={headerMessages[currentHeaderIndex].image}
            alt={headerMessages[currentHeaderIndex].alt}
            className={classes.headerImage}
          />
          <Typography className={classes.headerText}>
            {headerMessages[currentHeaderIndex].text}
          </Typography>
          {/* <div className={classes.divider}></div> */}
        </Box>
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={2}
        mb={1}
      >
        <Typography
          variant="h6"
          component="h6"
          className={classes.wikiListTitle}
        >
          <img src="/images/icons/karepost.svg" alt="karepost" />
          <Box component="span" fontSize="1.5rem" ml={2}>
            {activeWikiId === undefined ||
            pathname.includes("/show") ||
            referencedPosts
              ? "KarePost"
              : isMd || isAdmin
              ? "Referenced Post"
              : "KarePost"}
          </Box>
        </Typography>
        {responsive === "karePost" && (
          <Box
            display="flex"
            justifyContent="space-around"
            width="80%"
            className={classes.tabContainer}
          >
            <Typography
              variant="h6"
              component="h6"
              className={classes.responsiveTabs}
              onClick={handleClickKareBook}
            >
              <div
                style={{
                  margin: "0 auto",
                  display: "flex",
                }}
              >
                <img
                  src="/images/icons/karebook.svg"
                  alt="karebook"
                  className={classes.itemImage}
                />
                <span>KareBook</span>
              </div>
            </Typography>
            <Typography
              variant="h6"
              component="h6"
              className={classes.responsiveTabs}
              style={{
                borderBottom: "solid cadetblue",
              }}
              onClick={handleClickKarePost}
            >
              <div
                style={{
                  margin: "0 auto",
                  display: "flex",
                }}
              >
                <img
                  src="/images/icons/karepost.svg"
                  alt="karepost"
                  className={classes.itemImage}
                />
                <span>KarePost</span>
              </div>
            </Typography>
          </Box>
        )}
        {pathname.includes("/show") ||
        (searchTerm?.length || 0) > 1 ||
        activeWikiId === undefined ? (
          <></>
        ) : isMd || isAdmin ? (
          <FormControlLabel
            style={{ marginLeft: "-130px" }}
            className={classes.switchControl}
            control={
              <Switch
                checked={referencedPosts}
                onChange={handleSetReferenced}
                value="referencedPosts"
              />
            }
            label=""
          />
        ) : (
          <></>
        )}
        <Box display="flex" alignItems="center">
          <CustomButton
            color="secondary"
            type="submit"
            variant="outlined"
            size="sm"
            onClick={handleNewQuestionPost}
            className={`${classes.addPostBtn} karePostAddBtn`}
          >
            Add Post
          </CustomButton>
        </Box>
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={1}
        py={1}
        bgcolor="white"
        borderRadius="1rem"
        mb={1}
      >
        <SearchInput
          value={searchQuery}
          onKeyUp={onKeyUpHandler}
          onChange={onChangeHandler}
          placeholder="Search Posts"
          className={`${classes.searchinput} search-question`}
        />
      </Box>
      <Box className={classes.mainContent}>
        
        <Questions
          ref={ref}
          referencedPosts={referencedPosts}
          questions={questions}
          setQuestions={setQuestions}
          pageNum={pageNum}
          setPageNum={setPageNum}
        />
      </Box>
    </Box>
  );
});

export default WikiRightSidebar;