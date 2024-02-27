import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "tss-react/mui";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import { getStaticPaths, makeStaticProps } from "~/lib/getStatic";
import brand from "~/public/text/brand";
// import BlogContent from "../../../../components/ManageContent/BlogContent";

// import MetaForm from "../../../../components/Meta/MetaForm";
import DashboardMenu from "../../../../components/Dashboard/Dashboard";
import withAdmin from "../../../../components/WithAdmin/WithAdmin";
import AddBlogsHeader from "../../../../components/AddBlogs/BlogHeader";
import BlogContent from "../../../../components/Management/BlogManagement";

const useStyles = makeStyles({ uniqId: "BlogManagement" })((theme) => ({
  mainWrap: {
    position: "relative",
    width: "100%",
    overflow: "hidden",
    background: theme.palette.background.paper,
  },
  spaceBottom: {
    marginBottom: theme.spacing(20),
  },
  spaceTop: {
    paddingTop: theme.spacing(20),
  },
  containerWrap: {
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(0),
      padding: theme.spacing(0),
    },
    marginTop: theme.spacing(2),
    paddingLeft: 240,
    paddingBottom: 4,
    "& > section": {
      position: "relative",
    },
  },
  padding: {
    [theme.breakpoints.down("md")]: {
      paddingLeft: "30px",
      paddingRight: "30px",
      paddingTop: theme.spacing(6),
    },
    paddingTop: theme.spacing(20),
  },
  paddingColored: {
    paddingTop: theme.spacing(0),
  },
}));

function BlogManagement(props) {
  const { classes, cx } = useStyles();
  const { onToggleDark, onToggleDir } = props;
  const { t } = useTranslation("common");

  return (
    <React.Fragment>
      <Head>
        <title>{brand.saas.name + " - BlogManagement"}</title>
      </Head>
      <CssBaseline />
      <div className={classes.mainWrap}>
        <DashboardMenu />
        <main className={classes.containerWrap}>
          <section className={classes.paddingColored} id="blogs-cards">
            <AddBlogsHeader />
            {/* <MetaForm pageType={"blog"} /> */}
            <BlogContent />
          </section>
        </main>
      </div>
    </React.Fragment>
  );
}

BlogManagement.propTypes = {
  onToggleDark: PropTypes.func.isRequired,
  onToggleDir: PropTypes.func.isRequired,
};

// export default BlogManagement;

// Use this below for Server Side Render/Translation (SSR)
// export const getStaticProps = async ({ locale }) => ({ props: { ...await serverSideTranslations(locale, ['common']) } });

// Use this below for Static Site Generation (SSG)
const getStaticProps = makeStaticProps(["common"]);
export { getStaticPaths, getStaticProps };

export default withAdmin(BlogManagement);
