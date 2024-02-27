import {
  deleteBlogBySlug,
  getBlogBySlug,
  updateBlogBySlug,
} from "../../../../prisma/blogs";

export default async function handler(req, res) {
  const { slug } = req.query;

  try {
    switch (req.method) {
      case "GET":
        const blog = await getBlogBySlug(slug);
        return res.status(200).json(blog);

      case "PATCH":
        const updatedBlog = await updateBlogBySlug(slug, req.body);
        return res.status(200).json(updatedBlog);

      case "DELETE":
        await deleteBlogBySlug(slug);
        return res.status(200).json({ message: "Blog successfully deleted" });

      default:
        return;
    }
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}
