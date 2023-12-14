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

const useStyles = makeStyles({ uniqId: "data-security" })((theme) => ({
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

function DataSecurity(props) {
  const { classes, cx } = useStyles();
  const { onToggleDark, onToggleDir } = props;
  // eslint-disable-next-line no-unused-vars
  const { t } = useTranslation("common");

  return (
    <React.Fragment>
      <Head>
        <title>{brand.saas.name + " - Data Security"}</title>
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
              Data Security
            </Typography>
            <div className={classes.descriptionContainer}>
              <Typography
                variant="h5"
                align="left"
                className={classes.descriptionHeading}
              >
                Your data is safe with us:
              </Typography>
              <Typography
                variant="h6"
                align="justify"
                className={classes.descriptionText}
              >
                As a SaaS company that’s dedicated to supporting customers, we
                take your data and its security very seriously. It is super
                critical to us that your data remains safe, and we constantly
                monitor and work towards closing any threats that might put it
                at risk.
              </Typography>
              <Typography
                variant="h5"
                align="left"
                className={classes.descriptionHeading}
              >
                We partner with the best:
              </Typography>
              <Typography
                variant="h6"
                align="justify"
                className={classes.descriptionText}
              >
                We are partnering with Amazon AWS, which is one of the most
                respected names in the industry when it comes to data and
                payment security. We also keep abreast with industry best
                practices and ensure we are by changes and updates.
              </Typography>
              <Typography
                variant="h5"
                align="left"
                className={classes.descriptionHeading}
              >
                We are improving every day:
              </Typography>
              <Typography
                variant="h6"
                align="justify"
                className={classes.descriptionText}
              >
                We are always trying to improve our security systems and
                safeguard your data in Booking Dei even better. It is our
                responsibility to resolve any vulnerabilities in the system that
                threaten your information and privacy. Of course, we look
                forward to your input, critique, and feedback that can help us
                improve our setup and make Booking Dei better for all of us.
              </Typography>
              <Typography
                variant="h5"
                align="left"
                className={classes.descriptionHeading}
              >
                Reporting issues and threats:
              </Typography>
              <Typography
                variant="h6"
                align="justify"
                className={classes.descriptionText}
              >
                If you have found any issues or flaws impacting the data
                security or privacy of Booking Dei users, please write to
                <Box component="span" fontWeight="bold">
                  {" "}
                  support@bookingdei.com
                </Box>{" "}
                with the relevant information so we can get working on it right
                away.
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

DataSecurity.propTypes = {
  onToggleDark: PropTypes.func.isRequired,
  onToggleDir: PropTypes.func.isRequired,
};

// Use this below for Server Side Render/Translation (SSR)
// export const getStaticProps = async ({ locale }) => ({ props: { ...await serverSideTranslations(locale, ['common']) } });

// Use this below for Static Site Generation (SSG)
const getStaticProps = makeStaticProps(["common"]);
export { getStaticPaths, getStaticProps };

export default DataSecurity;
