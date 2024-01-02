// "use client";
// import React, { Fragment, useEffect, useState } from "react";
// import Header from "~/components/Header";
// import Footer from "~/components/Footer";
// import Head from "next/head";
// import { makeStyles } from "tss-react/mui";
// import PropTypes from "prop-types";
// import { makeStaticProps } from "~/lib/getStatic";
// import { useRouter } from "next/router";
// import SingleBlog from "../../../../components/Blogs/SingleBlog";

// const useStyles = makeStyles({ uniqId: "editor" })((theme) => ({
//   header: {
//     background: theme.palette.primary.dark,
//     position: "relative",
//     height: "130px",
//   },
//   editorSection: {
//     // background: theme.palette.primary.dark,
//     position: "relative",
//     background: "white",
//   },
//   footer: {
//     background: theme.palette.primary.dark,
//     position: "relative",
//   },
// }));

// const blog = (props) => {
//   const router = useRouter();
//   // const [blog, setBlog] = useState({});
//   // useEffect(() => {
//   //   fetch(`http://localhost:3008/api/blogs/${blogId}`)
//   //     .then((res) => res.json())
//   //     .then((data) => {
//   //       setBlog(data);
//   //     });
//   // }, []);
//   const { classes } = useStyles();
//   const { onToggleDark, onToggleDir, blog } = props;
//   return (
//     <Fragment>
//       <Head>{/* <title>{brand.saas.name + " - " + errorCode}</title> */}</Head>
//       <div className={classes.header}>
//         <Header
//           onToggleDark={onToggleDark}
//           onToggleDir={onToggleDir}
//           // invert={true}
//         />
//       </div>
//       <SingleBlog blog={blog} />
//       <div className={classes.footer}>
//         <Footer />
//       </div>
//     </Fragment>
//   );
// };
// blog.propTypes = {
//   onToggleDark: PropTypes.func.isRequired,
//   onToggleDir: PropTypes.func.isRequired,
// };

// // const getStaticProps = makeStaticProps(["common"]);

// // export async function getStaticPaths() {
// //   const response = await fetch("blog");
// //   const data = await response.json();
// //   const locales = ["en", "bn"];

// //   const paths = locales.flatMap((locale) =>
// //     data.blogs.map((blog) => ({
// //       params: { locale: locale, blogId: blog.id.toString() },
// //     }))
// //   );

// //   return { paths, fallback: true };
// // }

// // export async function getStaticProps({ params }) {
// //   // Fetch data for the blog post with the given ID
// //   const response = await fetch(
// //     `http://localhost:3008/api/blogs/${params.blogId}`
// //   );
// //   const blog = await response.json();

// //   return { props: { blog } };
// // }

// export async function getStaticProps(context) {
//   // Call your custom makeStaticProps function
//   const staticProps = await makeStaticProps(["common"])(context);

//   // Fetch data for the blog post with the given ID
//   const response = await fetch(
//     `http://localhost:3008/api/blogs/${context.params.id}`
//   );

//   const blog = await response.json();

//   // Merge the blog data with the other static props
//   const props = { ...staticProps.props, blog };

//   return { props };
// }
// export const getStaticPaths = async () => {
//   return {
//     paths: [], //indicates that no page needs be created at build time
//     fallback: "blocking", //indicates the type of fallback
//   };
// };

// export default blog;

import React, { Fragment } from "react";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import Head from "next/head";
import { makeStyles } from "tss-react/mui";
import PropTypes from "prop-types";
import SingleBlog from "~/components/Blogs/SingleBlog";
import { makeStaticProps } from "~/lib/getStatic";

const useStyles = makeStyles({ uniqId: "singleBlog" })((theme) => ({
  header: {
    background: theme.palette.primary.dark,
    position: "relative",
    height: "130px",
  },
  footer: {
    background: theme.palette.primary.dark,
    position: "relative",
  },
}));

const BlogPage = (props) => {
  const { classes } = useStyles();
  const { onToggleDark, onToggleDir, blog } = props;

  if (!blog) {
    // Handle case when blog data is not available
    return <div>Blog not found.</div>;
  }

  return (
    <Fragment>
      <Head>
        <title>{blog.title}</title>{" "}
        {/* Assuming blog object has a title property */}
      </Head>
      <div className={classes.header}>
        <Header onToggleDark={onToggleDark} onToggleDir={onToggleDir} />
      </div>
      <SingleBlog blog={blog} />
      <div className={classes.footer}>
        <Footer />
      </div>
    </Fragment>
  );
};

BlogPage.propTypes = {
  onToggleDark: PropTypes.func.isRequired,
  onToggleDir: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
};

export async function getStaticProps(context) {
  // Call your custom makeStaticProps function to get common props
  const commonProps = await makeStaticProps(["common"])(context);

  // Fetch data for the blog post with the given ID
  let blogData = null;
  try {
    const response = await fetch(
      `http://localhost:3008/api/blogs/${context.params.id}`
    );
    if (response.ok) {
      blogData = await response.json();
    } else {
      console.error("Blog not found", response.status);
    }
  } catch (error) {
    console.error("Error fetching blog", error);
  }

  // If blog data is not found, return notFound: true to render a 404 page
  if (!blogData) {
    return {
      notFound: true,
    };
  }

  // Combine the common props with the blog data
  const props = {
    ...commonProps.props,
    blog: blogData,
  };

  return { props };
}

export async function getStaticPaths() {
  // Optionally fetch and list all possible paths here
  // For now, we'll just tell Next.js to dynamically generate pages on request
  return {
    paths: [],
    fallback: true,
  };
}

export default BlogPage;

// import React, { useEffect, useState, Fragment } from "react";
// import { useRouter } from "next/router";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
// import Header from "~/components/Header";
// import Footer from "~/components/Footer";
// import SingleBlog from "~/components/Blogs/SingleBlog";
// import { makeStyles } from "tss-react/mui";
// import Head from "next/head";
// import PropTypes from "prop-types";
// import { getStaticPaths, makeStaticProps } from "../../../lib/getStatic";

// const useStyles = makeStyles({ uniqId: "singleBlog" })((theme) => ({
//   header: {
//     background: theme.palette.primary.dark,
//     position: "relative",
//     height: "130px",
//   },
//   footer: {
//     background: theme.palette.primary.dark,
//     position: "relative",
//   },
// }));

// const BlogPage = ({ onToggleDark, onToggleDir }) => {
//   const { classes } = useStyles();
//   const [blog, setBlog] = useState(null);
//   const router = useRouter();
//   const { id } = router.query;

//   useEffect(() => {
//     if (id) {
//       // Replace 'http://localhost:3008' with your production API endpoint if different
//       fetch(`http://localhost:3008/api/blogs/${id}`)
//         .then((res) => res.json())
//         .then((data) => {
//           setBlog(data);
//           console.log(data);
//         })
//         .catch((error) => console.error("Fetching blog failed", error));
//     }
//   }, [id]);

//   if (!blog) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Fragment>
//       <Head>
//         <title>{blog.title}</title>
//       </Head>
//       <div className={classes.header}>
//         <Header onToggleDark={onToggleDark} onToggleDir={onToggleDir} />
//       </div>
//       <SingleBlog blog={blog} />
//       <div className={classes.footer}>
//         <Footer />
//       </div>
//     </Fragment>
//   );
// };

// BlogPage.propTypes = {
//   onToggleDark: PropTypes.func.isRequired,
//   onToggleDir: PropTypes.func.isRequired,
// };

// const getStaticProps = makeStaticProps(["common"]);
// export { getStaticProps };
// const getStaticProps = makeStaticProps(["common"]);
// You'll need to export getStaticPaths if you're using i18n and fallback: false
// export async function getStaticPaths() {
//   return {
//     paths: [], // or dynamically generate paths based on your locales
//     fallback: "blocking", // can also be true or false
//   };
// }
// export { getStaticProps };

// export default BlogPage;
