import React, { useState } from "react";
import { FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Button";
import Typography from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { makeStyles } from "tss-react/mui";
import CssBaseline from "@mui/material/CssBaseline";
import AWS from "aws-sdk";
const SeoForm = (props) => {
  const {
    metaTitle,
    setMetaTitle,
    metaDescription,
    setMetaDescription,
    ogTitle,
    setOgTitle,
    slugUrl,
    setSlugUrl,
  } = props;
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
        padding: "10px",

        cursor: "pointer",
        marginTop: "10px",
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

  const handleMetaTitleChange = (e) => setMetaTitle(e.target.value);
  const handleMetaDescriptionChange = (e) => setMetaDescription(e.target.value);
  const handleOgTitleChange = (e) => setOgTitle(e.target.value);
  const handleSlugUrlChange = (e) => setSlugUrl(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div>
        <Container maxWidth="lg">
          <FormControl component="form" onSubmit={handleSubmit}>
            <div className={classes.labelHeader}>
              <label>Seo title:</label>
              <input
                label="meta-title"
                type="text"
                value={metaTitle}
                onChange={handleMetaTitleChange}
                className={classes.label}
                required
              />
            </div>

            <div className={classes.labelHeader} style={{ marginTop: "20px" }}>
              <label>Meta Description:</label>
              <textarea
                label="metaDescription"
                name="metaDescription"
                rows="5"
                cols="51"
                maxLength="160"
                onChange={handleMetaDescriptionChange}
                value={metaDescription}
                required
                placeholder="Write a brief description of your blog post"
              />
            </div>

            <div className={classes.labelHeader} style={{ marginTop: "20px" }}>
              <label>Slug Url:</label>
              <input
                label="slugUrl"
                type="text"
                value={slugUrl}
                onChange={handleSlugUrlChange}
                className={classes.label}
                required
              />
            </div>
          </FormControl>
        </Container>
      </div>
    </>
  );
};

export default SeoForm;
