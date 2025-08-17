// React
import React, { useState, useEffect } from "react";
import PropTypes, { object } from "prop-types";
import { useHistory } from "react-router-dom";

// Material UI
import { makeStyles, Box, Grid, Typography, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";

// React Icons
import { FiThumbsUp } from "react-icons/fi";
import { FiThumbsDown } from "react-icons/fi";

// Images
import Advertisement from "../../../../../../assets/images/advertisement.png";

// Styled
const styles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    padding: theme.spacing(2),
    background: "rgb(240, 251, 254)",
  },
  box: {
    display: "flex",
    width: "100%",
    height: "100%",
    padding: "50px 20px",
    background: "rgb(240, 251, 254)",
    // padding: theme.spacing(5),
    [theme.breakpoints.down('md')]: {
      padding: "30px 15px",
    },
    [theme.breakpoints.down('sm')]: {
      padding: "20px 10px",
    },
  },
  name: {
    fontFamily: "Poppins",
    fontWeight: 500,
    fontSize: "20px",
    lineHeight: "32px",
    color: "#000000",
    paddingRight: theme.spacing(2),
  },
  image: {
    width: "67px",
    height: "60px",
    borderRadius: "100%",
  },
  divider: {
    width: "5px",
    height: "40px",
    backgroundColor: "#4C6FFF",
    borderRadius: "10px 0 0 10px",
  },
  postContainer: {
    display: "flex",
    flexDirection: "column",
    margin: "0 auto",
    height: "auto",
    minHeight: "85vh",
    width: "100%",
    borderRadius: "20px",
    padding: theme.spacing(4),
    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
    border: `1px solid #EDF1FF`,
    backgroundColor: "#FFFFFF",
    position: "relative",
    [theme.breakpoints.down('md')]: {
      // width: "70%",
      padding: "20px 25px",
      minHeight: "80vh",
    },
    [theme.breakpoints.down('sm')]: {
      // width: "95%",
      padding: "15px 20px",
      minHeight: "75vh",
    },
  },
  closeButton: {
    position: "absolute",
    top: "15px",
    right: "15px",
    color: "#6C6C6C",
    padding: "4px",
    "&:hover": {
      backgroundColor: "#f0f0f0",
      color: "#333",
    },
  },
  postHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  postHeaderTitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  head: {
    fontFamily: "Poppins",
    fontSize: "32px",
    fontWeight: "600",
    marginLeft: theme.spacing(2),
  },
  postForm: {
    marginTop: theme.spacing(2),
    overflow: "hidden",
  },
  postFormControl: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(3),
  },
  postFormLabel: {
    fontFamily: "Poppins",
    fontSize: "14px",
    fontWeight: "500",
    color: "#2B3041",
  },
  postFormLabelIcon: {
    marginRight: theme.spacing(4),
    color: "#4C6FFF",
    fontSize: "20px",
  },
  postFormButtons: {
    width: "50%",
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(12),
  },
  formsButton: {
    outline: "none",
    cursor: "pointer",
    height: "50px",
    width: "100%",
    borderRadius: "10px",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4C6FFF",
    fontFamily: "Poppins",
    fontSize: "18px",
    fontWeight: "600",
    color: "#FFFFFF",
    marginRight: theme.spacing(1.5),
    padding: theme.spacing(2, 6),
    "&:hover": {
      backgroundColor: "#3A54D9",
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: "15px",
      padding: theme.spacing(1),
    },
  },
  formsButtonAgree: {
    color: "#4C6FFF",
    backgroundColor: "#EDF1FF",
  },
  postFormInput: {
    outline: "none",
    width: "100%",
    borderRadius: "10px",
    backgroundColor: "#EDF1FF",
    border: "1px solid #B6C4FF",
    padding: theme.spacing(4),
    fontFamily: "Poppins",
    fontSize: "18px",
    fontWeight: "600",
    color: "#000000",
    marginTop: "7px",
    [theme.breakpoints.down('sm')]: {
      fontSize: "15px",
    },
    "&::placeholder": {
      color: "#000",
      fontFamily: "Poppins",
      fontSize: "18px",
      fontWeight: "600",
      [theme.breakpoints.down('sm')]: {
          fontSize: "15px",
      },
    },
  },
  postContentBox: {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
    padding: theme.spacing(4),
    border: `1px solid #B6C4FF`,
  },
  postContentBoxHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  imageProfile : {
    width: "48px",
    height: "48px",
    borderRadius: "100%",
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      width: "32px",
      height: "32px",
      marginRight: theme.spacing(0.5),
    },
  },
  namePost: {
    fontFamily: "Poppins",
    fontSize: "18px",
    fontWeight: "600",
    color: "#000000",
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      fontSize: "14px",
      fontWeight: "500",
      marginRight: theme.spacing(0.5),
    },
  },
  boxHeaderNameAndProfile: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginRight: theme.spacing(1.5),
  },
  boxHeaderResponseAndDurationCount: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  postContent: {
    marginTop: theme.spacing(2),
    overflow: "hidden",
  },
  postContentText: {
    fontFamily: "Poppins",
    fontSize: "18px",
    fontWeight: "500",
    color: "#6B6E7A",
    lineHeight: "1.5",
    [theme.breakpoints.down('sm')]: {
      fontSize: "15px",
      fontWeight: "400",
    },
  },
  disclaimerContentBox: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6),
  },
  postFooter: {
    marginTop: theme.spacing(2),
  },
  // Ads related styles
  advertisementContainer: {
    width: "100%",
    height: '65%',
    margin: "0, auto",
    backgroundColor: "#EDF1FF",
    borderRadius: "10px",
    padding: "20px",
    // marginBottom: theme.spacing(2),
    border: `1px solid #EDF1FF`,
    position: "relative",
    transition: "opacity 0.4s ease-in-out, transform 0.4s ease-in-out",
    opacity: 1,
    transform: "translateY(0)",
  },
  sponsoredLabel: {
    position: "absolute",
    top: "12px",
    right: "12px",
    backgroundColor: "#FF6B35",
    color: "#FFFFFF",
    fontSize: "10px",
    fontWeight: "600",
    padding: "3px 8px",
    borderRadius: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    zIndex: 1,
  },
  adImageContainer: {
    height: "500px",
    marginTop: "12px",
    borderRadius: "20px",
    [theme.breakpoints.down('sm')]: {
      height: "150px",
    },
  },
  adImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "20px",
  },
  adsSection: {
    height: '100%',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(3),
    },
  },
}));

const Answer = (props) => {
  // Styles
  const classes = styles();
  const history = useHistory();

  // Function to go back to home page
  const goBackToHome = () => {
    history.push("/");
  };
  
  const AddPost = () => {
    history.push("/wiki/question/ask");
  };

  // State for rotating ads
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [isAdTransitioning, setIsAdTransitioning] = useState(false);

  // Function for ad transitions
  const handleAdTransition = () => {
    setIsAdTransitioning(true);
    
    setTimeout(() => {
      setCurrentAdIndex((prevIndex) => 
        (prevIndex + 1) % 3 // Assuming 3 ad types
      );
      setIsAdTransitioning(false);
    }, 500);
  };

  // Effect for ad rotation - every 8 seconds
  useEffect(() => {
    const adInterval = setInterval(() => {
      handleAdTransition();
    }, 8000);

    return () => clearInterval(adInterval);
  }, []);

  return (
    <Box className={classes.root}>
      <div className="box">
        <Grid container spacing={3} style={{ marginTop: "20px" }}>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            <Box className={classes.postContainer}>
              {/* X Button to go back to home */}
              <IconButton
                className={classes.closeButton}
                onClick={goBackToHome}
                aria-label="close"
              >
                <Close />
              </IconButton>

              <Box className={classes.postHeader}>
                <div className={classes.postHeaderTitle}>
                  <Typography
                    className={classes.head}
                  >
                    Answer
                  </Typography>
                </div>
              </Box>

              <Box className={classes.postForm}>
                <form action="">
                  <Box className={classes.postContentBox}>
                    <Box className={classes.postContentBoxHeader}>
                      {/* header of box name response and duration */}
                      <div className={classes.boxHeaderNameAndProfile}>
                        {/* Name and profile icon */}
                        <img
                          src={Advertisement}
                          alt="Placeholder"
                          className={classes.imageProfile}
                        />
                        <Typography
                          className={classes.namePost}
                        >
                          Bernadette Joes
                        </Typography>
                      </div>
                      <div className={classes.boxHeaderResponseAndDurationCount}>
                        <Box>
                          <Typography
                            style={{
                              fontFamily: "Poppins",
                              fontSize: "12px",
                              fontWeight: "400",
                              color: "#6B6E7A",
                            }}
                          >
                            3 Months ago
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            style={{
                              fontSize: "12px",
                              fontWeight: "400",
                              color: "#6B6E7A",
                              margin: "0px 10px",
                            }}
                          >
                            |
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            style={{
                              fontFamily: "Poppins",
                              fontSize: "12px",
                              fontWeight: "400",
                              color: "#6B6E7A",
                            }}
                          >
                            Response : 1
                          </Typography>
                        </Box>
                      </div>
                    </Box>
                    <Box className={classes.postContent}>
                      {/* main content */}
                      <Typography
                        className={classes.postContentText}
                      >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Donec euismod, nisl eget consectetur sagittis, nisl nunc
                        euismod nisi, vitae aliquam nunc nisl euismod nisi. Donec
                        euismod,
                      </Typography>
                    </Box>
                    <Box className={classes.postFooter}>
                      {/* buttons of like and dislike */}
                      <Box style={{ display: "flex", alignItems: "center" }}>
                        <Box
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginRight: "20px",
                          }}
                        >
                          <FiThumbsUp
                            size={20}
                            color="#56B954"
                            style={{ marginRight: "10px" }}
                          />
                          <Typography
                            style={{
                              fontFamily: "Poppins",
                              fontSize: "14px",
                              fontWeight: "400",
                              color: "#56B954",
                            }}
                          >
                            1
                          </Typography>
                        </Box>
                        <Box
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <FiThumbsDown
                            size={20}
                            color="#FF3C3C"
                            style={{ marginRight: "10px" }}
                          />
                          <Typography
                            style={{
                              fontFamily: "Poppins",
                              fontSize: "14px",
                              fontWeight: "400",
                              color: "#FF3C3C",
                            }}
                          >
                            0
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                  <Box className={classes.disclaimerContentBox}>
                    {/* header of box name response and duration */}
                    <div className={classes.boxContentHeader}>
                      <Typography
                        style={{
                          fontFamily: "Poppins",
                          fontSize: "18px",
                          fontWeight: "600",
                          marginLeft: "10px",
                          marginTop: "20px",
                        }}
                        // className={classes.postContentText}
                      >
                        Disclaimer
                      </Typography>

                      <Typography
                        style={{
                          color: "#6B6E7A",
                          fontFamily: "Poppins",
                          // fontSize: "15px",
                          // fontWeight: "400",
                          marginLeft: "10px",
                          marginTop: "10px",
                        }}
                        className={classes.postContentText}
                      >
                        This is an AI-generated response. We'll let you know when an actual medical professional reviews your question.
                      </Typography>
                    </div>
                  </Box>

                  <div className={classes.postFormControl}>
                    <textarea
                      placeholder="Lorem ipsum dolor sit amet consectetur. Lectus quis vulputate auctor senectus ullamcorper.. Nunc facilisis mi amet adipiscing turpis erat..  Nunc facilisis mi amet adipiscing turpis erat.. Vestibulum dolor tellus netus vestibulum sit amet erat..Nunc facilisis mi amet adipiscing turpis erat.. Vestibulum dolor tellus netus vestibulum sit amet erat.. Nunc facilisis mi amet adipiscing turpis erat.. Vestibulum dolor tellus netus vestibulum sit amet erat..Nunc facilisis mi amet adipiscing turpis erat.. Vestibulum dolor tellus netus vestibulum sit amet erat.."
                      rows={5}
                      type="text"
                      className={classes.postFormInput}
                    />
                  </div>

                  <div className={classes.postFormButtons}>
                    <Box marginRight={2}>
                      <IconButton theme="primary" className={classes.formsButton} onClick={AddPost}>
                        Add Another Post
                      </IconButton>
                    </Box>
                  </div>
                </form>
              </Box>
            </Box>
          </Grid>

          {/* Ads Section */}
          <Grid item xs={12} md={4}>
            <Box className={classes.adsSection}>
              <Ads 
                adIndex={currentAdIndex} 
                isTransitioning={isAdTransitioning}
                classes={classes}
              />
              {/* <Ads 
                adIndex={(currentAdIndex + 1) % 3} 
                isTransitioning={isAdTransitioning}
                classes={classes}
              /> */}
            </Box>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};

Answer.propTypes = {};

export default Answer;

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
      companyName: "Medical Solutions",
      companyImage: Advertisement,
      timeAgo: "Sponsored",
      responses: "Ad",
      content: "Advanced diagnostic tools and medical equipment for better healthcare outcomes.",
      image: Advertisement,
      hasText: true,
    },
    {
      companyName: "Wellness Center",
      companyImage: Advertisement,
      timeAgo: "Sponsored",
      responses: "Ad",
      content: "Comprehensive wellness programs designed for your health and wellbeing.",
      image: Advertisement,
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
          gap: "10px",
        }}
      >
        <Box style={{ display: "flex", alignItems: "center" }}>
          <img
            src={selectedAd.companyImage}
            alt="Company Avatar"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
            }}
          />
          <Box>
            <Typography
              style={{
                fontSize: "16px",
                fontWeight: "600",
                marginLeft: "10px",
              }}
            >
              {selectedAd.companyName}
            </Typography>
          </Box>
        </Box>
        <Box style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
          <Typography
            style={{
              fontFamily: "Poppins",
              fontSize: "12px",
              fontWeight: "400",
              color: "#6B6E7A",
            }}
          >
            {selectedAd.timeAgo}
          </Typography>
          <Typography
            style={{
              fontSize: "12px",
              fontWeight: "400",
              color: "#6B6E7A",
              margin: "0px 10px",
            }}
          >
            |
          </Typography>
          <Typography
            style={{
              fontFamily: "Poppins",
              fontSize: "12px",
              fontWeight: "400",
              color: "#6B6E7A",
            }}
          >
            {selectedAd.responses}
          </Typography>
        </Box>
      </Box>

      {/* Ad Content - Text */}
      {selectedAd.hasText && (
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "12px",
            flexWrap: "wrap",
            gap: "15px",
          }}
        >
          <Box style={{ flex: 1, minWidth: "200px" }}>
            <Typography
              style={{
                fontFamily: "Poppins",
                fontSize: "14px",
                fontWeight: "400",
              }}
            >
              {selectedAd.content}
            </Typography>
          </Box>

          {/* <Box style={{ display: "flex", alignItems: "center" }}>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "20px",
              }}
            >
              <FiThumbsUp
                size={20}
                color="#56B954"
                style={{ marginRight: "10px" }}
              />
              <Typography
                style={{
                  fontFamily: "Poppins",
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#56B954",
                }}
              >
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
                size={20}
                color="#FF3C3C"
                style={{ marginRight: "10px" }}
              />
              <Typography
                style={{
                  fontFamily: "Poppins",
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#FF3C3C",
                }}
              >
                {Math.floor(Math.random() * 5)}
              </Typography>
            </Box>
          </Box> */}
        </Box>
      )}

      {/* Ad Image */}
      <div className={classes.adImageContainer}>
        <img
          src={selectedAd.image}
          alt="Advertisement"
          className={classes.adImage}
        />
      </div>

      {/* If no text content, show likes/dislikes below image */}
      {!selectedAd.hasText && (
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            marginTop: "12px",
          }}
        >
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "20px",
            }}
          >
            <FiThumbsUp
              size={20}
              color="#56B954"
              style={{ marginRight: "10px" }}
            />
            <Typography
              style={{
                fontFamily: "Poppins",
                fontSize: "14px",
                fontWeight: "400",
                color: "#56B954",
              }}
            >
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
              size={20}
              color="#FF3C3C"
              style={{ marginRight: "10px" }}
            />
            <Typography
              style={{
                fontFamily: "Poppins",
                fontSize: "14px",
                fontWeight: "400",
                color: "#FF3C3C",
              }}
            >
              {Math.floor(Math.random() * 5)}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};