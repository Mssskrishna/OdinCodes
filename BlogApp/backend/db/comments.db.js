import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createComment(blogId, content, userEmail) {
  const result = await prisma.comments.create({
    data: {
      body: content,
      blogId: blogId,
      userEmail: userEmail,
    },
    include: {
      commentedBy: { include: { Comments: true } },
    },
  });
  return result;
}
