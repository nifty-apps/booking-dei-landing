import { getBlogs, createBlogs, getTotalBlogs } from "../../../prisma/blogs";
import NextCors from "nextjs-cors";

export default async function handler(req, res) {
  const { title, imgUrl, description } = req.body;

  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "https://booking-dei-landing.vercel.app/",
    optionsSuccessStatus: 200,
  });
  try {
    switch (req.method) {
      case "GET": {
        const { page, limit } = req.query;
        const blogs = await getBlogs(page, limit);
        const totalBlogs = await getTotalBlogs();
        return res.status(200).json({ blogs, totalBlogs });
      }

      case "POST": {
        const blog = await createBlogs({ title, imgUrl, description });
        return res.status(200).json(blog);
      }

      default:
        return;
    }
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}
