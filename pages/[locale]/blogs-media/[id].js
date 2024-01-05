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
  const { onToggleDark, onToggleDir, blog } = props;

  // const [blog, setBlog] = useState({});
  const router = useRouter();
  const { id } = router.query;

  // useEffect(() => {
  //   if (!router.isReady) {
  //     // If router is not ready, exit the effect
  //     return;
  //   }
  //   fetch(`/api/blogs/${id}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setBlog(data);
  //     })
  //     .catch((error) => console.error("Fetching blog failed", error));
  // }, [id]);

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
//     `https://booking-dei-landing.vercel.app/api/blogs/${context.params.id}`
//   );
//   const blogData = await response.json();
//   const props = {
//     ...commonProps.props,
//     blog: blogData,
//   };

//   return { props, revalidate: 1 };
// }
// const getStaticProps = makeStaticProps(["common"]);
// console.log(getStaticProps);
// export async function getStaticPaths() {
//   const blogs = await fetch(`https://booking-dei-landing.vercel.app/api/blogs`);
//   const blogsData = await blogs.json();
//   const paths = blogsData?.blogs.map((blog) => ({
//     params: { id: blog.id, locale: "en" },
//   }));
//   return {
//     paths: paths,
//     fallback: true, // See the "fallback" section below
//   };
// }
// export const getI18nPaths = () =>
//   nextI18nextConfig.i18n.locales.map((lng) => ({
//     params: {
//       locale: lng,
//     },
//   }));

// export async function getStaticPaths() {
// const res = await fetch("https://booking-dei-landing.vercel.app/api/blogs");
// const posts = await res.json();

// const locales = nextI18nextConfig.i18n.locales;

// const paths = locales.flatMap((locale) =>
//   posts.blogs.map((post) => ({
//     params: { locale, id: post.id },
//   }))
// );

//   return {
//     paths: [],
//     fallback: "blocking",
//   };
// }

// export { getStaticProps };

export async function getStaticProps(context) {
  const commonProps = await makeStaticProps(["common"])(context);
  // Update the URL to your production or environment-specific API
  const response = await fetch(
    `https://booking-dei-landing.vercel.app/api/blogs/${context.params.id}`
  );
  if (!response.ok) {
    // Handle errors here, perhaps throw a 404 or return an error page
    return { notFound: true };
  }

  const blogData = await response.json();
  const props = {
    ...commonProps.props,
    blog: blogData,
  };

  return { props, revalidate: 1 }; // revalidate every 1 second for ISR
}

export async function getStaticPaths() {
  const blogs = await fetch(`https://booking-dei-landing.vercel.app/api/blogs`);
  const blogsData = await blogs.json();
  const paths = blogsData?.blogs.map((blog) => ({
    params: { id: blog.id.toString(), locale: "en" }, // Ensure IDs are strings
  }));

  return {
    paths,
    fallback: true, // Use 'blocking' for better SEO and user experience
  };
}
// export { getStaticProps };

export default BlogPage;
