import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createTag(tags) {
  const createdTags = [];
  for (const tag of tags) {
    createdTags.push(
      await prisma.tag.upsert({
        create: { tagName: tag },
        where: { tagName: tag },
        update: {},
      })
    );
  }
  return createdTags;
}
