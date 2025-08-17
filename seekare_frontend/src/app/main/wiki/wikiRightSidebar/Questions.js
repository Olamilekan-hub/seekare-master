/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  makeStyles,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";

import { getReferencedAnswers } from "app/store/answer/actions";
import { getSortedQuestions, emptyQuestion } from "app/store/question/actions";
import useAuth from "app/hooks/useAuth";
import TouchedWikiItem from "app/main/shared-components/WikiQuestionItem/TouchedWikiItem";
import { useHistory } from "react-router-dom";
import { setActiveContent } from "app/store/ui/actions";
import Spinner from "../spinner";
import { forwardRef } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

// React Icons for ads
import { FiThumbsUp } from "react-icons/fi";
import { FiThumbsDown } from "react-icons/fi";

// Advertisement images
import Advertisement from "../../../../assets/images/advertisement.png";
import Advertisement01 from "../../../../assets/images/advertisement-01.png";
import Advertisement02 from "../../../../assets/images/advertisement-02.avif";

const useStyles = makeStyles((theme) => ({
  root: {},
  questions: {
    overflow: "hidden scroll",
    height: "92%",
    borderRadius: 10,
    "&::-webkit-scrollbar": {
      width: "0",
    },
    "&::-webkit-scrollbar-thumb": {
      display: "none",
    },
  },
  tabs: {
    padding: "10px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  tabsItem: {
    cursor: "pointer",
    textTransform: "uppercase",
    transition: "all 0.3s ease",
    justifyContent: "center",
    padding: "5px 10px",
    border: `1px solid gray`,
    fontWeight: 700,
    fontSize: "14px",
    color: theme.palette.text.secondary,
    "&:first-child": {
      borderTopLeftRadius: "6px",
      borderBottomLeftRadius: "6px",
    },
    "&:last-child": {
      borderTopRightRadius: "6px",
      borderBottomRightRadius: "6px",
    },
    "&.active, &:hover": {
      color: theme.palette.text.primary,
      backgroundColor: "white",
    },
  },
  allowAllIcon: {
    position: "absolute",
    top: "65px",
    right: "0",
  },
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    border: "none",
    borderRadius: 0,
    "&:hover": {
      border: "none",
      borderBottom: `2px solid ${theme.palette.secondary.main}`,
    },
  },
  selectedRadio: {
    color: theme.palette.secondary.main,
    borderBottom: `2px solid ${theme.palette.secondary.main}`,
    width: "50%",
  },
  radioButton: {
    width: "50%",
    color: theme.palette.text.main,
    borderBottom: `2px solid ${theme.palette.text.main}`,
  },
  postsGroup: {
    marginTop: "15px",
  },
  selectField: {
    backgroundColor: theme.palette.secondary.lightest,
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: "8px",
    padding: "5px 10px",
    "&:hover, &:focus, &:focus-within, &:active": {
      border: `1px solid ${theme.palette.secondary.light}`,
    },
    "&:after, &:before": {
      display: "none",
    },
  },
  // Advertisement styles 
  advertisementContainer: {
    width: "100%",
    backgroundColor: "#EDF1FF",
    borderRadius: "10px",
    padding: "15px",
    marginTop: "15px",
    marginBottom: "10px",
    border: `1px solid #EDF1FF`,
    position: "relative",
    transition: "opacity 0.4s ease-in-out, transform 0.4s ease-in-out",
    opacity: 1,
    transform: "translateY(0)",
    [theme.breakpoints.down('md')]: {
      padding: "12px",
    },
    [theme.breakpoints.down('sm')]: {
      padding: "10px",
      marginTop: "12px",
    },
  },
  sponsoredLabel: {
    position: "absolute",
    top: "8px",
    right: "8px",
    backgroundColor: "#FF6B35",
    color: "#FFFFFF",
    fontSize: "9px",
    fontWeight: "600",
    padding: "2px 6px",
    borderRadius: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    zIndex: 1,
    [theme.breakpoints.down('sm')]: {
      fontSize: "8px",
      padding: "2px 5px",
      top: "6px",
      right: "6px",
    },
  },
  adImage: {
    width: "100%",
    height: "360px",
    objectFit: "cover",
    marginTop: "8px",
    borderRadius: "8px",
    [theme.breakpoints.down('sm')]: {
      height: "100px",
      borderRadius: "6px",
    },
  },
  adUserName: {
    fontSize: "14px",
    fontWeight: "600",
    marginLeft: "8px",
    [theme.breakpoints.down('sm')]: {
      fontSize: "13px",
      marginLeft: "6px",
    },
  },
  adUserAvatar: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    [theme.breakpoints.down('sm')]: {
      width: "24px",
      height: "24px",
    },
  },
  adMetaText: {
    fontFamily: "Poppins",
    fontSize: "11px",
    fontWeight: "400",
    color: "#6B6E7A",
    [theme.breakpoints.down('sm')]: {
      fontSize: "10px",
    },
  },
  adContentText: {
    fontFamily: "Poppins",
    fontSize: "13px",
    fontWeight: "400",
    marginTop: "8px",
    [theme.breakpoints.down('sm')]: {
      fontSize: "12px",
    },
  },
}));

// Ads Component
const Ads = ({ adIndex = 0, isTransitioning = false, classes }) => {
  const adData = [
    {
      companyName: "HealthCare Plus",
      companyImage: Advertisement,
      timeAgo: "Sponsored",
      responses: "Ad",
      content: "Join our medical community and connect with certified healthcare professionals worldwide.",
      image: Advertisement,
      hasText: true,
    },
    {
      companyName: "MedTech Solutions",
      companyImage: Advertisement01,
      timeAgo: "Sponsored",
      responses: "Ad",
      content: "Discover cutting-edge medical technology and innovative healthcare solutions.",
      image: Advertisement01,
      hasText: true,
    },
    {
      companyName: "Wellness Pro",
      companyImage: Advertisement02,
      timeAgo: "Sponsored",
      responses: "Ad",
      content: "Transform your health journey with our comprehensive wellness programs.",
      image: Advertisement02,
      hasText: true,
    },
  ];

  const selectedAd = adData[adIndex % adData.length];
  
  return (
    <Box 
      className={classes.advertisementContainer}
      style={{
        opacity: isTransitioning ? 0.3 : 1,
        transform: isTransitioning ? "translateY(-10px)" : "translateY(0)",
      }}
    >
      <Box className={classes.sponsoredLabel}>
        {selectedAd.timeAgo}
      </Box>
      
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <Box style={{ display: "flex", alignItems: "center" }}>
          <img
            src={selectedAd.companyImage}
            alt="Company Avatar"
            className={classes.adUserAvatar}
          />
          <Box>
            <Typography className={classes.adUserName}>
              {selectedAd.companyName}
            </Typography>
          </Box>
        </Box>
        <Box style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
          <Typography className={classes.adMetaText}>
            {selectedAd.timeAgo}
          </Typography>
          <Typography className={classes.adMetaText} style={{ margin: "0px 8px" }}>
            |
          </Typography>
          <Typography className={classes.adMetaText}>
            {selectedAd.responses}
          </Typography>
        </Box>
      </Box>

      {/* Ad Content Text */}
      {selectedAd.hasText && (
        <Box style={{ marginTop: "8px" }}>
          <Typography className={classes.adContentText}>
            {selectedAd.content}
          </Typography>
        </Box>
      )}

      {/* Ad Image */}
      <img
        src={selectedAd.image}
        alt="Advertisement"
        className={classes.adImage}
      />

      {/* Like/Dislike for ads */}
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          marginTop: "8px",
        }}
      >
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "15px",
          }}
        >
          <FiThumbsUp
            size={16}
            color="#56B954"
            style={{ marginRight: "6px" }}
          />
          <Typography className={classes.adMetaText} style={{ color: "#56B954" }}>
            {Math.floor(Math.random() * 50)}
          </Typography>
        </Box>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <FiThumbsDown
            size={16}
            color="#FF3C3C"
            style={{ marginRight: "6px" }}
          />
          <Typography className={classes.adMetaText} style={{ color: "#FF3C3C" }}>
            {Math.floor(Math.random() * 5)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const Questions = forwardRef(
  ({ referencedPosts, questions, setQuestions, pageNum, setPageNum }, ref) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();
    const {
      questions: qs = [],
      searchTerm = '',
      page = 0,
      isLoading = false,
      total = 0,
    } = useSelector((state) => state.question || {});
    const answers = useSelector((state) => state.answer.answers);
    const location = useLocation();
    const pathname = location.pathname;
    const { id: activeWikiId } = useSelector((state) => state.wiki.activeWiki);

    const { isAuthenticated, currentUser, isMd, isAdmin } = useAuth();

    // State for rotating ads (from Home component)
    const [currentAdIndex, setCurrentAdIndex] = useState(0);
    const [isAdTransitioning, setIsAdTransitioning] = useState(false);

    // Function for ad transitions (from Home component)
    const handleAdTransition = () => {
      setIsAdTransitioning(true);
      
      setTimeout(() => {
        setCurrentAdIndex((prevIndex) => 
          (prevIndex + 1) % 3
        );
        setIsAdTransitioning(false);
      }, 500);
    };

    // Effect for ad rotation - every 12 seconds (from Home component)
    useEffect(() => {
      const adInterval = setInterval(() => {
        handleAdTransition();
      }, 12000);

      return () => clearInterval(adInterval);
    }, []);

    useEffect(() => {
      const fetchQuestions = async (searchQuery, qSetting) => {
        return dispatch(
          getSortedQuestions({
            q: searchQuery,
            qSetting: "exact",
            page: pageNum,
            activeWikiId:
              pathname.includes("/show") ||
                searchTerm.length > 1 ||
                referencedPosts
                ? undefined
                : isAdmin || isMd
                  ? activeWikiId
                  : undefined,
          })
        );
      };
      const fetchReferencedAnswers = async () => {
        return dispatch(getReferencedAnswers(activeWikiId));
      };
      if (
        activeWikiId !== undefined &&
        searchTerm.length <= 1 &&
        !pathname.includes("/show") &&
        !referencedPosts &&
        (isMd || isAdmin)
      ) {
        fetchReferencedAnswers();
      }
      fetchQuestions(searchTerm);
    }, [dispatch, searchTerm, pageNum, activeWikiId, referencedPosts]);

    useEffect(() => {
      if (qs.length === 0) {
        setQuestions([]);
      } else {
        if (
          page === 0 &&
          !pathname.includes("/show") &&
          !referencedPosts &&
          (isMd || isAdmin)
        ){
          setQuestions([...qs, ...answers]);
        }
        else if (
          activeWikiId !== undefined &&
          searchTerm.length <= 1 &&
          !pathname.includes("/show") &&
          !referencedPosts &&
          (isMd || isAdmin)
        ) {
          setQuestions([...questions, ...qs, ...answers]);
        }
        else {
          if(qs[1]?._id === questions[0]?._id) {
            setQuestions([...qs])
          }
          else {
            setQuestions([...questions, ...qs]);
          }
        }
      }
    }, [qs]);

    const onScrollHandler = (e) => {
      console.log("total", total);
      const bottom =
        e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 50;
      console.log(bottom && !isLoading && total > 2, "bottom");
      if (bottom && !isLoading && total > pageNum + 1) {
        console.log("next", pageNum + 1)
        setPageNum(Number(pageNum) + 1);
      }
    };

    const onChangeTabHandler = useCallback(
      (tab) => {
        if (!currentUser?.userID) return;
        switch (tab) {
          case "recents":
            setQuestions([]);
            dispatch(getSortedQuestions({ tab: "recents" }));
            break;
          case "asked":
            setQuestions([]);
            dispatch(
              getSortedQuestions({ tab: "asked", userID: currentUser.userID })
            );
            break;
          case "answered":
            setQuestions([]);
            dispatch(
              getSortedQuestions({
                tab: "answered",
                userID: currentUser.userID,
              })
            );
            break;
          default:
            setQuestions([]);
            dispatch(getSortedQuestions({ tab: "recents" }));
            break;
        }
      },
      [currentUser.userID, dispatch]
    );

    const handleItemClick = (item) => {
      dispatch(setActiveContent("question"));
      if (history.location.pathname.indexOf("/wiki/question/") < 0) {
        dispatch(emptyQuestion());
      }
      history.push(
        `/wiki/question/${item.title !== undefined ? item._id : item.questionID
        }/${item.title !== undefined
          ? item.title
            .replace(/ /g, "-")
            .replace(/[&\\#,+()$~%.'":*?<>{}]/g, "")
          : item.questionID
        }/show`
      );
    };

    const lin = () => {
      var links = document.getElementsByTagName("a");
      for (var i = 0; i < links.length; i++) {
        links[i].target = "_self";
      }
    };
    const handleSetQuestionLink = (item) => {
      console.log("how times");
      if (ref.current) {
        const editor = ref.current.getEditor();
        editor.focus();
        const selection = editor.getSelection();
        const cursorPosition = selection ? selection.index : 0;

        const newValue = `<span>&nbsp;<a href="/wiki/question/${item.title !== undefined ? item._id : item.questionID
          }/show" target="_self">[${item.user.username}]</a></span>`;

        editor.clipboard.dangerouslyPasteHTML(cursorPosition, newValue);
        lin();
      }
    };
    const POST_TYPES = useMemo(
      () => [
        { value: "all-post", label: "All Posts" },
        { value: "my-post", label: "My Posts" },
      ],
      []
    );
    const QUESTION_TYPES = useMemo(
      () => [
        { value: "reliability", lable: "Reliability" },
        { value: "newest", label: "Newest" },
        { value: "highest-rated", label: "Hightest Rated" },
        { value: "md-responded", label: "MD Responded" },
      ],
      []
    );

    const [postType, setPostType] = useState(POST_TYPES[0].value);
    const [sortType, setSortType] = useState(QUESTION_TYPES[0].value);

    const calcQuestions = (questions, sortType) => {
      switch (sortType) {
        case "md-responded":
          return questions.filter((item) => item.mdReviewed);
        case "highest-rated":
          return questions
            .map((item) => item)
            .sort((p, n) => n.likes - p.likes);
        case "newest":
          return questions
            .map((item) => item)
            .sort((p, n) => (p.date < n.date ? 1 : -1));
        default:
          return questions
            .map((item) => item)
      }
    };
    const [filteredQuestions, setFilteredQuestions] = useState([]);

    useEffect(() => {
      const newFilteredQuestions = calcQuestions(
        JSON.parse(JSON.stringify(questions)),
        sortType
      );
      setFilteredQuestions(
        Array.from(
          new Set(newFilteredQuestions.map((el) => JSON.stringify(el)))
        ).map((el) => JSON.parse(el))
      );
    }, [questions, sortType]);

    const handlePostTypeChange = (value) => {
      if (value === "my-post" && postType !== "my-post")
        onChangeTabHandler("asked");
      else if (value === "all-post" && postType !== "all-post")
        onChangeTabHandler("recents");
      setPostType(value);
    };

    const handleQuestionTypeChange = (event) => {
      setSortType(event.target.value);
    };
    const handleDeleteFilteredItem = (question) => {
      setFilteredQuestions(
        filteredQuestions.filter((item) => item._id !== question._id)
      );
    };

    // Function to render posts with ads every 5 posts (from Home component)
    const renderPostsWithAds = () => {
      const items = [];
      
      filteredQuestions.forEach((item, index) => {
        // Add the post
        items.push(
          <TouchedWikiItem
            ref={ref}
            key={item._id}
            item_question={item}
            index={index}
            onClick={handleItemClick}
            onClickAlt={handleSetQuestionLink}
            searchTerm={searchTerm}
            referencedPosts={referencedPosts}
            handleDeleteFilteredItem={handleDeleteFilteredItem}
          />
        );
        
        // Add ad after every 5 posts
        if ((index + 1) % 5 === 0) {
          items.push(
            <Ads 
              key={`ad-${index}`}
              adIndex={(Math.floor(index / 5) + currentAdIndex) % 3} 
              isTransitioning={isAdTransitioning}
              classes={classes}
            />
          );
        }
      });
      
      return items;
    };

    return (
      <Box height="100%">
        {isAuthenticated && (
          <Box
            display="flex"
            flexDirection="column"
            className={classes.postsGroup}
          >
            <ButtonGroup
              variant="outlined"
              color="secondary"
              aria-label="contained secondary button group"
            >
              {POST_TYPES.map(({ value, label }) => (
                <Button
                  key={value}
                  onClick={() => handlePostTypeChange(value)}
                  className={`${value === postType
                      ? classes.selectedRadio
                      : classes.radioButton
                    } ${classes.button}`}
                >
                  {label}
                </Button>
              ))}
            </ButtonGroup>
          </Box>
        )}
        <Box className={classes.questions} onScroll={onScrollHandler}>
          {isAuthenticated && (
            <Box display="flex" flexDirection="column" my={1}>
              <FormControl className={classes.formControl}>
                <Select
                  labelId="question-type-select-label"
                  id="question-type-select"
                  value={sortType}
                  onChange={handleQuestionTypeChange}
                  className={classes.selectField}
                >
                  {QUESTION_TYPES.map(({ value, label }) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}
          {filteredQuestions && filteredQuestions.length > 0 ? (
            <>
              {renderPostsWithAds()}
            </>
          ) : (
            searchTerm && (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  backgroundColor: "#D9EAFF",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gap: "15px",
                    color: "#4C6FFF",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  <span>
                    We're sorry, but we couldn't find any results for your
                    search query.<br></br>
                    Here are a few suggestions that might help:
                  </span>
                  <span>
                    Check the Spelling: Ensure that all words are spelled
                    correctly.<br></br>
                    Use different keywords: Try using synonyms or related
                    terms.<br></br>
                    Be Less Specific: Broaden your serach terms to get more
                    results.
                  </span>
                  <span>
                    If you still can't find what you are looking for, our
                    support team is<br></br>
                    here to help. Please contact us using the "Contact Us"
                    page for<br></br>
                    further assistance.
                  </span>
                </div>
              </div>
            )
          )}
          {isLoading && <Spinner />}
        </Box>
      </Box>
    );
  }
);

export default Questions;