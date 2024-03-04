import React, { useState } from "react";
import { FormControl, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { makeStyles } from "tss-react/mui";
import CssBaseline from "@mui/material/CssBaseline";
import AWS from "aws-sdk";
const EditorForm = (props) => {
  const { imgUrl, title, setTitle, setImgUrl, alt, setAlt, author, setAuthor } =
    props;
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadComplete, setIsUploadComplete] = useState(false);
  const useEditorFormStyles = makeStyles({ uniqId: "editor-form" })(
    (theme) => ({
      form: {
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(1),
        alignItems: "center",
        justifyContent: "center",
      },
      labelHeader: {
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(0),
        alignItems: "start",
        fontSize: "1rem",
        color: "black",
      },
      label: {
        width: "400px",
        height: "40px",
        borderRadius: "4px",
        margin: theme.spacing(0, 0, 0, 0),
        fontSize: "1.5rem",
      },

      uploadArea: {
        border: "1px dashed #ccc",
        width: "100%",
        padding: "0px",
        cursor: "pointer",
        marginTop: "0px",
        borderRadius: "5px",
        backgroundColor: "#fafafa", // Light grey background
      },

      uploadIcon: {
        marginRight: "10px",
      },
      input: {
        '&[type="file"]': {
          display: "none",
        },
      },
      placeholderText: {
        pointerEvents: "none",
        color: "#999",
      },
    })
  );
  const { classes } = useEditorFormStyles();

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleAltChange = (e) => setAlt(e.target.value);
  const handleAuthorChange = (e) => setAuthor(e.target.value);
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      const S3_BUCKET = "booking-dei-blog";
      const REGION = "us-east-1";
      AWS.config.update({
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
      });
      const s3 = new AWS.S3({
        params: { Bucket: S3_BUCKET },
        region: REGION,
      });
      const params = {
        Bucket: S3_BUCKET,
        Key: file.name,
        Body: file,
      };
      try {
        const data = await s3.upload(params).promise();

        if (data.Location) {
          setImgUrl(data.Location);
          setIsUploadComplete(true);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container maxWidth="lg">
      <FormControl component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item lg={6}>
            <TextField
              type="text"
              value={title}
              onChange={handleTitleChange}
              className={classes.label}
              required
              fullWidth
              variant="outlined"
              id="outlined-error"
              name="title"
              label="Blog Title"
              autoComplete="off"
              size="small"
              sx={{ marginBottom: "20px" }}
            />
          </Grid>
          <Grid item lg={6}>
            <TextField
              type="text"
              value={author}
              onChange={handleAuthorChange}
              className={classes.label}
              required
              fullWidth
              variant="outlined"
              id="outlined-error"
              name="author"
              label="Author's Name"
              autoComplete="off"
              size="small"
              sx={{ marginBottom: "20px" }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginY: "10px" }}>
          <Grid item lg={6}>
            <Paper
              variant="outlined"
              className={classes.uploadArea}
              onClick={() => document.getElementById("file-input").click()}
            >
              <Button
                variant="body1"
                style={{
                  color: isUploadComplete ? "green" : "gray",
                  width: "380px",
                  height: "40px",
                  margin: "0 auto",
                }}
                className={classes.placeholderText}
                startIcon={<CloudUploadIcon className={classes.uploadIcon} />}
              >
                {isUploading
                  ? "Uploading..."
                  : imgUrl
                    ? "Image uploaded!"
                    : "Select title image"}
              </Button>
              {/* <Button className={classes.uploadButton}>Upload Image</Button> */}
              <input
                accept="image/*"
                className={classes.input}
                id="file-input"
                type="file"
                onChange={handleImageUpload}
              />
            </Paper>
          </Grid>
          <Grid item lg={6}>
            <TextField
              type="text"
              value={alt}
              onChange={handleAltChange}
              className={classes.label}
              required
              fullWidth
              variant="outlined"
              id="outlined-error"
              name="alt"
              label="Alt Image Text"
              autoComplete="off"
              size="small"
              sx={{ marginBottom: "20px" }}
            />
          </Grid>
        </Grid>
      </FormControl>
    </Container>
  );
};

export default EditorForm;
