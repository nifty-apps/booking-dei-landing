import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const AddBlogsHeader = () => {
  return (
    <Box sx={{ maxWidth: "1080px", margin: "0px auto", paddingTop: "20px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "15px",
        }}
      >
        <Typography
          sx={{ fontSize: "26px", color: "#458FCD", fontWeight: "500" }}
        >
          Blog Page
        </Typography>
        <Link
          href={"/dashboard/blogs/add-blogs/"}
          as={"/dashboard/blogs/add-blogs/"}
        >
          <Button
            sx={{
              width: "200px",
              height: "40px",
              background: "#2c89d8",
              "&:hover": { background: "#004c8c" },
              color: "#fefefe",
            }}
          >
            Add Blog
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default AddBlogsHeader;
