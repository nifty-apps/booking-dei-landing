import React, { useEffect, useState } from "react";
import Blog from "./Blog";
import { makeStyles } from "tss-react/mui";
import BlogBanner from "./BlogBanner";

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
      color: theme.palette.primary.main,
    },
  }));
  const { classes } = useStyles();
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6; // Adjust as needed
  const totalBlogs = blogs.length;
  useEffect(() => {
    fetch(
      `http://localhost:3008/api/blog?_page=${currentPage}&_limit=${blogsPerPage}`
    )
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        console.log(data);
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
        {blogs?.map((blog) => {
          return (
            <div key={blog.id}>
              <Blog blog={blog} />
            </div>
          );
        })}
      </div>
      <div className={classes.paginationContainer}>
        <span
          className={`${classes.paginationButton} ${
            canGoPrevious ? "" : "disabled"
          }`}
          onClick={() => canGoPrevious && handlePageChange(currentPage - 1)}
        >
          {"<"}
        </span>
        {[...Array(Math.ceil(totalBlogs / blogsPerPage)).keys()].map((page) => (
          <span
            key={page + 1}
            className={`${classes.paginationButton} ${
              page + 1 === currentPage ? "active" : ""
            }`}
            onClick={() => handlePageChange(page + 1)}
          >
            {page + 1}
          </span>
        ))}
        <span
          className={`${classes.paginationButton} ${
            canGoNext ? "" : "disabled"
          }`}
          onClick={() => canGoNext && handlePageChange(currentPage + 1)}
        >
          {">"}
        </span>
      </div>
    </>
  );
};

export default Blogs;
