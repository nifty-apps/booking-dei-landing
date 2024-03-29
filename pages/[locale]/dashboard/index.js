import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "tss-react/mui";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Link from "next/link";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import EngineeringIcon from "@mui/icons-material/Engineering";
import PostAddIcon from "@mui/icons-material/PostAdd";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { getStaticPaths, makeStaticProps } from "~/lib/getStatic";
import brand from "~/public/text/brand";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import Notification from "~/components/Notification";
import withAdmin from "../../../components/WithAdmin/WithAdmin";
import DashboardMenu from "../../../components/Dashboard/Dashboard";

const useStyles = makeStyles({ uniqId: "blank" })((theme) => ({
  header: {
    background: theme.palette.primary.dark,
    position: "relative",
    height: "130px",
  },
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
    marginTop: theme.spacing(10),
    padding: theme.spacing(4),
    "& > section": {
      position: "relative",
    },
  },
  linkDec: {
    color: theme.palette.mode === "dark" ? `white` : `black`,
    textDecoration: "none",
    fontWeight: "bold",
  },
  linkIcon: {
    color: theme.palette.mode === "dark" ? `white` : `black`,
  },
}));

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "fixed",
    marginTop: "70px",
    zIndex: 0,
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

function dashboard(props) {
  const { classes, cx } = useStyles();
  const { onToggleDark, onToggleDir } = props;
  const { t } = useTranslation("common");
  const [open, setOpen] = useState(true);
  const [hide, setHide] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const drawerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (drawerRef.current) {
        const newTop = "50";
        drawerRef.current.style.top = `${newTop}px`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>{brand.saas.name + " - Dashboard"}</title>
      </Head>
      <CssBaseline />

      <div className={classes.mainWrap}>
        <DashboardMenu />

      </div>
    </React.Fragment>
  );
}

dashboard.propTypes = {
  onToggleDark: PropTypes.func.isRequired,
  onToggleDir: PropTypes.func.isRequired,
};

// Use this below for Server Side Render/Translation (SSR)
// export const getStaticProps = async ({ locale }) => ({ props: { ...await serverSideTranslations(locale, ['common']) } });

// Use this below for Static Site Generation (SSG)
const getStaticProps = makeStaticProps(["common"]);
export { getStaticPaths, getStaticProps };

export default withAdmin(dashboard);
