import { getBlogById } from "../../../../prisma/blogs";
import NextCors from "nextjs-cors";

export default async function handler(req, res) {
  const { id } = req.query;
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "https://booking-dei-landing.vercel.app",
    optionsSuccessStatus: 200,
  });
  try {
    switch (req.method) {
      case "GET":
        const blog = await getBlogById(id);
        return res.status(200).json(blog);

      default:
        return;
    }
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}
