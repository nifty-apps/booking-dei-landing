import React, { Fragment, useEffect, useState } from "react";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import Head from "next/head";
import { makeStyles } from "tss-react/mui";
import PropTypes from "prop-types";
import SingleBlog from "~/components/Blogs/SingleBlog";
import { makeStaticProps } from "~/lib/getStatic";
import { useRouter } from "next/router";
import nextI18nextConfig from "../../../next-i18next.config";
import { Box } from "@mui/material";

const useStyles = makeStyles({ uniqId: "singleBlog" })((theme) => ({
  mainWrap: {
    position: "relative",
    width: "100%",
    overflow: "hidden",
    background: theme.palette.background.paper,
  },
  header: {
    background: theme.palette.primary.dark,
    position: "relative",
    height: "130px",
  },
  footer: {
    background: theme.palette.primary.dark,
    position: "relative",
  },
}));

const BlogPage = (props) => {
  const { classes } = useStyles();
  const { onToggleDark, onToggleDir } = props;

  const [blog, setBlog] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { slug } = router.query;

  // fetch single blog
  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    setIsLoading(true); // Start loading
    fetch(`/api/blogs/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setBlog(data);

        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Fetching blog failed", error);
        setIsLoading(false); // Stop loading on error
      });
  }, [slug]);

  if (isLoading) {
    return (
      <img
        style={{
          opacity: 0.5,
          position: "fixed",
          top: "calc(50% - 50px)",
          left: "calc(50% )",
        }}
        src="/images/loading.gif"
        alt="loading"
      />
    );
  }
  return (
    <Fragment>
      <div className={classes.mainWrap}>
        <div className={classes.header}>
          <Header onToggleDark={onToggleDark} onToggleDir={onToggleDir} />
        </div>
        <SingleBlog blog={blog} />

        <div className={classes.footer}>
          <Footer />
        </div>
      </div>
    </Fragment>
  );
};

BlogPage.propTypes = {
  onToggleDark: PropTypes.func.isRequired,
  onToggleDir: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
};

export async function getStaticProps(context) {
  const commonProps = await makeStaticProps(["common"])(context);
  const props = {
    ...commonProps.props,
  };

  return { props, revalidate: 1 };
}

export async function getStaticPaths() {
  const blogs = await fetch(`https://booking-dei-landing.vercel.app/api/blogs`);
  const blogsData = await blogs.json();
  const paths = blogsData?.blogs.map((blog) => ({
    params: { slug: blog.slugUrl.toString(), locale: "en" },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export default BlogPage;
