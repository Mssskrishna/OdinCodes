import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export const authenticate = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization || authorization.split(" ").length !== 2) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  const token = authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Attach user info to request object
    // console.log(req.user)
    next(); // Proceed to the next middleware
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
