import EmailIcon from "@mui/icons-material/Email";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
// import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";
import logo from "../../public/images/Booking_Dei_logo.png";
import brand from "~/public/text/brand";
import SelectLang from "../LangSwitch/Select";
import useStyles from "./footer-style";
import { getRedirect } from "../../lib/redirect";

const date = new Date();
const year = date.getFullYear();
function Copyright() {
  return (
    <Typography
      variant="body2"
      display="block"
      align="left"
      color="textSecondary"
    >
      &copy;&nbsp;
      {brand.saas.footerText}
      {year}
    </Typography>
  );
}

const footers = [
  {
    title: "menu",
    description: ["Feature", "FAQ"],
    link: ["#feature", "#faq"],
  },
  {
    title: "policy",
    description: [
      "Terms of Service",
      "Privacy Policy",
      "Data Security",
      "Cookie Policy",
    ],
    link: [
      "policy/terms-of-service",
      "policy/privacy-policy",
      "policy/data-security",
      "policy/cookie-policy",
    ],
  },
];

function Footer(props) {
  console.log(logo);
  const { classes, cx } = useStyles();
  const { invert, toggleDir } = props;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Container
      maxWidth="lg"
      component="footer"
      className={cx(classes.footer, invert && classes.invert)}
    >
      <Grid container spacing={4} className={classes.footerStyle}>
        <Grid item xs={12} md={6}>
          <div className={classes.footerLeft}>
            <div className={classes.logo}>
              <img src={logo.src} alt="logo" />
              <Copyright />
            </div>
            <div className={classes.location}>
              <LocationOnIcon className={classes.icon} />
              <Typography variant="body2" align="left" color="textSecondary">
                House # 8, Road # 6, Shekhertek, Mohammadpur
                <br /> Dhaka-1207, Bangladesh.
              </Typography>
            </div>
            <div className={classes.mail}>
              <EmailIcon className={classes.icon} />
              <Typography variant="body2" align="left" color="textSecondary">
                info@bookingdei.com
              </Typography>
            </div>
            <div className={classes.phone}>
              <PhoneIcon className={classes.icon} />
              <Typography variant="body2" align="left" color="textSecondary">
                +1 (323)-388-4703
              </Typography>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={3}>
          <Grid container spacing={4} justifyContent="space-evenly">
            {footers.map((footer) => (
              <Grid
                item
                xs={12}
                md={6}
                key={footer.title}
                className={classes.siteMapItem}
              >
                {isDesktop && (
                  <div>
                    <Typography
                      variant="h6"
                      className={classes.title}
                      color="textPrimary"
                      gutterBottom
                    >
                      {footer.title}
                    </Typography>
                    <ul>
                      {footer.description.map((item, index) => {
                        return (
                          <li key={item}>
                            <Link
                              href={`/${footer.link[index]}`}
                              variant="subtitle1"
                              color="textSecondary"
                            >
                              {item}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
                {isMobile && (
                  <Accordion
                    square
                    classes={{
                      root: classes.accordionRoot,
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandMoreIcon className={classes.accordionIcon} />
                      }
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      classes={{
                        content: classes.accordionContent,
                      }}
                    >
                      <strong>{footer.title}</strong>
                    </AccordionSummary>
                    <AccordionDetails>
                      <ul>
                        {footer.description.map((item, index) => (
                          <li key={item}>
                            <Link
                              href={footer.link[index]}
                              variant="subtitle1"
                              color="textSecondary"
                            >
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </AccordionDetails>
                  </Accordion>
                )}
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <div className={classes.socmed}>
            <IconButton aria-label="FB" className={classes.margin} size="small">
              <a
                href="https://www.facebook.com/BookingDei"
                target="_blank"
                rel="noreferrer"
              >
                <i className="ion-logo-facebook" />
              </a>
            </IconButton>
            <IconButton aria-label="LI" className={classes.margin} size="small">
              <a
                href="https://www.linkedin.com/company/booking-dei/"
                target="_blank"
                rel="noreferrer"
              >
                <i className="ion-logo-linkedin" />
              </a>
            </IconButton>
          </div>
          <SelectLang toggleDir={toggleDir} />
        </Grid>
      </Grid>
    </Container>
  );
}

Footer.propTypes = {
  invert: PropTypes.bool,
  toggleDir: PropTypes.func,
};

Footer.defaultProps = {
  invert: false,
  toggleDir: () => {},
};

export default Footer;
