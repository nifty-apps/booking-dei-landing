import React, { Fragment, useEffect, useState } from "react";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import Head from "next/head";
import { makeStyles } from "tss-react/mui";
import PropTypes from "prop-types";
import SingleBlog from "~/components/Blogs/SingleBlog";
import { makeStaticProps } from "~/lib/getStatic";
import { useRouter } from "next/router";
import nextI18nextConfig from "../../../next-i18next.config";

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
  const { onToggleDark, onToggleDir } = props;

  const [blog, setBlog] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!router.isReady) {
      // If router is not ready, exit the effect
      return;
    }
    fetch(`http://localhost:3008/api/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBlog(data);
        console.log(data);
      })
      .catch((error) => console.error("Fetching blog failed", error));
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
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

// export async function getStaticProps(context) {
//   const commonProps = await makeStaticProps(["common"])(context);

//   const response = await fetch(
//     `http://localhost:3008/api/blogs/${context.params.id}`
//   );
//   const blogData = await response.json();
//   const props = {
//     ...commonProps.props,
//     blog: blogData,
//   };

//   return { props, revalidate: 1 };
// }
const getStaticProps = makeStaticProps(["common"]);
// export async function getStaticPaths() {
//   const blogs = await fetch(`http://localhost:3008/api/blogs`);
//   const blogsData = await blogs.json();
//   console.log(blogsData);
//   const paths = blogsData?.blogs.map((blog) => ({
//     params: { id: blog.id, locale: "en" },
//   }));
//   return {
//     paths: paths,
//     fallback: false, // See the "fallback" section below
//   };
// }
// export const getI18nPaths = () =>
//   nextI18nextConfig.i18n.locales.map((lng) => ({
//     params: {
//       locale: lng,
//     },
//   }));

export async function getStaticPaths() {
  // Fetch the list of blog posts
  const res = await fetch("http://localhost:3008/api/blogs");
  const posts = await res.json(); // Assuming the API returns an array of posts

  // Get the locales from your configuration
  const locales = nextI18nextConfig.i18n.locales;

  // Generate the paths for each locale and post
  const paths = locales.flatMap((locale) =>
    posts.blogs.map((post) => ({
      params: { locale, id: "" }, // Ensure the id is a string
    }))
  );

  return {
    paths,
    fallback: "blocking", // or 'blocking' if you want SSR for new paths
  };
}
export { getStaticProps };
// export { getStaticProps };

export default BlogPage;
