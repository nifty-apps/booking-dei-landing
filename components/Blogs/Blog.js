import React from "react";
import { makeStyles } from "tss-react/mui";
import Link from "next/link";
import DOMPurify from "dompurify";
import Swal from "sweetalert2";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import useIsAdmin from "../../utils/adminCheck";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const useStyles = makeStyles({ uniqId: "blog" })((theme) => ({
  customCard: {
    "&:hover": {
      boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);",
    },
  },
  readMore: {
    width: "200px",
    height: "38px",
    background:
      "linear-gradient(0deg, #DCDCDC 0%, #DCDCDC 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.40) 0%, rgba(255, 255, 255, 0.40) 100%)",
    borderRadius: "8px",
    border: "1px #010101 solid",
    fontSize: "16px",
    color: "black",
    transitionDuration: "400ms",
    "&:hover": {
      background: "#458FCD",
      color: "white",
    },
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

const Blog = ({ blog, onDeleteBlog }) => {
  const { title, createdAt, description, author, imgUrl, alt, slugUrl } = blog;
  const { isAdmin, isLoading } = useIsAdmin();
  const { classes } = useStyles();
  // Formatting Date
  const dateObject = new Date(createdAt);

  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = dateObject.toLocaleDateString("en-US", options);

  const getDescriptionPreview = (description, maxLength = 150) => {
    const trimmedDescription = description?.trim();
    if (trimmedDescription?.length > maxLength) {
      return `${trimmedDescription.substring(0, maxLength)}...`;
    }

    return trimmedDescription;
  };

  const descriptionPreview = getDescriptionPreview(description);
  const titlePreview = getDescriptionPreview(title, 40);
  const sanitizedDescription = DOMPurify.sanitize(descriptionPreview);
  const sanitizedTitle = DOMPurify.sanitize(titlePreview);

  return (
    <Card
      sx={{
        p: "20px",
        maxWidth: "525px",
        cursor: "pointer",
        position: "relative",
        margin: "0px auto",
      }}
      className={classes.customCard}
    >
      <CardContent sx={{ mb: "25px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography
            sx={{ fontSize: 14, textTransform: "uppercase" }}
            color="text.secondary"
          >
            {formattedDate}
          </Typography>
          <Typography
            sx={{ fontSize: 14, textTransform: "uppercase" }}
            color="text.secondary"
          >
            {author}
          </Typography>
        </Box>
        <CardMedia
          component="img"
          sx={{
            maxWidth: "100%",
            height: { lg: "250px", md: "200px" },
            mb: "35px",
            overflow: "hidden",
          }}
          src={imgUrl}
          image={imgUrl}
          alt={alt}
          classes={classes.cardImage}
        />
        <Typography
          variant="h5"
          component="div"
          sx={{ textAlign: "center", fontSize: "24px", mb: "20px" }}
        >
          {title}
        </Typography>
        <Typography
          sx={{ mb: 1.5, textAlign: "center", fontSize: "16px" }}
          color="text.secondary"
          variant="body1"
          dangerouslySetInnerHTML={{
            __html: sanitizedDescription,
          }}
        ></Typography>
      </CardContent>
      <CardActions
        sx={{
          position: "absolute",
          bottom: "5px",
          justifyContent: "center",
          width: "92%",
        }}
      >
        <Link href={`/blogs-media/${slugUrl}`} as={`/blogs-media/${slugUrl}`}>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            classes={classes.readMore}
          >
            Read More
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default Blog;
