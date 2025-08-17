 import WikiRightSidebar from "../../../../wiki/wikiRightSidebar";

export default function Home() {  
  return (
      <WikiRightSidebar />
  )
};


// // React
// import React, { useState, useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";

// // Material UI
// import { makeStyles, Box, Grid, Typography } from "@material-ui/core";

// // React Router
// import { useHistory } from "react-router-dom";

// // React Icons
// import { FaPlusCircle } from "react-icons/fa";
// import { FiThumbsUp } from "react-icons/fi";
// import { FiThumbsDown } from "react-icons/fi";

// // Components
// import IconButton from "app/main/shared-components/Button/IconButton";
// import Spinner from "../../../../wiki/spinner";

// // Actions
// import { getSortedQuestions } from "app/store/question/actions";
// import { getReferencedAnswers } from "app/store/answer/actions";

// // Hooks
// import useAuth from "app/hooks/useAuth";

// // Images
// import ChatVoiceLine from "../../../../../../assets/images/chat-voice-line.png";
// import ModeratedByPhysicians from "../../../../../../assets/images/moderated-by-physicians.png";
// import ShareYourExperiences from "../../../../../../assets/images/share-your-experiences.png";
// import FightAgainstMisinformation from "../../../../../../assets/images/fight-against-misinformation.png";
// import Advertisement from "../../../../../../assets/images/advertisement.png";
// import Advertisement01 from "../../../../../../assets/images/advertisement-01.png";
// import Advertisement02 from "../../../../../../assets/images/advertisement-02.avif";

// // Styled
// const styles = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//     height: "100%",
//     backgroundColor: "#FFFFFF",
//     padding: theme.spacing(2),
//   },
//   rotatingHeader: {
//     width: "95%",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#FFFFFF",
//     borderRadius: "15px",
//     padding: theme.spacing(3, 2),
//     boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
//     border: `1px solid #EDF1FF`,
//     marginBottom: theme.spacing(3),
//     minHeight: "80px",
//     position: "relative",
//     overflow: "hidden",
//     margin: "0 auto 24px auto",
//     [theme.breakpoints.down('lg')]: {
//       padding: theme.spacing(3, 2),
//       width: "75%",
//     },
//     [theme.breakpoints.down('md')]: {
//       padding: theme.spacing(3, 2),
//       width: "70%",
//     },
//     [theme.breakpoints.down('sm')]: {
//       width: "100%",
//       padding: theme.spacing(2, 1.5),
//       gap: theme.spacing(1),
//       minHeight: "70px",
//     },
//   },
//   headerContent: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     width: "100%",
//     transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
//     opacity: 1,
//     transform: "translateY(0)",
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//   },
//   headerImage: {
//     width: "60px",
//     height: "60px",
//     borderRadius: "50%",
//     marginRight: theme.spacing(2),
//     [theme.breakpoints.down('sm')]: {
//       width: "45px",
//       height: "45px",
//       marginRight: theme.spacing(1),
//     },
//   },
//   headerText: {
//     fontFamily: "Poppins",
//     fontWeight: 600,
//     fontSize: "28px",
//     lineHeight: "32px",
//     color: "#000000",
//     textAlign: "center",
//     [theme.breakpoints.down('sm')]: {
//       fontSize: "18px",
//       lineHeight: "24px",
//     },
//     [theme.breakpoints.down('xs')]: {
//       fontSize: "16px",
//       lineHeight: "20px",
//     },
//   },
//   divider: {
//     width: "6px",
//     height: "50px",
//     backgroundColor: "#4C6FFF",
//     borderRadius: "10px",
//     marginLeft: theme.spacing(2),
//     [theme.breakpoints.down('sm')]: {
//       width: "4px",
//       height: "40px",
//     },
//   },
//   postContainer: {
//     height: "100%",
//     width: "95%",
//     borderRadius: "10px",
//     backgroundColor: "#FFFFFF",
//     padding: theme.spacing(4, 6),
//     margin: theme.spacing(0, "auto"),
//     boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.07)",
//     border: `1px solid #EDF1FF`,
//     [theme.breakpoints.down('lg')]: {
//       padding: theme.spacing(4, 6),
//       width: "75%",
//     },
//     [theme.breakpoints.down('md')]: {
//       padding: theme.spacing(4, 6),
//       width: "80%",
//     },
//     [theme.breakpoints.down('sm')]: {
//       padding: theme.spacing(2, 1.5),
//       width: "100%",
//     },
//   },
//   postHeader: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     [theme.breakpoints.down('sm')]: {
//       alignItems: "flex-start",
//       gap: theme.spacing(2),
//     },
//   },
//   addPostButton: {
//     backgroundColor: "#4C6FFF",
//     color: "#FFFFFF",
//     fontFamily: "Poppins",
//     fontSize: "16px",
//     fontWeight: "600",
//     padding: theme.spacing(.8, 1),
//     width: "fit-content",
//     "&:hover": {
//       backgroundColor: "#3A54D9",
//     },
//     borderRadius: "8px",
//     [theme.breakpoints.down('md')]: {
//       fontSize: "12px",
//       padding: theme.spacing(0.5, .8),
//     },
//   },
//   postHeaderTitle: {
//     display: "flex",
//     alignItems: "center",
//   },
//   advertisementContainer: {
//     width: "100%",
//     backgroundColor: "#EDF1FF",
//     borderRadius: "10px",
//     padding: "20px",
//     marginTop: "20px",
//     paddingBottom: "20px",
//     border: `1px solid #EDF1FF`,
//     position: "relative",
//     transition: "opacity 0.4s ease-in-out, transform 0.4s ease-in-out",
//     opacity: 1,
//     transform: "translateY(0)",
//     [theme.breakpoints.down('md')]: {
//       padding: "15px",
//     },
//     [theme.breakpoints.down('sm')]: {
//       padding: "12px",
//       marginTop: "15px",
//     },
//   },
//   sponsoredLabel: {
//     position: "absolute",
//     top: "12px",
//     right: "12px",
//     backgroundColor: "#FF6B35",
//     color: "#FFFFFF",
//     fontSize: "10px",
//     fontWeight: "600",
//     padding: "3px 8px",
//     borderRadius: "12px",
//     textTransform: "uppercase",
//     letterSpacing: "0.5px",
//     zIndex: 1,
//     [theme.breakpoints.down('sm')]: {
//       fontSize: "8px",
//       padding: "2px 6px",
//       top: "8px",
//       right: "8px",
//     },
//   },
//   ImageContainer: {
//     height: "50vh",
//     width: "80%",
//     margin: "auto",
//     borderRadius: "20px",
//     [theme.breakpoints.down('lg')]: {
//       height: "50vh",
//       width: "100%",
//     },
//     [theme.breakpoints.down('md')]: {
//       height: "300px",
//       width: "100%",
//     },
//     [theme.breakpoints.down('sm')]: {
//       height: "200px",
//       width: "100%",
//     },
//   },
//   adImage: {
//     width: "100%",
//     height: "100%",
//     objectFit: "cover",
//     marginTop: "12px",
//     borderRadius: "20px",
//     [theme.breakpoints.down('sm')]: {
//       marginTop: "8px",
//       borderRadius: "15px",
//     },
//   },
//   // Post styles
//   postBox: {
//     width: "100%",
//     backgroundColor: "#EDF1FF",
//     borderRadius: "10px",
//     padding: "20px",
//     marginTop: "20px",
//     border: `1px solid #EDF1FF`,
//     cursor: "pointer", // Add cursor pointer
//     transition: "all 0.2s ease-in-out", // Add smooth transition
//     "&:hover": {
//       transform: "translateY(-2px)",
//       boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
//       backgroundColor: "#E8E7FF", // Slightly darker on hover
//       borderColor: "#C4C1FF", // Change border color on hover
//     },
//     [theme.breakpoints.down('md')]: {
//       padding: "15px",
//     },
//     [theme.breakpoints.down('sm')]: {
//       padding: "12px",
//       marginTop: "15px",
//       borderRadius: "8px",
//     },
//   },
//   postUserName: {
//     fontSize: "16px",
//     fontWeight: "600",
//     marginLeft: "10px",
//     [theme.breakpoints.down('md')]: {
//       fontSize: "14px",
//     },
//     [theme.breakpoints.down('sm')]: {
//       fontSize: "13px",
//       marginLeft: "8px",
//     },
//   },
//   postUserAvatar: {
//     width: "32px",
//     height: "32px",
//     borderRadius: "50%",
//     [theme.breakpoints.down('sm')]: {
//       width: "28px",
//       height: "28px",
//     },
//   },
//   postMetaText: {
//     fontFamily: "Poppins",
//     fontSize: "12px",
//     fontWeight: "400",
//     color: "#6B6E7A",
//     [theme.breakpoints.down('sm')]: {
//       fontSize: "10px",
//     },
//   },
//   postContentText: {
//     fontFamily: "Poppins",
//     fontSize: "14px",
//     fontWeight: "400",
//     [theme.breakpoints.down('md')]: {
//       fontSize: "13px",
//     },
//     [theme.breakpoints.down('sm')]: {
//       fontSize: "12px",
//     },
//   },
//   // Ad specific styles
//   adCompanyName: {
//     fontSize: "16px",
//     fontWeight: "600",
//     marginLeft: "10px",
//     [theme.breakpoints.down('md')]: {
//       fontSize: "14px",
//     },
//     [theme.breakpoints.down('sm')]: {
//       fontSize: "13px",
//       marginLeft: "8px",
//     },
//   },
//   adCompanyAvatar: {
//     width: "32px",
//     height: "32px",
//     borderRadius: "50%",
//     [theme.breakpoints.down('sm')]: {
//       width: "28px",
//       height: "28px",
//     },
//   },
//   adContentText: {
//     fontFamily: "Poppins",
//     fontSize: "14px",
//     fontWeight: "400",
//     [theme.breakpoints.down('md')]: {
//       fontSize: "13px",
//     },
//     [theme.breakpoints.down('sm')]: {
//       fontSize: "12px",
//     },
//   },
//   adMetaText: {
//     fontFamily: "Poppins",
//     fontSize: "12px",
//     fontWeight: "400",
//     color: "#6B6E7A",
//     [theme.breakpoints.down('sm')]: {
//       fontSize: "10px",
//     },
//   },
//   postsContainer: {
//     maxHeight: "70vh",
//     overflow: "auto",
//     "&::-webkit-scrollbar": {
//       width: "6px",
//     },
//     "&::-webkit-scrollbar-thumb": {
//       backgroundColor: "#ccc",
//       borderRadius: "3px",
//     },
//   },
// }));

// // Header messages data
// const headerMessages = [
//   {
//     image: ModeratedByPhysicians,
//     text: "Moderated by physicians",
//     alt: "Moderated By Physicians"
//   },
//   {
//     image: ShareYourExperiences,
//     text: "Share your experiences",
//     alt: "Share Your Experiences"
//   },
//   {
//     image: FightAgainstMisinformation,
//     text: "Fight against misinformation",
//     alt: "Fight Against Misinformation"
//   }
// ];

// const Home = (props) => {
//   // Styles
//   const classes = styles();
//   const history = useHistory();
//   const dispatch = useDispatch();
  
//   // Auth hook
//   const { isAuthenticated, currentUser, isMd, isAdmin } = useAuth();
  
//   // Redux selectors
//   const { questions: qs, searchTerm, page, isLoading, total } = useSelector((state) => state.question);
//   const answers = useSelector((state) => state.answer.answers);
//   const { id: activeWikiId } = useSelector((state) => state.wiki.activeWiki);
  
//   // State for rotating header
//   const [currentHeaderIndex, setCurrentHeaderIndex] = useState(0);
//   const [isHeaderTransitioning, setIsHeaderTransitioning] = useState(false);
  
//   // State for rotating ads
//   const [currentAdIndex, setCurrentAdIndex] = useState(0);
//   const [isAdTransitioning, setIsAdTransitioning] = useState(false);
  
//   // State for posts (similar to WikiRightSidebar)
//   const [questions, setQuestions] = useState([]);
//   const [pageNum, setPageNum] = useState(0);
//   const [referencedPosts, setReferencedPosts] = useState(false);
  
//   // Ref for scroll container
//   const scrollContainerRef = useRef(null);

//   // Function for header transitions
//   const handleHeaderTransition = () => {
//     setIsHeaderTransitioning(true);
    
//     setTimeout(() => {
//       setCurrentHeaderIndex((prevIndex) => 
//         (prevIndex + 1) % headerMessages.length
//       );
//       setIsHeaderTransitioning(false);
//     }, 300);
//   };

//   // Function for ad transitions
//   const handleAdTransition = () => {
//     setIsAdTransitioning(true);
    
//     setTimeout(() => {
//       setCurrentAdIndex((prevIndex) => 
//         (prevIndex + 1) % 3
//       );
//       setIsAdTransitioning(false);
//     }, 500);
//   };

//   // Effect for header rotation - every 5 seconds
//   useEffect(() => {
//     const headerInterval = setInterval(() => {
//       handleHeaderTransition();
//     }, 5000);

//     return () => clearInterval(headerInterval);
//   }, []);

//   // Effect for ad rotation - every 12 seconds
//   useEffect(() => {
//     const adInterval = setInterval(() => {
//       handleAdTransition();
//     }, 12000);

//     return () => clearInterval(adInterval);
//   }, []);

//   // Fetch questions (similar to WikiRightSidebar logic)
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       return dispatch(
//         getSortedQuestions({
//           q: searchTerm,
//           qSetting: "exact",
//           page: pageNum,
//           activeWikiId: undefined, // For home page, we don't filter by activeWikiId
//         })
//       );
//     };

//     fetchQuestions();
//   }, [dispatch, searchTerm, pageNum]);

//   // Update questions state when new questions are fetched
//   useEffect(() => {
//     if (qs.length === 0) {
//       setQuestions([]);
//     } else {
//       if (qs[1]?._id === questions[0]?._id) {
//         setQuestions([...qs]);
//       } else {
//         setQuestions([...questions, ...qs]);
//       }
//     }
//   }, [qs]);

//   // Scroll handler for infinite loading
//   const onScrollHandler = (e) => {
//     const bottom = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 50;
//     if (bottom && !isLoading && total > pageNum + 1) {
//       setPageNum(Number(pageNum) + 1);
//     }
//   };

//   // Function to render posts with ads every 5 posts
//   const renderPostsWithAds = () => {
//     const items = [];
    
//     questions.forEach((question, index) => {
//       // Add the post
//       items.push(
//         <Post key={`post-${question._id || index}`} question={question} />
//       );
      
//       // Add ad after every 5 posts
//       if ((index + 1) % 5 === 0) {
//         items.push(
//           <Ads 
//             key={`ad-${index}`}
//             adIndex={(Math.floor(index / 5) + currentAdIndex) % 3} 
//             isTransitioning={isAdTransitioning}
//           />
//         );
//       }
//     });
    
//     return items;
//   };

//   return (
//     <Box className={classes.root}>
//       {/* Rotating Header */}
//       <Box className={classes.rotatingHeader}>
//         <Box 
//           className={classes.headerContent}
//           style={{
//             opacity: isHeaderTransitioning ? 0 : 1,
//             transform: isHeaderTransitioning 
//               ? "translate(-50%, -60%)" 
//               : "translate(-50%, -50%)",
//           }}
//         >
//           <img
//             src={headerMessages[currentHeaderIndex].image}
//             alt={headerMessages[currentHeaderIndex].alt}
//             className={classes.headerImage}
//           />
//           <Typography className={classes.headerText}>
//             {headerMessages[currentHeaderIndex].text}
//           </Typography>
//           <div className={classes.divider}></div>
//         </Box>
//       </Box>

//       {/* Posts Section */}
//       <Grid container spacing={2}>
//         <Grid item xs={12}>
//           <Box className={classes.postContainer}>
//             <Box className={classes.postHeader}>
//               <div className={classes.postHeaderTitle}>
//                 <img
//                   src={ChatVoiceLine}
//                   alt="KarePost"
//                   style={{ width: "26px", height: "26px" }}
//                 />
//                 <Box>
//                   <Typography
//                     style={{
//                       fontFamily: "Poppins",
//                       fontSize: "24px",
//                       fontWeight: "600",
//                       marginLeft: "10px",
//                     }}
//                   >
//                     KarePost
//                   </Typography>
//                 </Box>
//               </div>
//               <div>
//                 <IconButton
//                   theme="primary"
//                   icon={<FaPlusCircle size={21} color="#FFFFFF" />}
//                   onClick={() => {
//                     history.push("/wiki/question/ask");
//                   }}
//                   className={classes.addPostButton}
//                   style={{ display: "flex", alignItems: "center" }}
//                 >
//                   Add Post
//                 </IconButton>
//               </div>
//             </Box>

//             <Box
//               ref={scrollContainerRef}
//               className={classes.postsContainer}
//               onScroll={onScrollHandler}
//               style={{
//                 width: "100%",
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "space-between",
//               }}
//             >
//               {questions.length > 0 ? (
//                 renderPostsWithAds()
//               ) : (
//                 !isLoading && (
//                   <Box textAlign="center" mt={4}>
//                     <Typography>No posts available</Typography>
//                   </Box>
//                 )
//               )}
              
//               {isLoading && (
//                 <Box display="flex" justifyContent="center" mt={2}>
//                   <Spinner />
//                 </Box>
//               )}
//             </Box>
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// Home.propTypes = {};

// export default Home;

// const Post = ({ question }) => {
//   const classes = styles();
//   const history = useHistory(); // Add this hook
  
//   // Helper function to format date
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffTime = Math.abs(now - date);
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
//     if (diffDays === 1) return "1 day ago";
//     if (diffDays < 30) return `${diffDays} days ago`;
//     if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
//     return `${Math.floor(diffDays / 365)} years ago`;
//   };

//   // Function to handle post click navigation
//   const handlePostClick = () => {
//     if (question._id && question.title) {
//       // Create URL-friendly title (similar to how WikiRightSidebar might handle it)
//       const urlTitle = question.title
//         .toLowerCase()
//         .replace(/[^a-z0-9\s]/g, '') // Remove special characters
//         .replace(/\s+/g, '-') // Replace spaces with hyphens
//         .substring(0, 50); // Limit length
      
//       // Navigate to the post detail page
//       history.push(`/wiki/question/${question._id}/${urlTitle}/show`);
//     }
//   };
  
//   return (
//     <Box 
//       className={classes.postBox}
//       onClick={handlePostClick}
//       style={{
//         cursor: 'pointer',
//         transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
//         '&:hover': {
//           transform: 'translateY(-2px)',
//           boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
//         }
//       }}
//       onMouseEnter={(e) => {
//         e.currentTarget.style.transform = 'translateY(-2px)';
//         e.currentTarget.style.boxShadow = '0px 4px 12px rgba(0, 0, 0, 0.15)';
//       }}
//       onMouseLeave={(e) => {
//         e.currentTarget.style.transform = 'translateY(0)';
//         e.currentTarget.style.boxShadow = 'none';
//       }}
//     >
//       <Box
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           flexWrap: "wrap",
//           gap: "10px",
//         }}
//       >
//         <Box style={{ display: "flex", alignItems: "center" }}>
//           <img
//             src={question.user?.avatar || Advertisement}
//             alt="User Avatar"
//             className={classes.postUserAvatar}
//           />
//           <Box>
//             <Typography className={classes.postUserName}>
//               {question.user?.username || question.user?.firstName || "Anonymous"}
//             </Typography>
//           </Box>
//         </Box>
//         <Box style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
//           <Typography className={classes.postMetaText}>
//             {formatDate(question.date || question.createdAt)}
//           </Typography>
//           <Typography className={classes.postMetaText} style={{ margin: "0px 10px" }}>
//             |
//           </Typography>
//           <Typography className={classes.postMetaText}>
//             Response: {question.answers?.length || question.answersCount || 0}
//           </Typography>
//         </Box>
//       </Box>
//       <Box
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           marginTop: "12px",
//           flexWrap: "wrap",
//           gap: "15px",
//         }}
//       >
//         <Box style={{ flex: 1, minWidth: "200px" }}>
//           <Typography className={classes.postContentText}>
//             {question.title || question.content || "No content available"}
//           </Typography>
//         </Box>

//         <Box 
//           style={{ display: "flex", alignItems: "center" }}
//           onClick={(e) => {
//             e.stopPropagation(); // Prevent post click when clicking on like/dislike
//           }}
//         >
//           <Box
//             style={{
//               display: "flex",
//               alignItems: "center",
//               marginRight: "20px",
//             }}
//           >
//             <FiThumbsUp
//               size={20}
//               color="#56B954"
//               style={{ marginRight: "10px" }}
//             />
//             <Typography className={classes.postMetaText} style={{ color: "#56B954" }}>
//               {question.likes || question.upvotes || 0}
//             </Typography>
//           </Box>
//           <Box
//             style={{
//               display: "flex",
//               alignItems: "center",
//             }}
//           >
//             <FiThumbsDown
//               size={20}
//               color="#FF3C3C"
//               style={{ marginRight: "10px" }}
//             />
//             <Typography className={classes.postMetaText} style={{ color: "#FF3C3C" }}>
//               {question.dislikes || question.downvotes || 0}
//             </Typography>
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// const Ads = ({ adIndex = 0, isTransitioning = false }) => {
//   const classes = styles();
  
//   const adData = [
//     {
//       companyName: "HealthCare Plus",
//       companyImage: Advertisement,
//       timeAgo: "Sponsored",
//       responses: "Ad",
//       content: "Join our medical community and connect with certified healthcare professionals worldwide.",
//       image: Advertisement,
//       hasText: true,
//     },
//     {
//       companyName: "MedTech Solutions",
//       companyImage: Advertisement01,
//       timeAgo: "Sponsored",
//       responses: "Ad",
//       content: "Discover cutting-edge medical technology and innovative healthcare solutions.",
//       image: Advertisement01,
//       hasText: true,
//     },
//     {
//       companyName: "Wellness Pro",
//       companyImage: Advertisement02,
//       timeAgo: "Sponsored",
//       responses: "Ad",
//       content: "Transform your health journey with our comprehensive wellness programs.",
//       image: Advertisement02,
//       hasText: true,
//     },
//   ];

//   const selectedAd = adData[adIndex % adData.length];
  
//   return (
//     <Box 
//       className={classes.advertisementContainer}
//       style={{
//         opacity: isTransitioning ? 0.3 : 1,
//         transform: isTransitioning ? "translateY(-10px)" : "translateY(0)",
//       }}
//     >
//       <Box className={classes.sponsoredLabel}>
//         {selectedAd.timeAgo}
//       </Box>
      
//       <Box
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           flexWrap: "wrap",
//           gap: "10px",
//         }}
//       >
//         <Box style={{ display: "flex", alignItems: "center" }}>
//           <img
//             src={selectedAd.companyImage}
//             alt="Company Avatar"
//             className={classes.adCompanyAvatar}
//           />
//           <Box>
//             <Typography className={classes.adCompanyName}>
//               {selectedAd.companyName}
//             </Typography>
//           </Box>
//         </Box>
//         <Box style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
//           <Typography className={classes.adMetaText}>
//             {selectedAd.timeAgo}
//           </Typography>
//           <Typography className={classes.adMetaText} style={{ margin: "0px 10px" }}>
//             |
//           </Typography>
//           <Typography className={classes.adMetaText}>
//             {selectedAd.responses}
//           </Typography>
//         </Box>
//       </Box>

//       {/* Ad Content - Text (if has text) */}
//       {selectedAd.hasText && (
//         <Box
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             marginTop: "12px",
//             flexWrap: "wrap",
//             gap: "15px",
//           }}
//         >
//           <Box style={{ flex: 1, minWidth: "200px" }}>
//             <Typography className={classes.adContentText}>
//               {selectedAd.content}
//             </Typography>
//           </Box>
//         </Box>
//       )}

//       {/* Ad Image */}
//       <div className={classes.ImageContainer}>
//         <img
//           src={selectedAd.image}
//           alt="Advertisement"
//           className={classes.adImage}
//         />
//       </div>

//       {/* If no text content, show likes/dislikes below image */}
//       {!selectedAd.hasText && (
//         <Box
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "flex-end",
//             marginTop: "12px",
//           }}
//         >
//           <Box
//             style={{
//               display: "flex",
//               alignItems: "center",
//               marginRight: "20px",
//             }}
//           >
//             <FiThumbsUp
//               size={20}
//               color="#56B954"
//               style={{ marginRight: "10px" }}
//             />
//             <Typography className={classes.adMetaText} style={{ color: "#56B954" }}>
//               {Math.floor(Math.random() * 50)}
//             </Typography>
//           </Box>
//           <Box
//             style={{
//               display: "flex",
//               alignItems: "center",
//             }}
//           >
//             <FiThumbsDown
//               size={20}
//               color="#FF3C3C"
//               style={{ marginRight: "10px" }}
//             />
//             <Typography className={classes.adMetaText} style={{ color: "#FF3C3C" }}>
//               {Math.floor(Math.random() * 5)}
//             </Typography>
//           </Box>
//         </Box>
//       )}
//     </Box>
//   );
// };