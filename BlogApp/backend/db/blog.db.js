//

import { PrismaClient } from "@prisma/client";
import { createTag } from "./tags.db.js";
const prisma = new PrismaClient();

export async function createBlog(
  title,
  introduction,
  body,
  conclusion,
  publish,
  tags
) {
  try {
    let published = false;
    if (publish === "yes") {
      published = true;
    }
    const existingBlog = await prisma.blog.findUnique({
      where: { title },
    });

    if (existingBlog) {
      throw new Error(`Blog with the title "${title}" already exists`);
    }
    const filteredBody = body.filter((paragraph) => paragraph.trim() !== "");

    const createdTags = await createTag(tags);

    const result = await prisma.blog.create({
      data: {
        title,
        introduction,
        body: filteredBody,
        conclusion,
        published,
        tags: { connect: createdTags },
      },
      include: {
        tags: true,
      },
    });
    return result;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }

  console.log(result);
}

export async function fetchOneBlog(blogId) {
  const result = await prisma.blog.findUnique({
    where: {
      id: blogId,
    },
    include: {
      //   likes: true,
      _count: {
        select: { likedBy: true },
      },
      tags: true,
    },
  });
  return result;
}

export async function increaseLike(blogId, email) {
  const result = await prisma.blog.update({
    where: {
      id: blogId,
    },
    data: {
      likedBy: { connect: { email: email } },
      //   likes: { increment: 1 },
    },
    include: {
      //   likes: true,
      _count: {
        select: { likedBy: true },
      },
    },
  });
  return result;
}

export async function decreaseLike(blogId, email) {
  const result = await prisma.blog.update({
    where: {
      id: blogId,
    },
    data: {
      likedBy: { disconnect: { email: email } },
      //   likes: { increment: 1 },
    },
    include: {
      //   likes: true,
      _count: {
        select: { likedBy: true },
      },
      likedBy: true,
    },
  });
  return result;
}
export async function fetchBlogsTitles() {
  const result = await prisma.blog.findMany({
    select: {
      title: true,
      id: true,
    },
  });
  return result;
  // console.log(result)
}
