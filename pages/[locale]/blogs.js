import React, { Fragment } from "react";
import Blogs from "../../components/Blogs";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import Head from "next/head";
import { makeStyles } from "tss-react/mui";
import PropTypes from "prop-types";

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
const blogs = (props) => {
  const { classes } = useStyles();
  const { onToggleDark, onToggleDir } = props;
  return (
    <Fragment>
      <Head>{/* <title>{brand.saas.name + " - " + errorCode}</title> */}</Head>
      <div className={classes.header}>
        <Header onToggleDark={onToggleDark} onToggleDir={onToggleDir} />
        <Blogs />
        <div className={classes.footer}>
          <Footer />
        </div>
      </div>
    </Fragment>
  );
};
blogs.propTypes = {
  onToggleDark: PropTypes.func.isRequired,
  onToggleDir: PropTypes.func.isRequired,
};

export default blogs;
