export async function isAdmin(req, res, next) {
  if (req.headers.admin === "true") {
    next();
  } else {
    res.status(500).json({ message: "Admin is oly able to create the blog" });
  }
}
