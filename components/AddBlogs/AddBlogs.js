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
import { useRouter } from "next/router";

// const ReactQuill = dynamic(import("react-quill"), { ssr: false });

const AddBlogs = ({ isEditing }) => {
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
      marginTop: theme.spacing(8),
    },
    quillDiv: {
      height: "100%",
      maxWidth: "100vw",
      marginTop: theme.spacing(10),
    },
    quillEditor: {
      height: "100%",
      maxWidth: "80%",
      margin: "auto",
      // padding: theme.spacing(10, 0),
    },
    editorWithSpace: {
      margin: "200px",
    },
  }));
  const { classes } = useStyles();
  const [imgUrl, setImgUrl] = useState("");
  const [tags, setTags] = useState("");
  const [title, setTitle] = useState("");
  const [alt, setAlt] = useState("");
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

  const router = useRouter();
  const { blogId } = router.query; // Assuming the URL parameter name is 'blogId'

  useEffect(() => {
    if (blogId) {
      // Use 'blogId' instead of 'isEditing'
      fetch(`/api/blogs/${blogId}`)
        .then((res) => res.json())
        .then((data) => {
          // Assuming your API returns the blog directly
          setDescription(data.description);
          setImgUrl(data.imgUrl);
          setTitle(data.title);
        })
        .catch((error) => {
          console.error("Error fetching blog data:", error);
          toast.error("Sorry, some error occurred");
        });
    }
  }, [blogId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title || !imgUrl || !description || !alt) {
      toast.error("Please fill out all required fields.");
      return;
    }

    const method = isEditing ? "PATCH" : "POST";
    const url = isEditing ? `/api/blogs/${blogId}` : "/api/blogs";

    toast
      .promise(
        fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, imgUrl, description, alt }),
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error(res.statusText);
            }
            return res.json();
          })
          .then((data) => {
            setDescription("");
            setImgUrl("");
            setTitle("");
            setAlt("");
            // Redirect to the new or updated post
            // Assuming 'data' contains the post ID or slug, adjust as needed
            router.push(`/blogs-media/${data.id}`); // Replace with your post URL structure
          }),
        {
          loading: "Posting...",
          success: `Your post has been ${isEditing ? "updated" : "published"}`,
          error: "Sorry, some error occurred",
        }
      )
      .catch((error) => {
        console.error("Problem with fetch operation:", error);
      });
  };

  return (
    <div>
      <Container maxWidth="lg" className={classes.container}>
        <EditorForm
          imgUrl={imgUrl}
          setImgUrl={setImgUrl}
          title={title}
          setTitle={setTitle}
          tags={tags}
          setTags={setTags}
          alt={alt}
          setAlt={setAlt}
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
          {isEditing ? "Update your post" : "Publish your post"}
        </Button>
      </Container>
    </div>
  );
};

export default AddBlogs;
