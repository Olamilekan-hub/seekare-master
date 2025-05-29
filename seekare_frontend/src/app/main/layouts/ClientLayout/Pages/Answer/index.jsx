// React
import React, { useState } from "react";
import PropTypes from "prop-types";

// Material UI
import { makeStyles, Box, Grid, Typography } from "@material-ui/core";

// React Icons
import { FiThumbsUp } from "react-icons/fi";
import { FiThumbsDown } from "react-icons/fi";

// Components
import IconButton from "app/main/shared-components/Button/IconButton";

// Images
import Advertisement from "../../../../../../assets/images/advertisement.png";
import Advertisement02 from "../../../../../../assets/images/advertisement-02.avif";

// Styled
const styles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    backgroundColor: "#FFFFFF",
    padding: theme.spacing(2),
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
    height: "100%",
    width: "100%",
    borderRadius: "10px",
    padding: theme.spacing(4),
    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.07)",
    border: `1px solid #EDF1FF`,
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
    height: "40px",
    width: "100%",
    borderRadius: "10px",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4C6FFF",
    fontFamily: "Poppins",
    fontSize: "16px",
    fontWeight: "600",
    color: "#FFFFFF",
    marginRight: theme.spacing(1.5),
    padding: theme.spacing(1.5),
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
    fontSize: "16px",
    fontWeight: "600",
    color: "#000000",
    marginTop: "7px",
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
  disclaimerContentBox: {
    marginTop: theme.spacing(2),
  },
  postFooter: {
    marginTop: theme.spacing(2),
  },
  advertisementContainer: {
    width: "100%",
    height: "344.3px",
    borderRadius: "10px",
    marginBottom: theme.spacing(1.4),
    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.07)",
    border: `1px solid #EDF1FF`,
  },
  advertisementImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "10px",
  },
}));

const Answer = (props) => {
  // Styles
  const classes = styles();

  return (
    <Box className={classes.root}>
      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        <Grid item xs={12} md={8}>
          <Box className={classes.postContainer}>
            <Box className={classes.postHeader}>
              <div className={classes.postHeaderTitle}>
                <Typography
                  style={{
                    fontFamily: "Poppins",
                    fontSize: "24px",
                    fontWeight: "600",
                    marginLeft: "10px",
                  }}
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
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "100%",
                        }}
                      />
                      <Typography
                        style={{
                          fontSize: "16px",
                          fontWeight: "600",
                          marginLeft: "10px",
                        }}
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
                          Response : 0
                        </Typography>
                      </Box>
                    </div>
                  </Box>
                  <Box className={classes.postContent}>
                    {/* main content */}
                    <Typography
                      style={{
                        fontFamily: "Poppins",
                        fontSize: "15px",
                        fontWeight: "400",
                        color: "#6B6E7A",
                      }}
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
                        fontSize: "16px",
                        fontWeight: "600",
                        marginLeft: "10px",
                      }}
                    >
                      Disclaimer
                    </Typography>

                    <Typography
                      style={{
                        color: "#6B6E7A",
                        fontFamily: "Poppins",
                        fontSize: "15px",
                        fontWeight: "400",
                        marginLeft: "10px",
                        marginTop: "10px",
                      }}
                    >
                      Lorem ipsum dolor sit amet consectetur. Lectus quis
                      vulputate auctor senectus ullamcorper.. Nunc facilisis mi
                      amet adipiscing turpis erat.. Vestibulum dolor tellus
                      netus vestibulum sit amet erat..Lorem ipsum dolor sit amet
                      consectetur. Lectus quis vulputate auctor senectus
                      ullamcorper..
                    </Typography>
                  </div>
                </Box>

                <div className={classes.postFormControl}>
                  <textarea
                    rows={5}
                    type="text"
                    className={classes.postFormInput}
                  />
                </div>

                <div className={classes.postFormButtons}>
                  <Box marginRight={2}>
                    <IconButton theme="primary" className={classes.formsButton}>
                      Add Another Post
                    </IconButton>
                  </Box>
                </div>
              </form>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Grid
            container
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box className={classes.advertisementContainer}>
                <img
                  src={Advertisement02}
                  alt="Advertisement"
                  className={classes.advertisementImage}
                />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box className={classes.advertisementContainer}>
                <img
                  src={Advertisement02}
                  alt="Advertisement01"
                  className={classes.advertisementImage}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

Answer.propTypes = {};

export default Answer;
