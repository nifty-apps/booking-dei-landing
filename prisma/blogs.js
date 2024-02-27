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
export async function getBlogBySlug(slug) {
  try {
    const blog = await prisma.blogs.findUnique({
      where: {
        slugUrl: slug,
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
export async function updateBlogBySlug(slug, data) {
  try {
    const updatedBlog = await prisma.blogs.update({
      where: {
        slugUrl: slug,
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
export async function deleteBlogBySlug(slug) {
  try {
    await prisma.blogs.delete({
      where: {
        slugUrl: slug,
      },
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw error;
  }
}
