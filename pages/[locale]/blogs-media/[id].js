import React, { Fragment, useEffect, useState } from "react";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import Head from "next/head";
import { makeStyles } from "tss-react/mui";
import PropTypes from "prop-types";
import SingleBlog from "~/components/Blogs/SingleBlog";
import { makeStaticProps } from "~/lib/getStatic";
import { useRouter } from "next/router";

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

  const [blog, setBlog] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
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
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: false, // See the "fallback" section below
  };
}

export { getStaticProps };
// export { getStaticProps };

export default BlogPage;
