import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Button from "@mui/material/Button";
import EditorForm from "./editorForm";
import { makeStyles } from "tss-react/mui";

// Require Editor JS files.
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/js/plugins.pkgd.min.js";
import "froala-editor/js/third_party/embedly.min.js";
import "froala-editor/js/plugins/fullscreen.min.js";
import "froala-editor/js/plugins/image.min.js";

// Require Editor CSS files.
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/third_party/embedly.min.css";
import "froala-editor/css/plugins/fullscreen.min.css";
import "froala-editor/css/plugins/image.min.css";

import Froala from "react-froala-wysiwyg";
import { useTranslation } from "next-i18next";

import { useRouter } from "next/router";
import SeoForm from "./Seo-form";
import { Box, CircularProgress, Typography } from "@mui/material";

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
    maxWidth: "76%",
    marginLeft: "20px",
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

const AddBlogs = ({ isEditing }) => {
  const { t, i18n } = useTranslation("common");

  const { classes } = useStyles();
  const [imgUrl, setImgUrl] = useState("");
  const [tags, setTags] = useState("");
  const [title, setTitle] = useState("");
  const [alt, setAlt] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [slugUrl, setSlugUrl] = useState("");
  const [isUploadComplete, setIsUploadComplete] = useState(false);

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (slug) {
      fetch(`/api/blogs/${slug}`)
        .then((res) => res.json())
        .then((data) => {
          setDescription(data.description);
          setImgUrl(data.imgUrl);
          setTitle(data.title);
          setAlt(data.alt);
          setAuthor(data.author);
          setMetaDescription(data.metaDescription);
          setMetaTitle(data.metaTitle);
          setSlugUrl(data.slugUrl);
        })
        .catch((error) => {
          console.error("Error fetching blog data:", error);
          toast.error("Sorry, some error occurred");
        });
    }
  }, [slug]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsUploadComplete(true);
    if (
      !title ||
      !imgUrl ||
      !description ||
      !alt ||
      !author ||
      !metaTitle ||
      !metaDescription ||
      !slugUrl
    ) {
      toast.error("Please fill out all required fields.");
      setIsUploadComplete(false);
      return;
    }

    const method = isEditing ? "PATCH" : "POST";
    const url = isEditing ? `/api/blogs/${slug}` : "/api/blogs";

    setIsUploadComplete(true);
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
            slugUrl,
          }),
        })
          .then((res) => {
            if (!res.ok) {
              setIsUploadComplete(false);
              throw new Error(res.statusText);
            }
            setIsUploadComplete(false);
            return res.json();
          })
          .then((data) => {
            setDescription("");
            setImgUrl("");
            setTitle("");
            setAlt("");
            setAuthor("");
            setMetaDescription("");
            setMetaTitle("");
            setSlugUrl("");
            setIsUploadComplete(false);
            router.push(`/blogs-media/${data.slugUrl}`);
          }),
        {
          loading: "Posting...",
          success: `Your post has been ${isEditing ? "updated" : "published"}`,
          error: "Sorry, some error occurred",
        }
      )
      .catch((error) => {
        setIsUploadComplete(false);
        console.error("Problem with fetch operation:", error);
      });
    setIsUploadComplete(false);
  };

  const config = {
    attribution: false,
    placeholder: "Start typing...",
    toolbarButtons: {
      moreText: {
        buttons: [
          "bold",
          "italic",
          "underline",
          "strikeThrough",
          "subscript",
          "superscript",
          "fontFamily",
          "fontSize",
          "textColor",
          "backgroundColor",
          "inlineClass",
          "inlineStyle",
          "clearFormatting",
        ],
      },
      moreParagraph: {
        buttons: [
          "alignLeft",
          "alignCenter",
          "formatOLSimple",
          "alignRight",
          "alignJustify",
          "formatOL",
          "formatUL",
          "paragraphFormat",
          "paragraphStyle",
          "lineHeight",
          "outdent",
          "indent",
          "quote",
        ],
      },
      moreRich: {
        buttons: [
          "insertLink",
          "insertImage",
          "insertVideo",
          "insertTable",
          "emoticons",
          "fontAwesome",
          "specialCharacters",
          "embedly",
          "insertFile",
          "insertHR",
        ],
      },
      moreMisc: {
        buttons: [
          "undo",
          "redo",
          "fullscreen",
          "print",
          "getPDF",
          "spellChecker",
          "selectAll",
          "html",
          "help",
        ],
        align: "right",
        buttonsVisible: 2,
      },
    },
    pluginsEnabled: [
      "table",
      "spell",
      "quote",
      "save",
      "quickInsert",
      "paragraphFormat",
      "paragraphStyle",
      "help",
      "draggable",
      "align",
      "link",
      "lists",
      "file",
      "image",
      "emoticons",
      "url",
      "video",
      "embedly",
      "colors",
      "entities",
      "inlineClass",
      "inlineStyle",
      // 'codeBeautif '
      // 'spellChecker',
      "imageTUI",
    ],
    events: {
      "image.beforeUpload": async function (images) {
        const imageUrl = images[0];
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
          Key: imageUrl.name,
          Body: imageUrl,
        };
        try {
          const data = await s3.upload(params).promise();
          this.image.insert(data.Location, null, null, this.image.get());
        } catch (err) {
          console.error("File upload error:", err);
        }
        return false;
      },
      "image.uploaded": function (response) {
        return true;
      },
    },
  };
  const ref = useRef({ editor: null });
  const [isFroalaInitialized, setIsFroalaInitialized] = useState(false);

  const [editor, setEditor] = useState(null);

  const handleModelChange = (model) => {
    setDescription(model);
  };

  // useEffect(() => {
  //   ref.current.editor.data._init = null;
  //   setEditor(ref.current.editor);
  //   editor && setIsFroalaInitialized(true);
  //   console.log("test", <Froala />);
  // }, [ref.current]);

  useEffect(() => {
    if (ref.current?.editor?.data) {
      ref.current.editor.data._init = null;
      setEditor(ref.current.editor);
      if (editor) {
        setIsFroalaInitialized(true);
      }
    } else {
      console.error("Editor data is not initialized yet.");
    }
  }, [ref.current]);

  // Do after initialization
  useEffect(() => {
    if (isFroalaInitialized) {
      editor.html.set(description);
    }
  }, [isFroalaInitialized]);

  return (
    <div>
      <Box sx={{ maxWidth: "1080px", margin: "0px auto", paddingTop: "20px" }}>
        <Typography
          sx={{
            fontSize: "26px",
            color: "#458FCD",
            fontWeight: "500",
            paddingY: "10px",
            paddingX: "20px",
          }}
        >
          {isEditing ? "Edit Blog Details" : "Add Blog Details"}
        </Typography>
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
        <Box sx={{ marginBottom: "20px" }}>
          <Typography sx={{ padding: "20px", fontWeight: 500 }}>
            Description:
          </Typography>
          <Froala
            ref={ref}
            model={description}
            onModelChange={handleModelChange}
            tag="textarea"
            config={config}
          />
        </Box>
        <Box>
          <h5>SEO Setting</h5>
          <SeoForm
            metaTitle={metaTitle}
            setMetaTitle={setMetaTitle}
            metaDescription={metaDescription}
            setMetaDescription={setMetaDescription}
            slugUrl={slugUrl}
            setSlugUrl={setSlugUrl}
          />
        </Box>

        <Button
          variant="contained"
          size="large"
          type="submit"
          onClick={handleSubmit}
          disabled={isUploadComplete}
          sx={{
            width: "30%",
            background: "#2c89d8",
            margin: "20px 0 0 20px",
            "&:hover": { background: "#004c8c" },
            color: "#fefefe",
          }}
        >
          {isEditing ? "Update your post" : "Publish your post"}
          {isUploadComplete && (
            <CircularProgress size={18} sx={{ marginLeft: "5px" }} />
          )}
        </Button>
      </Box>
    </div>
  );
};

export default AddBlogs;
