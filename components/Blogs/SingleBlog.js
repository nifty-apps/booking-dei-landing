import React from "react";
import { makeStyles } from "tss-react/mui";
import Link from "next/link";

const SingleBlog = ({ blog }) => {
  const useStyles = makeStyles({ uniqId: "blog" })((theme) => ({
    blogPostContainer: {
      height: "100%",
      width: "100%",
      background: "white",
      padding: theme.spacing(1, 4, 0),
      borderRadius: "10px",
      boxSizing: "border-box",
    },
    blogContent: {
      minHeight: "400px",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      zIndex: "1",
    },
    blogDetails: {
      position: "absolute",
      height: "55%",
      width: "70%",
      margin: "auto",
      overflow: "visible",
      bottom: "-25%",
      backgroundColor: "white",
      zIndex: "10",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 4px 8px rgba(0, 0, 1, 0.1)",
      left: 0,
      right: 0,
    },
    blogImageContainer: {
      position: "relative",
      width: "100%",
    },

    blogImage: {
      width: "100%",
      height: "400px",
      objectFit: "cover",
    },

    blogDetailsContent: {
      textAlign: "center",
      "& p:first-child, & p:last-child": {
        color: "#333",
        textTransform: "uppercase",
        fontSize: "14px",
        padding: theme.spacing(2, 0, 2, 0),
        lineHeight: "0",
      },
      "& p:nth-child(2)": {
        color: "black",
        fontSize: "30px",
        fontWeight: "bold",
        lineHeight: "36px",
        padding: theme.spacing(0, 4),
      },
    },
    blogDescriptionContainer: {
      maxWidth: "95vw",
    },
    blogDescription: {
      boxSizing: "border-box",
      color: "black",
      width: "80%",
      fontSize: "18px",
      padding: 0,
      marginTop: theme.spacing(20),
      marginLeft: "auto",
      marginRight: "auto",
      zIndex: 1,
      wordWrap: "break-word",
      overflowWrap: "break-word",
      "& img": {
        maxWidth: "100%",
      },
      // Ensure no other style is causing overflow, such as:
      // overflow: "hidden", // or "auto" if you want to allow scrolling
    },
  }));

  const { classes } = useStyles();
  // Formatting Date
  const dateString = blog.createdAt;
  const dateObject = new Date(dateString);

  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = dateObject.toLocaleDateString("en-US", options);

  const { description } = blog;

  return (
    <div className={classes.blogPostContainer}>
      <div className={classes.blogContent}>
        <div className={classes.blogImageContainer}>
          <img
            src={blog.imgUrl}
            alt={blog.title}
            className={classes.blogImage}
          />
          <div className={classes.blogDetails}>
            <div className={classes.blogDetailsContent}>
              <p>{formattedDate}</p>
              <p>{blog.title}</p>
              <p>Author's Name</p>
            </div>
          </div>
        </div>
        <div className={classes.blogDescriptionContainer}>
          <div
            dangerouslySetInnerHTML={{ __html: description }}
            className={classes.blogDescription}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
