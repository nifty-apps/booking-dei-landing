import React, { useEffect, useState } from "react";
import Blog from "./Blog";
import { makeStyles } from "tss-react/mui";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";

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
  const blogsPerPage = 6; // Adjust as needed

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

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleDeleteBlog = (deletedBlogId) => {
    // Filter out the deleted blog from the current blogs state
    const updatedBlogs = blogs.filter((blog) => blog.id !== deletedBlogId);
    setBlogs(updatedBlogs);
  };

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < Math.ceil(totalBlogs / blogsPerPage);
  return (
    <>
      {isLoading ? (
        <img
          style={{
            opacity: 0.5,
            position: "fixed",
            top: "calc(50% - 50px)",
            left: "calc(50% - 50px)",
            padding: "80px",
          }}
          src="/images/loading.gif"
          alt="loading"
        />
      ) : (
        <div className={classes.mainWrap}>
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
            {Array.isArray(blogs) && blogs.length > 0 ? (
              blogs.map((blog) => (
                <div key={blog.id}>
                  <Blog blog={blog} onDeleteBlog={handleDeleteBlog} />
                </div>
              ))
            ) : (
              <p>No blogs available.</p>
            )}
          </Box>
          <ButtonGroup
            className={classes.paginationContainer}
            variant="text"
            color="primary"
            aria-label="text primary button group"
          >
            <Button
              disabled={!canGoPrevious}
              onClick={() => canGoPrevious && handlePageChange(currentPage - 1)}
            >
              {"<"}
            </Button>
            {Number.isFinite(Math.ceil(totalBlogs / blogsPerPage)) &&
              [...Array(Math.ceil(totalBlogs / blogsPerPage)).keys()].map(
                (page) => (
                  <Button
                    key={page + 1}
                    className={
                      page + 1 === currentPage ? classes.activePage : ""
                    }
                    onClick={() => handlePageChange(page + 1)}
                  >
                    {page + 1}
                  </Button>
                )
              )}
            <Button
              disabled={!canGoNext}
              onClick={() => canGoNext && handlePageChange(currentPage + 1)}
            >
              {">"}
            </Button>
          </ButtonGroup>
        </div>
      )}
    </>
  );
};

export default Blogs;
