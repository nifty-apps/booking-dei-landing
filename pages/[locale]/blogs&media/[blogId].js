"use client";
import React, { Fragment, useEffect, useState } from "react";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import Head from "next/head";
import { makeStyles } from "tss-react/mui";
import PropTypes from "prop-types";
import { makeStaticProps } from "~/lib/getStatic";
import { useRouter } from "next/router";
import SingleBlog from "../../../components/Blogs/SingleBlog";

const useStyles = makeStyles({ uniqId: "editor" })((theme) => ({
  header: {
    background: theme.palette.primary.dark,
    position: "relative",
    height: "130px",
  },
  editorSection: {
    // background: theme.palette.primary.dark,
    position: "relative",
    background: "white",
  },
  footer: {
    background: theme.palette.primary.dark,
    position: "relative",
  },
}));

const blog = (props) => {
  const router = useRouter();
  const { blogId } = router.query;
  const [blog, setBlog] = useState({});
  useEffect(() => {
    fetch(`http://localhost:3008/api/blog/${blogId}`)
      .then((res) => res.json())
      .then((data) => {
        setBlog(data);
      });
  }, []);
  const { classes } = useStyles();
  const { onToggleDark, onToggleDir } = props;
  return (
    <Fragment>
      <Head>{/* <title>{brand.saas.name + " - " + errorCode}</title> */}</Head>
      <div className={classes.header}>
        <Header
          onToggleDark={onToggleDark}
          onToggleDir={onToggleDir}
          // invert={true}
        />
      </div>
      <SingleBlog blog={blog} />
      <div className={classes.footer}>
        <Footer />
      </div>
    </Fragment>
  );
};
blog.propTypes = {
  onToggleDark: PropTypes.func.isRequired,
  onToggleDir: PropTypes.func.isRequired,
};

const getStaticProps = makeStaticProps(["common"]);

// export async function getStaticPaths() {
//   const response = await fetch("http://localhost:3008/api/blog");
//   const data = await response.json();
//   const locales = ["en", "bn"];

//   const paths = locales.flatMap((locale) =>
//     data.blogs.map((blog) => ({
//       params: { locale: locale, blogId: blog.id.toString() },
//     }))
//   );

//   return { paths, fallback: true };
// }
export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};
export { getStaticProps };
export default blog;