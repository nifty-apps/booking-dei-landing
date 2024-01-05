import React, { Fragment } from "react";
import dynamic from "next/dynamic";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import PropTypes from "prop-types";
import { makeStyles } from "tss-react/mui";
import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "~/lib/getStatic";

const Editor = dynamic(() => import("~/components/Editor"), { ssr: false });
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  footer: {
    background: theme.palette.primary.dark,
    position: "relative",
  },
}));

const editor = (props) => {
  const { onToggleDark, onToggleDir } = props;
  const { t } = useTranslation("common");
  const { classes } = useStyles();
  return (
    <div>
      <div className={classes.header}>
        <Header
          onToggleDark={onToggleDark}
          onToggleDir={onToggleDir}
          // invert={true}
        />
      </div>
      <div className={classes.editorSection}>
        <Editor />
      </div>
      <div className={classes.footer}>
        <Footer />
      </div>
    </div>
  );
};
editor.propTypes = {
  onToggleDark: PropTypes.func.isRequired,
  onToggleDir: PropTypes.func.isRequired,
};
export async function getStaticProps(context) {
  const commonProps = await makeStaticProps(["common"])(context);
  // Update the URL to your production or environment-specific API
  const response = await fetch(
    `https://booking-dei-landing.vercel.app/api/blogs`
  );
  if (!response.ok) {
    // Handle errors here, perhaps throw a 404 or return an error page
    return { notFound: true };
  }

  const blogData = await response.json();
  const props = {
    ...commonProps.props,
    blog: blogData,
  };

  return { props, revalidate: 1 }; // revalidate every 1 second for ISR
}
export { getStaticPaths, getStaticProps };
export default editor;
