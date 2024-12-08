import * as dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

export default async function createuserToken(user) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing ");
  }
  const tokenObject = {
    user: { userId: user.userId, username: user.username, email: user.email },
  };
  const userJSON = JSON.stringify(tokenObject);
  const token = jwt.sign(userJSON, process.env.JWT_SECRET);

  return token;
}
