import { getBlogById } from "../../../../prisma/blogs";

export default async function handler(req, res) {
  const { id } = req.query;
  try {
    switch (req.method) {
      case "GET":
        const blog = await getBlogById(id);
        console.log(blog);
        return res.status(200).json(blog);

      default:
        return;
    }
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}
