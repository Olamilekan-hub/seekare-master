// React
import React, { useState } from "react";
import PropTypes from "prop-types";

// Material UI
import { makeStyles, Box, Grid, Typography } from "@material-ui/core";

// React Icons
import { AiOutlineCloudUpload } from "react-icons/ai";

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
    height: "75vh",
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
    marginTop: theme.spacing(4),
    overflow: "hidden",
  },
  postFormControl: {
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(2),
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
    marginTop: theme.spacing(5),
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
    padding: theme.spacing(1.5, 2),
    fontFamily: "Poppins",
    fontSize: "16px",
    fontWeight: "400",
    color: "#000000",
    marginTop: "7px",
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

const Question = (props) => {
  // states
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");

  // Styles
  const classes = styles();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("File selected:", file);
      setFileName(file.name); // Set the selected file name
      setFileSize(formatFileSize(file.size)); // Set the formatted file size
      // Handle the file upload logic here
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

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
                  Add Your Post
                </Typography>
              </div>
            </Box>

            <Box className={classes.postForm}>
              <form action="">
                <div className={classes.postFormControl}>
                  <label className={classes.postFormLabel} htmlFor="">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Why is Covid is so  dangerous?"
                    className={classes.postFormInput}
                  />
                </div>

                <div className={classes.postFormControl}>
                  <label className={classes.postFormLabel} htmlFor="">
                    Text
                  </label>
                  <textarea
                    rows={5}
                    type="text"
                    className={classes.postFormInput}
                  />
                </div>

                <div className={classes.postFormControl}>
                  <label
                    htmlFor="file-upload"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "#4C6FFF",
                      fontFamily: "Poppins",
                      fontSize: "22px",
                      fontWeight: "600",
                      marginRight: "15px",
                      marginBottom: "10px",
                      cursor: "pointer",
                    }}
                  >
                    Upload Image{" "}
                    <AiOutlineCloudUpload
                      size={32}
                      style={{ color: "#4C6FFF", marginLeft: "10px" }}
                    />
                    {fileName && (
                      <span style={{ marginLeft: "10px", fontSize: "16px" }}>
                        {fileName}{" "}
                        <span style={{ fontSize: "12px", color: "#666" }}>
                          {fileSize}
                        </span>
                      </span>
                    )}
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{
                      display: "none",
                    }}
                  />
                  <p
                    style={{
                      fontFamily: "Poppins",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#2B3041",
                      marginTop: "5px",
                    }}
                  >
                    Include images related to this question
                  </p>
                </div>

                <div className={classes.postFormControl}>
                  <label
                    htmlFor=""
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "#4C6FFF",
                      fontFamily: "Poppins",
                      fontSize: "22px",
                      fontWeight: "600",
                      marginRight: "15px",
                      marginBottom: "10px",
                    }}
                  >
                    Tags
                  </label>
                  <label className={classes.postFormLabel} htmlFor="">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Why is Covid is so  dangerous?"
                    className={classes.postFormInput}
                  />
                </div>

                <div className={classes.postFormButtons}>
                  <Box marginRight={2}>
                    <IconButton
                      theme="light"
                      className={`${classes.formsButton} ${classes.formsButtonAgree}`}
                    >
                      Agree and Post
                    </IconButton>
                  </Box>
                  <Box marginRight={2}>
                    <IconButton theme="primary" className={classes.formsButton}>
                      Discard Your Post
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

Question.propTypes = {};

export default Question;
