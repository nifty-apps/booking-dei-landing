import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const registerUser = async (name, email, password, isAdmin) => {
  const existingUser = await prisma.users.findUnique({
    where: { email },
  });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.users.create({
    data: {
      name,
      email,
      password: hashedPassword,
      isAdmin,
    },
  });

  return user;
};

export const loginUser = async (email, password) => {
  // Find the user by email
  const user = await prisma.users.findUnique({ where: { email } });

  if (!user) {
    throw new Error("Invalid email");
  }

  // Check if the password is correct
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  // For simplicity, return a success message. In a real app, you would set a session or token here.
  return user;
};
