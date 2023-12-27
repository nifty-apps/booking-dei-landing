import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { ObjectId } from "mongodb";

export async function createBlogs({ title, imgUrl, description }) {
  try {
    const blogs = await prisma.blogs.create({
      data: {
        title,
        imgUrl,
        description,
      },
    });
    return blogs;
  } catch (error) {
    console.error("Error creating blog:", error);
    throw error;
  }
}
export async function getBlogs() {
  const blogs = await prisma.blogs.findMany();
  return blogs;
}

export async function getBlogById(id) {
  try {
    const blog = await prisma.blogs.findUnique({
      where: {
        id: id,
      },
    });
    return blog;
  } catch (error) {
    console.error("Error fetching blog:", error);
    throw error;
  }
}
