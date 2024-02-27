import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import logo from "../../public/images/logos/booking-dei-logo.png";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import HomeIcon from "@mui/icons-material/Home";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

const drawerWidth = 240;
const DashboardMenu = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation("common");
  const curLang = "/" + i18n.language;
  const [user, setUser] = useState(false);

  useEffect(() => {
    setUser(!!localStorage.getItem("user"));
  }, []);

  const dashbordMenu = [
    {
      title: "Blog",
      href: "/dashboard/blogs/",
    },
  ];

  const logout = () => {
    toast.success("You have logged out.");
    localStorage.removeItem("user");
    setUser(!!localStorage.getItem("user"));
    router.push(`/${curLang}/login`);
  };
  return (
    <Box>
      <Drawer
        sx={{
          position: "relative",
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Link
            href={curLang + "/"}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                "& img": {
                  width: 38,
                },
              }}
            >
              <img src={logo} alt="logo" />
            </Box>
          </Link>
        </Toolbar>
        <Divider />
        {user && (
          <List sx={{ padding: "5px" }}>
            {dashbordMenu.map((menu, index) => (
              <ListItem
                key={menu?.href}
                sx={{
                  textDecoration: "none",
                  cursor: "pointer",
                  borderRadius: "5px",
                  backgroundColor: router?.asPath?.includes(menu.href)
                    ? "#458FCD"
                    : "none",
                  boxShadow: router?.asPath?.includes(menu.href)
                    ? "0px 3px 5px rgba(69, 143, 205, 0.50)"
                    : "none",
                  "& a": {
                    width: "100%",
                    color: router?.asPath?.includes(menu.href)
                      ? "white"
                      : "black",
                    textDecoration: "none",
                  },
                }}
              >
                <Link href={curLang + menu?.href}>
                  <ListItemText primary={menu?.title} />
                </Link>
              </ListItem>
            ))}
          </List>
        )}
        <Box
          sx={{
            padding: "5px",
            position: "absolute",
            bottom: "10px",
            display: "flex",
            gap: "5px",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Button
            variant="outlined"
            size="medium"
            onClick={() => {
              router.push(`/${curLang}/`);
            }}
            startIcon={<HomeIcon />}
          >
            Home
          </Button>
          {user && (
            <Button
              variant="contained"
              size="medium"
              type="submit"
              onClick={logout}
              startIcon={<PowerSettingsNewIcon />}
            >
              Logout
            </Button>
          )}
        </Box>
      </Drawer>
    </Box>
  );
};

export default DashboardMenu;
