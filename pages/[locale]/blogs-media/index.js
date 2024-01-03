import React, { Fragment } from "react";
import Blogs from "../../../components/Blogs";
import BlogBanner from "../../../components/Blogs/BlogBanner";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import { makeStyles } from "tss-react/mui";
import PropTypes from "prop-types";
import { getStaticPaths, makeStaticProps } from "~/lib/getStatic";

const useStyles = makeStyles({ uniqId: "editor" })((theme) => ({
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
  editorSection: {
    // background: theme.palette.primary.dark,
    position: "relative",
    background: "white",
  },
  footer: {
    background: theme.palette.primary.dark,
    position: "relative",
  },
  containerWrap: {
    marginTop: -40,
    "& > section": {
      position: "relative",
    },
  },
}));
const blogs = (props) => {
  const { classes } = useStyles();
  const { onToggleDark, onToggleDir } = props;
  console.log(props);
  return (
    <Fragment>
      <Head>{/* <title>{brand.saas.name + " - Blogs"}</title> */}</Head>
      <CssBaseline />
      <div className={classes.mainWrap}>
        <Header
          onToggleDark={onToggleDark}
          onToggleDir={onToggleDir}
          // invert={true}
        />

        <section id="home" className={classes.containerWrap}>
          <BlogBanner />
        </section>
      </div>

      <Blogs />
      <div className={classes.footer}>
        <Footer />
      </div>
    </Fragment>
  );
};
blogs.propTypes = {
  onToggleDark: PropTypes.func.isRequired,
  onToggleDir: PropTypes.func.isRequired,
};

const getStaticProps = makeStaticProps(["common"]);
export { getStaticPaths, getStaticProps };

export default blogs;
