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
export async function getBlogs(page = 1, limit = 10) {
  const pageInt = parseInt(page, 10);
  const limitInt = parseInt(limit, 10);
  try {
    const blogs = await prisma.blogs.findMany({
      skip: (pageInt - 1) * limitInt,
      take: limitInt,
    });
    return blogs;
  } catch (error) {
    throw new Error(`Error getting blogs: ${error.message}`);
  }
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

export async function getTotalBlogs() {
  try {
    const totalBlogs = await prisma.blogs.count();
    return totalBlogs;
  } catch (error) {
    console.error("Error getting total blogs:", error);
    throw error;
  }
}
