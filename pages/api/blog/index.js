import { getBlogs, createBlogs, getBlogById } from "../../../prisma/blogs";

export default async function handler(req, res) {
  const { title, imgUrl, description } = req.body;
  const { id } = req.query;
  try {
    switch (req.method) {
      case "GET":
        if (id) {
          const blog = await getBlogById(id);
          return res.status(200).json(blog);
        } else {
          const blogs = await getBlogs();
          return res.status(200).json(blogs);
        }

      case "POST":
        const blog = await createBlogs({ title, imgUrl, description });
        return res.status(200).json(blog);

      default:
        return;
    }
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}
