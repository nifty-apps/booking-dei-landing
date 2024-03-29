import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import dynamic from "next/dynamic";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import Scrollspy from "react-scrollspy";
import logo from "../../public/images/logos/booking-dei-logo.png";
import brand from "~/public/text/brand";
import link from "~/public/text/link";
import MobileMenu from "./MobileMenu";
import Settings from "./Settings";
import useStyles from "./header-style";
import navMenu from "./menu";
import { useRouter } from "next/router";
import useIsUserLoggedIn from "../../utils/isLoggedIn";
import useIsAdmin from "../../utils/adminCheck";

let counter = 0;
function createData(name, url, offset) {
  counter += 1;
  return {
    id: counter,
    name,
    url,
    offset,
  };
}

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) {
  // eslint-disable-line
  return <AnchorLink to={props.to} {...props} />; // eslint-disable-line
});

function Header(props) {
  const [fixed, setFixed] = useState(false);

  const isLoggedIn = useIsUserLoggedIn();

  let flagFixed = false;
  const handleScroll = () => {
    const doc = document.documentElement;
    const scroll = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    const newFlagFixed = scroll > 100;
    if (flagFixed !== newFlagFixed) {
      setFixed(newFlagFixed);
      flagFixed = newFlagFixed;
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  const { classes, cx } = useStyles();
  const theme = useTheme();
  const { onToggleDark, onToggleDir, invert } = props;
  const { t, i18n } = useTranslation("common");
  const curLang = "/" + i18n.language;

  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();
  const { isAdmin, isLoading } = useIsAdmin();

  const [menuList] = useState([
    createData(navMenu[0], "#" + navMenu[0]),
    createData(navMenu[1], "#" + navMenu[1]),
    // createData(navMenu[2], "#" + navMenu[2]),
    // createData(navMenu[3], '#' + navMenu[3], -40),
  ]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
  };
  const pathforblogs = "/" + router.pathname.split("/")[2];
  const isActive = pathforblogs === link.saas.blogsMedia;
  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };
  return (
    <Fragment>
      {isTablet && (
        <MobileMenu open={openDrawer} toggleDrawer={handleOpenDrawer} />
      )}
      <AppBar
        component="header"
        position="relative"
        id="header"
        className={cx(
          classes.header,
          fixed && classes.fixed,
          invert && classes.invert,
          openDrawer && classes.openDrawer
        )}
      >
        <Container fixed={isDesktop}>
          <div className={classes.headerContent}>
            <nav className={classes.navMenu}>
              {isTablet && (
                <IconButton
                  onClick={handleOpenDrawer}
                  className={cx(
                    "hamburger hamburger--spin",
                    classes.mobileMenu,
                    openDrawer && "is-active"
                  )}
                  size="large"
                >
                  <span className="hamburger-box">
                    <span className={cx(classes.bar, "hamburger-inner")} />
                  </span>
                </IconButton>
              )}
              <div className={classes.logo}>
                {invert ? (
                  <Link href={curLang + "/"}>
                    <img src={logo} alt="logo" />
                    {!isTablet && brand.saas.name}
                  </Link>
                ) : (
                  <Link href="/">
                    <img src={logo} alt="logo" />
                    {!isTablet && brand.saas.name}
                  </Link>
                )}
              </div>
              {isDesktop && (
                <Scrollspy items={navMenu} currentClassName="active">
                  {menuList.map((item) => {
                    return (
                      <li key={item.id.toString()}>
                        {invert ? (
                          // eslint-disable-next-line
                          <Button
                            offset={item.offset || 0}
                            href={"/" + item.url}
                          >
                            {t("saas-landing.header_" + item.name)}
                          </Button>
                        ) : (
                          <Button
                            component={LinkBtn}
                            offset={item.offset || 0}
                            href={item.url}
                          >
                            {t("saas-landing.header_" + item.name)}
                          </Button>
                        )}
                      </li>
                    );
                  })}
                  <li>
                    <Button href={curLang + link.saas.contact}>
                      {t("saas-landing.header_contact")}
                    </Button>
                  </li>
                  <li>
                    <Button
                      href={curLang + link.saas.blogsMedia}
                      style={{ opacity: isActive ? ".5" : "1" }}
                    >
                      {t("saas-landing.header_blogs_media")}
                    </Button>
                    {isAdmin && !isLoading && (
                      <Button
                        href={curLang + link.saas.dashboard}
                        style={{ opacity: isActive ? ".5" : "1" }}
                      >
                        {t("saas-landing.dashboard")}
                      </Button>
                    )}
                  </li>
                </Scrollspy>
              )}
            </nav>
            <nav className={classes.navMenu}>
              {!isMobile && (
                <Fragment>
                  {isLoggedIn ? (
                    <Button
                      className={classes.textBtn}
                      style={{ color: "white" }}
                      onClick={handleLogout}
                    >
                      {t("saas-landing.header_logout")}
                    </Button>
                  ) : (
                    <Button
                      href={curLang + link.saas.login}
                      className={classes.textBtn}
                    >
                      {t("saas-landing.header_login")}
                    </Button>
                  )}
                  <Button
                    href={curLang + link.saas.register}
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                  >
                    {t("saas-landing.header_register")}
                  </Button>
                </Fragment>
              )}
              <Settings
                toggleDark={onToggleDark}
                toggleDir={onToggleDir}
                invert={invert}
              />
            </nav>
          </div>
        </Container>
      </AppBar>
    </Fragment>
  );
}

Header.propTypes = {
  onToggleDark: PropTypes.func.isRequired,
  onToggleDir: PropTypes.func.isRequired,
  invert: PropTypes.bool,
};

Header.defaultProps = {
  sticky: false,
  invert: false,
};

export default Header;
