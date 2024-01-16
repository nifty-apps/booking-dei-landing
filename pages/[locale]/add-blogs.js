import React, { Fragment } from "react";
import dynamic from "next/dynamic";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import PropTypes from "prop-types";
import { makeStyles } from "tss-react/mui";
import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "~/lib/getStatic";
import withAdmin from "../../components/WithAdmin/WithAdmin";

const AddBlogs = dynamic(() => import("~/components/AddBlogs"), { ssr: false });
const useStyles = makeStyles({ uniqId: "addBlogs" })((theme) => ({
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

const addBlogs = (props) => {
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
        <AddBlogs isEditing={false} />
      </div>
      <div className={classes.footer}>
        <Footer />
      </div>
    </div>
  );
};
addBlogs.propTypes = {
  onToggleDark: PropTypes.func.isRequired,
  onToggleDir: PropTypes.func.isRequired,
};
const getStaticProps = makeStaticProps(["common"]);
export { getStaticPaths, getStaticProps };
export default withAdmin(addBlogs);
