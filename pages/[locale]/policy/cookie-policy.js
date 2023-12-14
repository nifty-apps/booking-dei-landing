import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import PropTypes from "prop-types";
import React from "react";
import { makeStyles } from "tss-react/mui";
// Use this below for Server Side Render/Translation (SSR)
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// Use this below for Static Site Generation (SSG)
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import Notification from "~/components/Notification";
import { getStaticPaths, makeStaticProps } from "~/lib/getStatic";
import brand from "~/public/text/brand";

const useStyles = makeStyles({ uniqId: "cookie-policy" })((theme) => ({
  mainWrap: {
    position: "relative",
    width: "100%",
    overflow: "hidden",
    background: theme.palette.primary.dark,
  },
  spaceBottom: {
    marginBottom: theme.spacing(0),
  },
  spaceTop: {
    paddingTop: theme.spacing(20),
  },
  containerWrap: {
    marginTop: theme.spacing(10),
    padding: theme.spacing(4),
    "& > section": {
      position: "relative",
    },
  },
  heading: {
    padding: theme.spacing(0, 4, 0, 4),
    color: theme.palette.common.white,
    fontWeight: 700,
    marginBottom: theme.spacing(4),
    textDecoration: "underline",
  },
  descriptionContainer: {
    width: "60%",
    padding: theme.spacing(0, 0, 0, 0),
    color: theme.palette.common.white,
    fontWeight: 400,
    marginBottom: theme.spacing(4),
    margin: "0 auto",
  },
  descriptionHeading: {
    padding: theme.spacing(4, 0, 0, 0),
    fontWeight: 700,
  },
  descriptionText: {
    padding: theme.spacing(0, 0, 0, 0),
    color: theme.palette.common.white,
    fontWeight: 400,
    marginBottom: theme.spacing(4),
    margin: "0 auto",
  },
}));

function CookiePolicy(props) {
  const { classes, cx } = useStyles();
  const { onToggleDark, onToggleDir } = props;
  // eslint-disable-next-line no-unused-vars
  const { t } = useTranslation("common");

  return (
    <React.Fragment>
      <Head>
        <title>{brand.saas.name + " - Cookie Policy"}</title>
      </Head>
      <CssBaseline />
      <div className={classes.mainWrap}>
        <Header onToggleDark={onToggleDark} onToggleDir={onToggleDir} />
        <main className={classes.containerWrap}>
          <section className={cx(classes.spaceTop, classes.spaceBottom)}>
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              className={classes.heading}
            >
              Cookie Policy
            </Typography>
            <div className={classes.descriptionContainer}>
              <Typography
                variant="h6"
                align="justify"
                className={classes.descriptionText}
              >
                We use “cookies” to collect information and improve our
                Services. A cookie is a small data file that we transfer to your
                device. We may use “session ID cookies” to enable certain
                features of the Services, to better understand how you interact
                with the Services, and to monitor aggregate usage and web
                traffic routing on the Services. We may also use “persistent
                cookies” to save your registration ID and login password for
                future logins to the Services. You can instruct your browser, by
                changing its options, to stop accepting cookies or to prompt you
                before accepting a cookie from the websites you visit. However,
                if you do not accept cookies, you will not be able to log into
                your account.
              </Typography>
            </div>
          </section>
        </main>
        <section className={classes.spaceTop}>
          <Footer />
        </section>
        <Notification />
      </div>
    </React.Fragment>
  );
}

CookiePolicy.propTypes = {
  onToggleDark: PropTypes.func.isRequired,
  onToggleDir: PropTypes.func.isRequired,
};

// Use this below for Server Side Render/Translation (SSR)
// export const getStaticProps = async ({ locale }) => ({ props: { ...await serverSideTranslations(locale, ['common']) } });

// Use this below for Static Site Generation (SSG)
const getStaticProps = makeStaticProps(["common"]);
export { getStaticPaths, getStaticProps };

export default CookiePolicy;
