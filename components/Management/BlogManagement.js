import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const BlogContent = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [slugUrl, setSlugUrl] = useState("");

  const itemsPerPage = 10;
  let blogsPerPage = 10;
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch blog data
        const blogResponse = await fetch(
          `/api/blogs?page=${currentPage}&limit=${blogsPerPage}`
        );
        if (blogResponse.ok) {
          const blogData = await blogResponse.json();
          setBlogs(blogData.blogs);
          setTotalBlogs(blogData.totalBlogs);
        } else {
          console.error(
            "Failed to fetch blog data:",
            blogResponse.status,
            blogResponse.statusText
          );
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPage, totalBlogs]);
  const totalPages = Math.ceil(totalBlogs / itemsPerPage);

  const handleDeleteBlog = async () => {
    try {
      const response = await fetch(`/api/blogs/${slugUrl}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        toast.success("The blog has been deleted");
        const restData = blogs.filter(
          (blogData) => blogData.slugUrl !== slugUrl
        );
        setBlogs(restData);
        setOpen(false);
      } else {
        toast.error("Something wrong, Try Again");
        setOpen(false);
      }
    } catch (error) {
      console.error("Error occurred while deleting blog", error);
      setOpen(false);
    }
  };
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };
  const handleBlogDeleteOpen = (blogSlug) => {
    setSlugUrl(blogSlug);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ maxWidth: "1080px", margin: "0px auto", paddingTop: "20px" }}>
      <Typography
        sx={{
          fontSize: "20px",
          fontWeight: "500",
          marginTop: "30px",
          marginBottom: "10px",
        }}
      >
        Recent Blogs
      </Typography>
      {loading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          {blogs?.length &&
            blogs?.map((blog) => (
              <>
                <Box
                  sx={{
                    border: "1px solid gray",
                    padding: "15px",
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography>{blog.title}</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <Link
                      href={`/dashboard/blogs/edit-blog?slug=${blog.slugUrl}`}
                      as={`/dashboard/blogs/edit-blog?slug=${blog.slugUrl}`}
                    >
                      <Button
                        sx={{
                          height: "30px",
                          background: " #7e7e7e",
                          "&:hover": { background: "#545454" },
                          color: "#fefefe",
                        }}
                      >
                        Edit
                      </Button>
                    </Link>

                    <Button
                      sx={{
                        height: "30px",
                        background: "#ff6060",
                        "&:hover": { background: "red" },
                        color: "#fefefe",
                      }}
                      onClick={() => handleBlogDeleteOpen(blog?.slugUrl)}
                    >
                      Delete
                    </Button>
                  </Box>
                </Box>
              </>
            ))}
        </Box>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to delete this blog?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>cancel</Button>
          <Button onClick={handleDeleteBlog} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ mt: "20px", display: "flex", justifyContent: "center" }}>
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handleChange}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default BlogContent;
