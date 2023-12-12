import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function getPosts(data) {
  const posts = await prisma.blogs.create({
    data: data,
  });
}
