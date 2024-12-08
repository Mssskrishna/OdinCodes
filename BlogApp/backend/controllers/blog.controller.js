import {
  createBlog,
  decreaseLike,
  fetchBlogsTitles,
  fetchOneBlog,
  increaseLike,
} from "../db/blog.db.js";
import { checkUserLiked } from "../db/user.db.js";

export async function fetchTitles(req, res) {
  const result = await fetchBlogsTitles();
  return res.status(200).json(result);
}

export async function fetchOne(req, res) {
  const blogId = parseInt(req.params.blogId);
  const result = await fetchOneBlog(blogId);
  if (result === null) {
    return res.status(500).json({ error: "no such blog id exists" });
  }
  return res.status(200).json(result);
}
export async function incLike(req, res) {
  const id = parseInt(req.body.blogId, 10);
  // console.log(req.body)
  console.log(id);
  try {
    const result = await increaseLike(id, req.user.email);
    return res.status(200).json({ count: result._count.likedBy });
  } catch (error) {
    console.error("Error in increasing like", error);
    return res.status(500).json({ error: error.message });
  }
}
export async function decLike(req, res) {
  const blogId = parseInt(req.body.blogId);
  // console.log(blogId);
  try {
    const result = await decreaseLike(blogId, req.user.email);
    return res.status(200).json({ count: result._count.likedBy });
  } catch (error) {
    console.error("Error in increasing like", error);
    return res.status(500).json({ error: error.message });
  }
}

export async function checkuserLiked(req, res) {
  try {
    const blogId = parseInt(req.body.blogId);
    const result = await checkUserLiked(blogId, req.user.email);
    let liked;
    if (result) {
      liked = true;
    } else {
      liked = false;
    }
    return res.json({ liked });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function createBlogs(req, res) {
  try {
    const { title, introduction, conclusion, body, publish, tags } = req.body;
    const response = await createBlog(
      title,
      introduction,
      body,
      conclusion,
      publish,
      tags
    );
    if (response) return res.status(201).json({ response });
  } catch (error) {
    return res.json({ error: error.message });
  }
}
