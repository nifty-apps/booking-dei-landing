import { getBlogs, createBlogs, getTotalBlogs } from "../../../prisma/blogs";

export default async function handler(req, res) {
  const {
    title,
    imgUrl,
    description,
    alt,
    author,
    metaTitle,
    metaDescription,
    ogTitle,
    slugUrl,
  } = req.body;

  try {
    switch (req.method) {
      case "GET": {
        const { page, limit } = req.query;
        const blogs = await getBlogs(page, limit);
        const totalBlogs = await getTotalBlogs();
        return res.status(200).json({ blogs, totalBlogs });
      }

      case "POST": {
        const blog = await createBlogs({
          title,
          imgUrl,
          description,
          alt,
          author,
          metaTitle,
          metaDescription,
          ogTitle,
          slugUrl,
        });
        return res.status(200).json(blog);
      }

      default:
        return;
    }
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}
