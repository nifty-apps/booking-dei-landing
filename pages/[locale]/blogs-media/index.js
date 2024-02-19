import React, { Fragment } from "react";
import Blogs from "../../../components/Blogs";
import BlogBanner from "../../../components/Blogs/BlogBanner";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import Head from "next/head";
import brand from "~/public/text/brand";
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
  paddingColored: {
    [theme.breakpoints.down("md")]: {
      paddingLeft: "30px",
      paddingRight: "30px",
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
      background:
        theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.38)" : "#dae9f5",
    },
    paddingTop: theme.spacing(20),
  },
}));
const blogsMedia = (props) => {
  const { classes } = useStyles();
  const { onToggleDark, onToggleDir } = props;

  return (
    <Fragment>
      <Head>
        <title>{brand.saas.name + " - Blogs"}</title>
      </Head>
      <CssBaseline />
      <div className={classes.mainWrap}>
        <Header
          onToggleDark={onToggleDark}
          onToggleDir={onToggleDir}
          // invert={true}
        />

        <section id="blogs" className={classes.containerWrap}>
          <BlogBanner />
        </section>
      </div>
      <div className={classes.paddingColored}>
        <Blogs />
      </div>

      <div className={classes.footer}>
        <Footer />
      </div>
    </Fragment>
  );
};
blogsMedia.propTypes = {
  onToggleDark: PropTypes.func.isRequired,
  onToggleDir: PropTypes.func.isRequired,
};

const getStaticProps = makeStaticProps(["common"]);
export { getStaticPaths, getStaticProps };

export default blogsMedia;
