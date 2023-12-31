import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "react-quill/dist/quill.snow.css";
// import dynamic from "next/dynamic";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import EditorForm from "./editorForm";
import { makeStyles } from "tss-react/mui";
// import ImageResize from "quill-image-resize-module-react";
import ReactQuill from "react-quill";
import BlotFormatter from "quill-blot-formatter";
import { useTranslation } from "next-i18next";
import Quill from "quill";
import ImageResize from "quill-image-resize-module";

// const ReactQuill = dynamic(import("react-quill"), { ssr: false });

const Editor = () => {
  window.Quill = Quill;
  Quill.register("modules/imageResize", ImageResize);
  Quill.register("modules/blotFormatter", BlotFormatter);

  const { t, i18n } = useTranslation("common");
  const useStyles = makeStyles({ uniqId: "editor" })((theme) => ({
    container: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      alignItems: "center",
      justifyContent: "center",
      alignContent: "center",
      margin: theme.spacing(0, 0),
      padding: theme.spacing(2),
    },
    button: {
      marginTop: theme.spacing(2),
    },
    quillDiv: {
      height: "100%",
      width: "70%",
      margin: theme.spacing(4, 0),
    },
    quillEditor: {
      height: "100%",
      width: "100%",
    },
    editorWithSpace: {
      margin: "200px",
    },
  }));
  const { classes } = useStyles();
  const [imgUrl, setImgUrl] = useState("");
  const [tags, setTags] = useState("");
  const [title, setTitle] = useState("");
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ size: [false, "small", "large", "huge"] }],
      [{ font: [] }],
      [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ color: ["red", "#785412"] }],
      [{ background: ["red", "#785412"] }],
    ],
    imageResize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize", "toolbar"],
    },
    blotFormatter: {
      overlay: true,
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "color",
    "image",
    "background",
    "align",
    "size",
    "font",
  ];

  const [description, setDescription] = useState("");
  const handleProcedureContentChange = (content, delta, source, editor) => {
    setDescription(content);
    // let has_attribues = delta.ops[1].attributes || "";
    // console.log(has_attribues);
    // const cursorPosition = e.quill.getSelection().index;
    // this.quill.insertText(cursorPosition, "★");
    // this.quill.setSelection(cursorPosition + 1);
  };

  const handleSubmit = () => {
    event.preventDefault();
    if (!title || !imgUrl || !description) {
      // Using hot-toast to notify the user about the need to fill all fields
      toast.error("Please fill out all required fields.");
      return;
    }
    fetch("/api/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        imgUrl,
        description,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Sorry, some error occurred");
        }
        return res.json();
      })
      .then((data) => {
        toast.success("Your post has been published");
        setDescription("");
        setImgUrl("");
        setTitle("");
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
        // Notifying error with hot-toast
        toast.error("Sorry, some error occurred");
      });
  };
  return (
    <>
      <div>
        <Container maxWidth="lg" className={classes.container}>
          <EditorForm
            imgUrl={imgUrl}
            setImgUrl={setImgUrl}
            title={title}
            setTitle={setTitle}
            tags={tags}
            setTags={setTags}
          />
          <div className={classes.quillDiv}>
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              value={description}
              onChange={handleProcedureContentChange}
              className={`${classes.quillEditor} `}
            />
          </div>
          <Button
            variant="contained"
            color="secondary"
            size="medium"
            className={classes.button}
            onClick={handleSubmit}
          >
            Publish your post
          </Button>
        </Container>
      </div>
    </>
  );
};

export default Editor;
