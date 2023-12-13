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

const useStyles = makeStyles({ uniqId: "privacy-policy" })((theme) => ({
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
    padding: theme.spacing(0, 4, 0, 8),
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

function PrivacyPolicy(props) {
  const { classes, cx } = useStyles();
  const { onToggleDark, onToggleDir } = props;
  // eslint-disable-next-line no-unused-vars
  const { t } = useTranslation("common");

  return (
    <React.Fragment>
      <Head>
        <title>{brand.saas.name + " - Privacy Policy"}</title>
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
              Privacy Policy
            </Typography>
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              className={classes.heading}
            >
              We may collect and store the following Information when you are
              using the Services:
            </Typography>
            <div className={classes.descriptionContainer}>
              <Typography
                variant="h5"
                align="left"
                className={classes.descriptionHeading}
              >
                Information You Provide
              </Typography>
              <Typography
                variant="h6"
                align="justify"
                className={classes.descriptionText}
              >
                When you register for, or access, a Booking Dei account, or
                otherwise access the Services, we may collect some personal
                information that can be used to contact or identify you
                (“Personal Information”), such as your name, phone number, email
                address, and home and business postal addresses. Personal
                Information may also include records of purchases and
                reservations you have made and contacts with Cloudbeds. We do
                not store any credit card or other payment information from you.
              </Typography>
              <Typography
                variant="h5"
                align="left"
                className={classes.descriptionHeading}
              >
                Files
              </Typography>
              <Typography
                variant="h6"
                align="justify"
                className={classes.descriptionText}
              >
                We collect and store the files you upload, download, or access
                with the Services (“Files”). If you add a File to a Booking Dei
                account that has been previously uploaded by you or another
                user, we may associate all or a portion of the previous File
                with your account rather than storing a duplicate.
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

PrivacyPolicy.propTypes = {
  onToggleDark: PropTypes.func.isRequired,
  onToggleDir: PropTypes.func.isRequired,
};

// Use this below for Server Side Render/Translation (SSR)
// export const getStaticProps = async ({ locale }) => ({ props: { ...await serverSideTranslations(locale, ['common']) } });

// Use this below for Static Site Generation (SSG)
const getStaticProps = makeStaticProps(["common"]);
export { getStaticPaths, getStaticProps };

export default PrivacyPolicy;
