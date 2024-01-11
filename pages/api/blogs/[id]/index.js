import {
  deleteBlogById,
  getBlogById,
  updateBlogById,
} from "../../../../prisma/blogs";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    switch (req.method) {
      case "GET":
        const blog = await getBlogById(id);
        return res.status(200).json(blog);

      case "PATCH":
        const updatedBlog = await updateBlogById(id, req.body);
        return res.status(200).json(updatedBlog);

      case "DELETE":
        await deleteBlogById(id);
        return res.status(200).json({ message: "Blog successfully deleted" });

      default:
        return;
    }
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}
