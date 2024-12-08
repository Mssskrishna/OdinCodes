import { createUser, getUserFromEmail } from "../db/user.db.js";
import createuserToken from "../utils/createUserToken.js";
import { compareWithHash, hashPassword } from "../utils/hashPassword.js";
import userViewer from "../views/userView.js";

export async function userCreate(req, res) {
  const { name, email, password } = req.body;

  try {
    // Validate input data
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Name, email, and password are required." });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create the user in the database
    const user = await createUser(name, hashedPassword, email);

    //create usertoken
    const token = await createuserToken(user);

    const userView = userViewer(user, token);
    // Send the user view with 201 status
    return res.status(201).json(userView);
  } catch (error) {
    console.error("Error:", error.message);

    // Send error response if something goes wrong
    return res.status(500).json({ error: error.message });
  }
}

export async function checkUser(req, res) {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new Error("email or password must present");
    }
    //get user from email
    const user = await getUserFromEmail(email);
    if (!user) {
      throw new Error("email is not present");
    }
    //compare password with hashed
    if (!compareWithHash(password, user.password)) {
      return res.sendStatus(403);
    }
    const token = await createuserToken(user);
    const userView = userViewer(user, token);
    return res.json(userView);
  } catch (error) {
    // throw error;
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}


