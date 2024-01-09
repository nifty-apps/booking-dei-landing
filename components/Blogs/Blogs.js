import React, { useEffect, useState } from "react";
import Blog from "./Blog";
import { makeStyles } from "tss-react/mui";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

const Blogs = () => {
  const useStyles = makeStyles({ uniqId: "blogs" })((theme) => ({
    mainWrap: {
      position: "relative",
      width: "100%",
      overflow: "hidden",
      background: theme.palette.background.paper,
    },
    blogsContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      width: "100%",
      height: "100%",
      background: "white",
      padding: theme.spacing(10),
      gap: theme.spacing(10),
      [theme.breakpoints.down("md")]: {
        gridTemplateColumns: "1fr",
      },
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
    },
  }));
  const { classes } = useStyles();
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const blogsPerPage = 6; // Adjust as needed

  useEffect(() => {
    fetch(`/api/blogs?page=${currentPage}&limit=${blogsPerPage}`)
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data.blogs);
        setTotalBlogs(data.totalBlogs);
      });
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < Math.ceil(totalBlogs / blogsPerPage);
  return (
    <>
      <div className={classes.blogsContainer}>
        {Array.isArray(blogs) && blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog.id}>
              <Blog blog={blog} />
            </div>
          ))
        ) : (
          <p>No blogs available.</p>
        )}
      </div>
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
                className={page + 1 === currentPage ? classes.activePage : ""}
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
    </>
  );
};

export default Blogs;
