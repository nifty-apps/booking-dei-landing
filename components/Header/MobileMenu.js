import React from "react";
import PropTypes from "prop-types";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useTranslation } from "next-i18next";
import routeLink from "~/public/text/link";
import useStyles from "./header-style";
import navMenu from "./menu";
import useIsAdmin from "../../utils/adminCheck";

function MobileMenu(props) {
  const { classes, cx } = useStyles();
  const { toggleDrawer, open } = props;
  const { t, i18n } = useTranslation("common");
  const curLang = "/" + i18n.language;
  const { isAdmin, isLoading } = useIsAdmin();

  const SideList = () => (
    <div
      className={classes.mobileNav}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <div className={cx(classes.menu, open && classes.menuOpen)}>
        <List component="nav">
          {navMenu.map((item, index) => (
            <ListItem
              button
              component="a"
              href={`#${item}`}
              key={index.toString()}
              style={{ animationDuration: index * 0.15 + "s" }}
            >
              <ListItemText
                primary={t("saas-landing.header_" + item)}
                className={classes.menuList}
              />
            </ListItem>
          ))}
          <ListItem
            button
            component="a"
            href={curLang + routeLink.saas.contact}
            style={{ animationDuration: navMenu.length * 0.15 + "s" }}
          >
            <ListItemText
              primary={t("saas-landing.header_contact")}
              className={classes.menuList}
            />
          </ListItem>
          <ListItem
            button
            component="a"
            href={curLang + routeLink.saas.blogsMedia}
            style={{ animationDuration: navMenu.length * 0.15 + "s" }}
          >
            <ListItemText
              primary={t("saas-landing.header_blogs_media")}
              className={classes.menuList}
            />
          </ListItem>
          {isAdmin && !isLoading && (
            <ListItem
              button
              component="a"
              href={curLang + routeLink.saas.dashboard}
              style={{ animationDuration: navMenu.length * 0.15 + "s" }}
            >
              <ListItemText
                primary={t("saas-landing.dashboard")}
                className={classes.menuList}
              />
            </ListItem>
          )}
          <Divider className={classes.dividerSidebar} />
          {["login", "register"].map((item, index) => (
            <ListItem
              button
              component="a"
              href={curLang + routeLink.saas[item]}
              key={index.toString()}
              style={{ animationDuration: navMenu.length * 0.15 + "s" }}
            >
              <ListItemText
                primary={t("saas-landing.header_" + item)}
                className={classes.menuList}
              />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );

  return (
    <SwipeableDrawer
      open={open}
      onClose={toggleDrawer}
      onOpen={toggleDrawer}
      classes={{
        paper: classes.paperNav,
      }}
    >
      <SideList />
    </SwipeableDrawer>
  );
}

MobileMenu.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default MobileMenu;
