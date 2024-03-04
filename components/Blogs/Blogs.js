import React, { useEffect, useState } from "react";
import Blog from "./Blog";
import { makeStyles } from "tss-react/mui";
import { Box, Pagination, Stack, Typography } from "@mui/material";

const Blogs = () => {
  const useStyles = makeStyles({ uniqId: "blogs" })((theme) => ({
    mainWrap: {
      position: "relative",
      maxWidth: "100vw",
      overflow: "hidden",
    },
    blogWrap: {
      width: "100%",
      padding: 0,
    },
    blogsContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      background: theme.palette.mode === "dark" ? "#303030" : "white",
      width: "100%",
      height: "100%",
      padding: theme.spacing(10),
      gap: theme.spacing(10),
      [theme.breakpoints.down("lg")]: {
        gap: theme.spacing(5),
      },
      [theme.breakpoints.down("md")]: {
        gridTemplateColumns: "repeat(2, 1fr)",
        padding: theme.spacing(2),
        gap: theme.spacing(2),
      },
      [theme.breakpoints.down("350px")]: {
        display: "none",
      },
    },
    blogContainer: {
      width: "100%",
      marginLeft: "auto",
      marginRight: "auto",
    },
    paginationContainer: {
      display: "flex",
      justifyContent: "center",
      marginTop: theme.spacing(3),
    },
    paginationButton: {
      cursor: "pointer",
      margin: theme.spacing(0, 1),
      fontWeight: "bold",
      textDecoration: "underline",
    },
    activePage: {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
      fontWeight: "bold",
      "&:hover": {
        backgroundColor: "gray",
      },
    },
  }));
  const { classes } = useStyles();
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const blogsPerPage = 6;
  const itemsPerPage = 10;

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/blogs?page=${currentPage}&limit=${blogsPerPage}`)
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data.blogs);
        setTotalBlogs(data.totalBlogs);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [currentPage, totalBlogs]);

  const handleDeleteBlog = (deletedBlogId) => {
    // Filter out the deleted blog from the current blogs state
    const updatedBlogs = blogs.filter((blog) => blog.id !== deletedBlogId);
    setBlogs(updatedBlogs);
  };

  const totalPages = Math.ceil(totalBlogs / itemsPerPage);

  // Function to change page
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };
  return (
    <>
      {isLoading ? (
        <img
          style={{
            opacity: 0.5,
            position: "fixed",
            top: "calc(50% )",
            left: "calc(50% )",
            padding: "80px",
          }}
          src="/images/loading.gif"
          alt="loading"
        />
      ) : (
        <div className={classes.mainWrap}>
          <Typography
            sx={{
              fontSize: "48px",
              fontWeight: "700",
              color: "#458FCD",
              textAlign: "center",
              mb: "25px",
            }}
            color="text.primary"
          >
            Our Blogs
          </Typography>

          <Box
            sx={{
              maxWidth: "1080px",
              m: "0px auto",
              display: "grid",
              gap: "30px",
              gridTemplateColumns: {
                xs: "repeat(1, minmax(0, 1fr))",
                md: "repeat(2, minmax(0, 1fr))",
              },
            }}
          >
            {blogs?.length > 0 ? (
              blogs?.map((blog) => (
                <div key={blog.id}>
                  <Blog blog={blog} />
                </div>
              ))
            ) : (
              <p>No blogs available.</p>
            )}
          </Box>

          <Box
            sx={{ marginY: "20px", display: "flex", justifyContent: "center" }}
          >
            <Stack spacing={2}>
              <Pagination
                count={totalPages} // Use totalPages here
                page={currentPage}
                onChange={handleChange}
              />
            </Stack>
          </Box>
        </div>
      )}
    </>
  );
};

export default Blogs;
