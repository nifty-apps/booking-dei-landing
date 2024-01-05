import React from "react";
import { makeStyles } from "tss-react/mui";
import Link from "next/link";
import DOMPurify from "dompurify";

const Blog = ({ blog }) => {
  const useStyles = makeStyles({ uniqId: "blog" })((theme) => ({
    mainBlogContainer: {
      height: "100%",
      width: "100%",
      background: "white",
      padding: theme.spacing(1, 4, 0),
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      borderRadius: "10px",
      boxSizing: "border-box",
    },
    blogContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    blogContainerHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      "& p": {
        color: "gray",
        textTransform: "uppercase",
        fontSize: "14px",
      },
    },
    imgDiv: {
      position: "relative",
      width: "100%",
      flex: "1",
      overflow: "hidden",
    },
    blogImg: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    title: {
      marginTop: theme.spacing(2),
    },
    descriptionContainer: {
      color: "gray",
      "& > *": {
        fontSize: "18px",
      },
    },
    button: {
      background: "#d3d3d3",
      fontWeight: "bold",
      fontSize: "18px",
      color: "black",
      borderRadius: "9999px",
      border: "none",
      padding: theme.spacing(1, 3),
      transition: "background-color 0.3s, color 0.3s, box-shadow 0.3s",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      marginBottom: theme.spacing(2),
      cursor: "pointer",
      "&:hover": {
        background: "gray",

        color: "white",
      },
    },
  }));

  const { classes } = useStyles();
  // Formatting Date
  const dateString = blog.createdAt;
  const dateObject = new Date(dateString);

  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = dateObject.toLocaleDateString("en-US", options);

  const getDescriptionPreview = (description, maxLength = 300) => {
    const trimmedDescription = description?.trim();
    if (trimmedDescription?.length > maxLength) {
      return `${trimmedDescription.substring(0, maxLength)}...`;
    }

    return trimmedDescription;
  };

  const descriptionPreview = getDescriptionPreview(blog.description);
  const sanitizedDescription = DOMPurify.sanitize(descriptionPreview);

  return (
    <div className={classes.mainBlogContainer}>
      <div className={classes.blogContainerHeader}>
        <p>{formattedDate}</p>
        <p>Author Name</p>
      </div>
      <div className={classes.blogContainer}>
        <div className={classes.imgDiv}>
          <img src={blog.imgUrl} alt={blog.title} className={classes.blogImg} />
        </div>
        <h1 className={classes.title}>{blog.title}</h1>
        <div className={classes.descriptionContainer}>
          <div
            dangerouslySetInnerHTML={{
              __html: sanitizedDescription,
            }}
            className={classes.descriptionContainer}
            style={{ fontSize: "18px" }}
          ></div>
        </div>
        <div>
          <Link href={`/blogs-media/${blog.id}`} as={`/blogs-media/${blog.id}`}>
            <button className={classes.button}>Read more</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Blog;
