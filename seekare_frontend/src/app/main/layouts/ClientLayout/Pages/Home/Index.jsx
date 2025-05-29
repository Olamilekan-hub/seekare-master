// React
import React from "react";

// Material UI
import { makeStyles, Box, Grid, Typography } from "@material-ui/core";

// React Router
import { useHistory } from "react-router-dom";

// React Icons
import { FaPlusCircle } from "react-icons/fa";
import { FiThumbsUp } from "react-icons/fi";
import { FiThumbsDown } from "react-icons/fi";

// Third Party
import { Splide, SplideSlide } from "@splidejs/react-splide";

// Components
import IconButton from "app/main/shared-components/Button/IconButton";

// Images
import ChatVoiceLine from "../../../../../../assets/images/chat-voice-line.png";
import ModeratedByPhysicians from "../../../../../../assets/images/moderated-by-physicians.png";
import ShareYourExperiences from "../../../../../../assets/images/share-your-experiences.png";
import FightAgainstMisinformation from "../../../../../../assets/images/fight-against-misinformation.png";
import Advertisement from "../../../../../../assets/images/advertisement.png";
import Advertisement01 from "../../../../../../assets/images/advertisement-01.png";
import Advertisement02 from "../../../../../../assets/images/advertisement-02.avif";

// Styled
const styles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    backgroundColor: "#FFFFFF",
    padding: theme.spacing(2),
  },
  informationCard: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: "10px",
    padding: theme.spacing(2, 0, 2, 2),
    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.07)",
    border: `1px solid #EDF1FF`,
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
    backgroundColor: "#FFFFFF",
    padding: theme.spacing(4, 3),
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
  advertisementContainer: {
    width: "300px",
    height: "300px",
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

const Home = (props) => {
  // Styles
  const classes = styles();
  const history = useHistory();

  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Box className={classes.informationCard}>
            {/* Images */}
            <img
              src={ModeratedByPhysicians}
              alt="Moderated By Physicians"
              className={classes.image}
            />

            {/* Name */}
            <Typography variant="body1" className={classes.name}>
              Moderated by physicians
            </Typography>
            <div className={classes.divider}></div>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box className={classes.informationCard}>
            {/* Images */}
            <img
              src={ShareYourExperiences}
              alt="Share Your Experiences"
              className={classes.image}
            />

            {/* Name */}
            <Typography variant="body1" className={classes.name}>
              Share your experiences
            </Typography>
            <div className={classes.divider}></div>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box className={classes.informationCard}>
            {/* Images */}
            <img
              src={FightAgainstMisinformation}
              alt="Fight Against Misinformation"
              className={classes.image}
            />

            {/* Name */}
            <Typography variant="body1" className={classes.name}>
              Fight against misinformation
            </Typography>
            <div className={classes.divider}></div>
          </Box>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        style={{ marginTop: "20px", paddingBottom: "20px" }}
      >
        <Grid item xs={12} md={8}>
          <Box className={classes.postContainer}>
            <Box className={classes.postHeader}>
              <div className={classes.postHeaderTitle}>
                <img
                  src={ChatVoiceLine}
                  alt="Placeholder"
                  style={{ width: "28px", height: "28px" }}
                />

                <Box>
                  <Typography
                    style={{
                      fontFamily: "Poppins",
                      fontSize: "24px",
                      fontWeight: "600",
                      marginLeft: "10px",
                    }}
                  >
                    KarePost
                  </Typography>
                </Box>
              </div>
              <div className="">
                <IconButton
                  theme="primary"
                  icon={<FaPlusCircle size={21} color="#FFFFFF" />}
                  onClick={() => {
                    history.push("/wiki/question/ask");
                  }}
                >
                  Add Post
                </IconButton>
              </div>
            </Box>

            <Box
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#EDF1FF",
                  borderRadius: "10px",
                  padding: "20px",
                  marginTop: "20px",
                  border: `1px solid #EDF1FF`,
                }}
              >
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={Advertisement}
                      alt="Placeholder"
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "100%",
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
                        Bernadette Joes
                      </Typography>
                    </Box>
                  </Box>
                  <Box style={{ display: "flex", alignItems: "center" }}>
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
                  </Box>
                </Box>
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "12px",
                  }}
                >
                  <Box>
                    <Typography
                      style={{
                        fontFamily: "Poppins",
                        fontSize: "14px",
                        fontWeight: "400",
                      }}
                    >
                      Can weight lifting alone help improve insulin resistance?
                    </Typography>
                  </Box>

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

              <Box
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#EDF1FF",
                  borderRadius: "10px",
                  padding: "20px",
                  marginTop: "20px",
                  border: `1px solid #EDF1FF`,
                }}
              >
                <Splide
                  aria-label="My Favorite Images"
                  options={{
                    type: "loop",
                    perPage: 1,
                    pagination: false,
                    arrows: false,
                    autoplay: true,
                    interval: 2000,
                  }}
                >
                  <SplideSlide>
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
                          src={Advertisement}
                          alt="Advertisement"
                          className={classes.advertisementImage}
                        />
                      </Box>
                    </Grid>
                  </SplideSlide>
                  <SplideSlide>
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
                          src={Advertisement01}
                          alt="Advertisement01"
                          className={classes.advertisementImage}
                        />
                      </Box>
                    </Grid>
                  </SplideSlide>
                </Splide>
              </Box>

              <Box
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#EDF1FF",
                  borderRadius: "10px",
                  padding: "20px",
                  marginTop: "20px",
                  border: `1px solid #EDF1FF`,
                }}
              >
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={Advertisement}
                      alt="Placeholder"
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "100%",
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
                        Bernadette Joes
                      </Typography>
                    </Box>
                  </Box>
                  <Box style={{ display: "flex", alignItems: "center" }}>
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
                  </Box>
                </Box>
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "12px",
                  }}
                >
                  <Box>
                    <Typography
                      style={{
                        fontFamily: "Poppins",
                        fontSize: "14px",
                        fontWeight: "400",
                      }}
                    >
                      Can COPD attacks be decreased?
                    </Typography>
                  </Box>

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
            </Box>
          </Box>
        </Grid>

        {/* <Grid item xs={12} md={4}>
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
        </Grid> */}
      </Grid>
    </Box>
  );
};

Home.propTypes = {};

export default Home;
