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
import SeoForm from "./Seo-form";

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
    seoForm: {
      background: "white",
      boxShadow: "0 1.5px 12px 2px rgba(0, 0, 0, 0.28)",
      padding: "20px",
      borderRadius: "10px",
      margin: theme.spacing(4, 0),
    },
  }));
  const { classes } = useStyles();
  const [imgUrl, setImgUrl] = useState("");
  const [tags, setTags] = useState("");
  const [title, setTitle] = useState("");
  const [alt, setAlt] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [ogTitle, setOgTitle] = useState("");
  const [slugUrl, setSlugUrl] = useState("");
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

  const handleProcedureContentChange = (content) => {
    setDescription(content);
  };

  const router = useRouter();
  const { blogId } = router.query;

  useEffect(() => {
    if (blogId) {
      fetch(`/api/blogs/${blogId}`)
        .then((res) => res.json())
        .then((data) => {
          setDescription(data.description);
          setImgUrl(data.imgUrl);
          setTitle(data.title);
          setAlt(data.alt);
          setAuthor(data.author);
        })
        .catch((error) => {
          console.error("Error fetching blog data:", error);
          toast.error("Sorry, some error occurred");
        });
    }
  }, [blogId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !title ||
      !imgUrl ||
      !description ||
      !alt ||
      !author ||
      !metaTitle ||
      !metaDescription ||
      !ogTitle ||
      !slugUrl
    ) {
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
          body: JSON.stringify({
            title,
            imgUrl,
            description,
            alt,
            author,
            metaTitle,
            metaDescription,
            ogTitle,
            slugUrl,
          }),
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
            setAuthor("");
            router.push(`/blogs-media/${data.id}`);
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
          author={author}
          setAuthor={setAuthor}
        />
        <div className={classes.seoForm}>
          <h5>SEO Setting</h5>
          <SeoForm
            metaTitle={metaTitle}
            setMetaTitle={setMetaTitle}
            metaDescription={metaDescription}
            setMetaDescription={setMetaDescription}
            ogTitle={ogTitle}
            setOgTitle={setOgTitle}
            slugUrl={slugUrl}
            setSlugUrl={setSlugUrl}
          />
        </div>
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
