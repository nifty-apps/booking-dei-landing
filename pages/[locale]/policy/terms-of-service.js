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

const useStyles = makeStyles({ uniqId: "terms-of-service" })((theme) => ({
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
    marginBottom: theme.spacing(0),
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
    marginBottom: theme.spacing(0),
    margin: "0 auto",
  },
}));

function TermsOfService(props) {
  const { classes, cx } = useStyles();
  const { onToggleDark, onToggleDir } = props;
  // eslint-disable-next-line no-unused-vars
  const { t } = useTranslation("common");

  return (
    <React.Fragment>
      <Head>
        <title>{brand.saas.name + " - Terms of Service"}</title>
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
              Terms of Service
            </Typography>
            <div className={classes.descriptionContainer}>
              <Typography
                variant="h5"
                align="left"
                className={classes.descriptionHeading}
              >
                Acceptance of the Terms of Use
              </Typography>
              <Typography
                variant="h6"
                align="justify"
                className={classes.descriptionText}
              >
                Booking Dei is a Web-based Property Management System designed
                especially for small to mid-size hotels/ businesses. You and
                Booking Dei (“Company,” “we,” or “us”) agree to the following
                terms and conditions (together with any documents they expressly
                incorporate by reference, collectively, “Terms of Use”). The
                Terms of Use govern your access to and use of
                https://bookingdei.com/ (the “Website”), including any content,
                functionality, and services offered on or through
                https://bookingdei.com/ (collectively, the “Services”), whether
                as a guest or a registered user. Please read the Terms of Use
                carefully before you start to use the Services. By using the
                Services, you accept and agree to these Terms of Use and our
                Privacy Policy, found at
                https://bookingdei.com//privacy-policy/, incorporated herein by
                reference. If you do not want to agree to these Terms of Use or
                the Privacy Policy, do not access or use the Services. By using
                the Services, you represent and warrant that you are of legal
                age(18 or older) to form a binding contract with the Company,
                meet all of the foregoing eligibility requirements, and, if you
                are acting on behalf of a company or entity, have been
                authorized to bind such entity to the Terms of Use. You must
                meet all of these requirements to access or use the Services.
              </Typography>
              <Typography
                variant="h5"
                align="left"
                className={classes.descriptionHeading}
              >
                Limitation of Liability:
              </Typography>
              <Typography
                variant="h6"
                align="justify"
                className={classes.descriptionText}
              >
                To the fullest extent permitted by applicable law, Booking Dei
                shall not be liable for any indirect, incidental, special,
                consequential, or punitive damages, or any loss of profits or
                revenues, whether incurred directly or indirectly, or any loss
                of data, use, goodwill, or other intangible losses, resulting
                from (a) your access to or use of or inability to access or use
                the software; (b) any conduct or content of any third party on
                the software; (c) any content obtained from the software; and
                (d) unauthorized access, use or alteration of your transmissions
                or content, whether based on warranty, contract, tort (including
                negligence) or any other legal theory, whether or not we have
                been informed of the possibility of such damage, and even if a
                remedy set forth herein is found to have failed of its essential
                purpose.
              </Typography>
              <Typography
                variant="h5"
                align="left"
                className={classes.descriptionHeading}
              >
                Specific Limitations:
              </Typography>
              <Typography
                variant="h6"
                align="justify"
                className={classes.descriptionText}
                // eslint-disable-next-line react/jsx-no-comment-textnodes
              >
                Service Level: Booking Dei does not guarantee that the software
                will be operational 100% of the time. Booking Dei will not be
                liable for any failure to provide the software due to unforeseen
                circumstances or causes beyond our reasonable control, including
                but not limited to acts of god, war, terrorism, riots,
                embargoes, acts of civil or military authorities, fire, floods,
                accidents, network infrastructure failures, strikes, or
                shortages of transportation facilities, fuel, energy, labor, or
                materials. Data Loss: Booking Dei is not responsible for the
                loss of any data or information entered into the software. Users
                are encouraged to maintain regular backups of their data.
                Third-Party Integrations: Any liability for any damage or loss
                caused by the use of third-party integrations within the
                software is expressly disclaimed. User Errors: Booking Dei is
                not liable for any errors or damages caused by the users
                misunderstanding or misuse of the software.
              </Typography>
              <Typography
                variant="h5"
                align="left"
                className={classes.descriptionHeading}
              >
                Liability Cap:
              </Typography>
              <Typography
                variant="h6"
                align="justify"
                className={classes.descriptionText}
                // eslint-disable-next-line react/jsx-no-comment-textnodes
              >
                In no event will the aggregate liability of Booking Dei, whether
                in contract, warranty, tort (including negligence, whether
                active, passive, or imputed), product liability, strict
                liability, or other theory, arising out of or relating to the
                use of or inability to use the software exceed any compensation
                you pay, if any, to Booking Dei for access to or use of the
                software during the three months immediately preceding the date
                of any claim.
              </Typography>
              <Typography
                variant="h5"
                align="left"
                className={classes.descriptionHeading}
              >
                Acknowledgment:
              </Typography>
              <Typography
                variant="h6"
                align="justify"
                className={classes.descriptionText}
                // eslint-disable-next-line react/jsx-no-comment-textnodes
              >
                You acknowledge that Booking Dei has set its prices and entered
                into this Agreement in reliance upon the limitations of
                liability set forth herein, that the same reflect an allocation
                of risk between the parties (including the risk that a contract
                remedy may fail of its essential purpose and cause consequential
                loss), and that the same form an essential basis of the bargain
                between the parties.
              </Typography>
              <Typography
                variant="h5"
                align="left"
                className={classes.descriptionHeading}
              >
                User Accounts
              </Typography>
              <Typography
                variant="h6"
                align="justify"
                className={classes.descriptionText}
                // eslint-disable-next-line react/jsx-no-comment-textnodes
              >
                Account Creation: Users must provide accurate and complete
                registration information (Name, Email, Password). After that,
                you can sign in by user email & password.
              </Typography>
              <Typography
                variant="h6"
                align="justify"
                className={classes.descriptionText}
                // eslint-disable-next-line react/jsx-no-comment-textnodes
              >
                Account Security: Users are responsible for maintaining the
                confidentiality of their accounts.
              </Typography>
              <Typography
                variant="h5"
                align="left"
                className={classes.descriptionHeading}
              >
                Software Use and Restrictions
              </Typography>
              <Typography
                variant="h6"
                align="justify"
                className={classes.descriptionText}
                // eslint-disable-next-line react/jsx-no-comment-textnodes
              >
                License: We grant you a limited, non-exclusive, non-transferable
                license to use the software.
              </Typography>
              <Typography
                variant="h6"
                align="justify"
                className={classes.descriptionText}
                // eslint-disable-next-line react/jsx-no-comment-textnodes
              >
                Prohibited Uses: You may not use the software for any unlawful
                purpose or to infringe on the rights of others.
              </Typography>
              <Typography
                variant="h6"
                align="justify"
                className={classes.descriptionText}
                // eslint-disable-next-line react/jsx-no-comment-textnodes
              >
                Modification of Terms: We reserve the right to modify these
                terms at any time.
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

TermsOfService.propTypes = {
  onToggleDark: PropTypes.func.isRequired,
  onToggleDir: PropTypes.func.isRequired,
};

// Use this below for Server Side Render/Translation (SSR)
// export const getStaticProps = async ({ locale }) => ({ props: { ...await serverSideTranslations(locale, ['common']) } });

// Use this below for Static Site Generation (SSG)
const getStaticProps = makeStaticProps(["common"]);
export { getStaticPaths, getStaticProps };

export default TermsOfService;
