import React from "react";
import { makeStyles } from "tss-react/mui";
import Link from "next/link";
import { Box, Typography } from "@mui/material";
import Head from "next/head";

const useStyles = makeStyles({ uniqId: "blog" })((theme) => ({
  blogPostContainer: {
    height: "100%",
    width: "100%",
    background: theme.palette.background.paper,
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
    backgroundColor: theme.palette.background.paper,
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
      textTransform: "uppercase",
      fontSize: "14px",
      padding: theme.spacing(2, 0, 2, 0),
      lineHeight: "0",
    },
    "& p:nth-child(2)": {
      fontSize: "30px",
      fontWeight: "bold",
      lineHeight: "36px",
      padding: theme.spacing(0, 4),
    },
  },
  blogDescriptionContainer: {
    maxWidth: "100%",
  },
  blogDescription: {
    boxSizing: "border-box",
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
const SingleBlog = ({ blog }) => {
  const {
    title,
    createdAt,
    description,
    author,
    imgUrl,
    alt,
    metaTitle,
    metaDescription,
  } = blog;
  const { classes } = useStyles();
  // Formatting Date

  const dateObject = new Date(createdAt);

  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = dateObject.toLocaleDateString("en-US", options);

  return (
    <>
      <Head>
        <title>{title}</title> <meta name="title" content={metaTitle} />
        <meta name="description" content={metaDescription} />
      </Head>
      <Box className={classes.blogPostContainer}>
        <Box className={classes.blogContent}>
          <Box className={classes.blogImageContainer}>
            <img src={imgUrl} alt={alt} className={classes.blogImage} />
            <Box className={classes.blogDetails}>
              <Box className={classes.blogDetailsContent}>
                <Typography
                  sx={{ fontSize: 14, textTransform: "uppercase" }}
                  color="text.secondary"
                >
                  {formattedDate}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: 20, md: 30 },
                    fontWeight: "700",
                    color: "text.secondary",
                    textAlign: "center",
                    m: "20px",
                  }}
                >
                  {title}
                </Typography>
                <Typography
                  sx={{ fontSize: 14, textTransform: "uppercase" }}
                  color="text.secondary"
                >
                  Author:{author}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className={classes.blogDescriptionContainer}>
            <Typography
              sx={{ fontSize: 14 }}
              dangerouslySetInnerHTML={{ __html: description }}
              className={classes.blogDescription}
            ></Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SingleBlog;
