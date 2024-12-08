import {
  checkuserLiked,
  createBlogs,
  decLike,
  fetchOne,
  fetchTitles,
  incLike,
} from "../controllers/blog.controller.js";

import { createComments } from "../controllers/comments.controller.js";
import { authenticate } from "../middleware/authenticate.js";
/* GET home page */
import { Router } from "express";
import { isAdmin } from "../middleware/isAdmin.js";
const router = Router();
router.get("/", fetchTitles);

router.get("/:blogId", authenticate, fetchOne);

router.post("/likeinc", authenticate, incLike);
router.post("/likedec", authenticate, decLike);

router.post("/checklike", authenticate, checkuserLiked);
router.post("/createblog", isAdmin, createBlogs);

router.post("/createComment", authenticate, createComments);
export default router;
