import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createUser(name, password, email) {
  try {
    // Validate input data (optional but recommended)
    if (!name || !email || !password) {
      throw new Error("Name, email, and password are required.");
    }

    // Create the user in the database
    const user = await prisma.user.create({
      data: {
        name,
        password,
        email,
      },
    });

    return user;
  } catch (error) {
    console.error("Error creating user:", error.message);
    throw new Error("Error creating user. Please try again later.");
  }
}

export async function getUserFromEmail(email) {
  try {
    const result = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return result;
    // console.log(result)
  } catch (error) {
    console.error("error retrieving user", error);
  }
}
export async function checkUserLiked(blogId, email) {
  try {
    const result = await prisma.blog.findUnique({
      where: {
        id: blogId,
      },
      include: {
        likedBy: {
          where: { email },
        },
      },
    });
    return result.likedBy.length > 0;
  } catch (error) {
    // return res.json
    throw new Error("error searching like");
  }
}
