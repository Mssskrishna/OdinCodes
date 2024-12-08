import { createComment } from "../db/comments.db.js";

export async function createComments(req, res) {
  try {
    const blogId = parseInt(req.body.blogId, 10);

    const { body } = req.body;
    const userEmail = req.user.email;
    const result = await createComment(blogId, body, userEmail);
    if (result) return res.status(201).json({ result });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
