import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// create blogs
export async function createBlogs({
  title,
  imgUrl,
  description,
  alt,
  author,
  metaTitle,
  metaDescription,
  ogTitle,
  slugUrl,
}) {
  try {
    const blogs = await prisma.blogs.create({
      data: {
        title,
        imgUrl,
        description,
        alt,
        author,
        metaTitle,
        metaDescription,
        ogTitle,
        slugUrl,
      },
    });

    return blogs;
  } catch (error) {
    console.error("Error creating blog:", error);
    throw error;
  }
}

// Get Blogs
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

// Get a single Blog
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

// get all Blogs number
export async function getTotalBlogs() {
  try {
    const totalBlogs = await prisma.blogs.count();
    return totalBlogs;
  } catch (error) {
    console.error("Error getting total blogs:", error);
    throw error;
  }
}

// Edit blog
export async function updateBlogById(id, data) {
  try {
    const updatedBlog = await prisma.blogs.update({
      where: {
        id: id,
      },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
    return updatedBlog;
  } catch (error) {
    console.error("Error updating blog:", error);
    throw error;
  }
}

// Delete  a blog
export async function deleteBlogById(id) {
  try {
    await prisma.blogs.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw error;
  }
}
