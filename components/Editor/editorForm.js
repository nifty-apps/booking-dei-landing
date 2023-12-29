import React, { useState } from "react";
import { FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import { makeStyles } from "tss-react/mui";

const EditorForm = (props) => {
  const { imgUrl, tags, title, setTitle, setTags, setImgUrl } = props;
  const useEditorFormStyles = makeStyles({ uniqId: "editor-form" })(
    (theme) => ({
      form: {
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(1),
        alignItems: "center",
        justifyContent: "center",
      },
      label: {
        width: "400px",
        padding: theme.spacing(1, 0, 0, 0),
        margin: theme.spacing(1, 0, 0, 0),
      },
      input: {
        width: "100%",
        padding: theme.spacing(1),
      },
    })
  );
  const { classes } = useEditorFormStyles();
  const tagOptions = [
    { value: "tag1", label: "Tag 1" },
    { value: "tag2", label: "Tag 2" },
    { value: "tag3", label: "Tag 3" },
  ];

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleImageChange = (e) => setImgUrl(e.target.value);
  const handleTagsChange = (e) => setTags(e.target.value);

  // Add more tag options here

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div>
        <Container maxWidth="lg">
          <FormControl component="form" onSubmit={handleSubmit}>
            <div className={classes.label}>
              <TextField
                label="Title"
                type="text"
                value={title}
                onChange={handleTitleChange}
                className={classes.input}
                required
              />
            </div>

            <div className={classes.label}>
              <TextField
                label="Image URL"
                type="text"
                value={imgUrl}
                onChange={handleImageChange}
                className={classes.input}
                required
              />
            </div>
            {/* <div className={classes.label}>
              <TextField
                label="Tags"
                select
                onChange={handleTagsChange}
                value={tags}
                className={classes.input}
              >
                {tagOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div> */}
          </FormControl>
        </Container>
      </div>
    </>
  );
};

export default EditorForm;
