import React from "react";
import { makeStyles } from "tss-react/mui";
import Link from "next/link";
import DOMPurify from "dompurify";
import Swal from "sweetalert2";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import useIsAdmin from "../../utils/adminCheck";

const Blog = ({ blog, onDeleteBlog }) => {
  const useStyles = makeStyles({ uniqId: "blog" })((theme) => ({
    blogContainerHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      "& p": {
        color: "gray",
        textTransform: "uppercase",
        fontSize: "14px",
      },
      [theme.breakpoints.down("sm")]: {
        "& p": {
          fontSize: "10px",
        },
      },
    },
    imgDiv: {
      position: "relative",
      width: "100%",
      // flex: "1",
      overflow: "hidden",
    },
    blogImg: {
      width: "100%",
      height: "300px",
      objectFit: "cover",
      [theme.breakpoints.down("lg")]: {
        height: "300px",
      },
      [theme.breakpoints.down("md")]: {
        height: "400px",
      },
      [theme.breakpoints.down("sm")]: {
        height: "400px",
      },
    },
    title: {
      width: "500px",
      wordWrap: "break-word",
      [theme.breakpoints.down("lg")]: {
        width: "400px",
      },
      [theme.breakpoints.down("md")]: {
        width: "400px",
      },
      [theme.breakpoints.down("sm")]: {
        width: "300px",
      },
      textAlign: "center",
      fontSize: "24px",
      marginTop: theme.spacing(2),
      color: theme.palette.mode === "dark" ? "#a5a5a5" : "#121212",
    },
    descriptionContainer: {
      width: "500px",
      [theme.breakpoints.down("lg")]: {
        width: "300px",
      },
      [theme.breakpoints.down("md")]: {
        width: "400px",
      },
      [theme.breakpoints.down("sm")]: {
        width: "300px",
      },
    },
    description: {
      width: "100%",
      pading: 0,
      overflowWrap: "break-word",
      "& > *": {
        fontSize: "18px",
        color: "gray",
      },
      "& p ": {
        color: "gray",
      },
      " & > div": {
        color: "gray",
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
      [theme.breakpoints.down("sm")]: {
        marginRight: theme.spacing(6),
      },

      cursor: "pointer",
      "&:hover": {
        background: "gray",

        color: "white",
      },
    },
    mainBlogContainer: {
      height: "100%",
      minHeight: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      background: theme.palette.mode === "dark" ? "#3d3d3d" : "white",
      padding: theme.spacing(1, 4, 0),
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      borderRadius: "10px",
      boxSizing: "border-box",
    },
    blogContainer: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      flexGrow: 1,
    },
    modifyButton: {
      position: "absolute",
      bottom: theme.spacing(2),
      right: theme.spacing(1),
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1,
    },
  }));
  const { isAdmin, isLoading } = useIsAdmin();
  const { classes } = useStyles();
  // Formatting Date
  const dateString = blog.createdAt;
  const dateObject = new Date(dateString);

  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = dateObject.toLocaleDateString("en-US", options);

  const getDescriptionPreview = (description, maxLength = 150) => {
    const trimmedDescription = description?.trim();
    if (trimmedDescription?.length > maxLength) {
      return `${trimmedDescription.substring(0, maxLength)}...`;
    }

    return trimmedDescription;
  };

  const descriptionPreview = getDescriptionPreview(blog.description);
  const titlePreview = getDescriptionPreview(blog.title, 40);
  const sanitizedDescription = DOMPurify.sanitize(descriptionPreview);
  const sanitizedTitle = DOMPurify.sanitize(titlePreview);

  const deleteBlog = (blogId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`/api/blogs/${blogId}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error deleting blog");
            }
            return response.json();
          })
          .then(() => {
            Swal.fire("Deleted!", "Your blog has been deleted.", "success");
            onDeleteBlog(blogId); // Call the callback function to update state
          })
          .catch((error) => {
            console.error("There was an error deleting the blog:", error);
            Swal.fire("Error!", "Failed to delete the blog", "error");
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your blog is safe :)", "info");
      }
    });
  };

  return (
    <div className={classes.mainBlogContainer}>
      <div className={classes.blogContainerHeader}>
        <p>{formattedDate}</p>
        <p>Author: Sumon</p>
      </div>
      <div className={classes.blogContainer}>
        <div className={classes.imgDiv}>
          <img src={blog.imgUrl} alt={blog.alt} className={classes.blogImg} />
        </div>
        <h1 className={classes.title}>{sanitizedTitle}</h1>
        <div className={classes.descriptionContainer}>
          <div
            dangerouslySetInnerHTML={{
              __html: sanitizedDescription,
            }}
            className={classes.description}
            // style={{
            //   fontSize: "18px",
            //   width: "400px",
            //   overflowWrap: "break-word",
            // }}
          ></div>
        </div>
        <div>
          <Link href={`/blogs-media/${blog.id}`} as={`/blogs-media/${blog.id}`}>
            <button className={classes.button}>Read more</button>
          </Link>
        </div>
        {isAdmin && !isLoading && (
          <div className={classes.modifyButton}>
            <Link
              href={`/edit-blog?blogId=${blog.id}`}
              as={`/edit-blog?blogId=${blog.id}`}
            >
              <BorderColorIcon
                style={{
                  color: "black",
                  marginRight: "10px",
                  fontSize: "28px",
                  cursor: "pointer",
                }}
              />
            </Link>
            <DeleteForeverIcon
              style={{
                color: "red",
                marginLeft: "10px",
                fontSize: "30px",
                cursor: "pointer",
              }}
              onClick={() => deleteBlog(blog.id)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
