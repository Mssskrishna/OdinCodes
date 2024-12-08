import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function checkUserLiked(blogId, email) {
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
    console.error("error", error);
  }
}

console.log(await checkUserLiked(8, "shanu@gmail.com"));
