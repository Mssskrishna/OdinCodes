import bcrypt from "bcrypt";

const saltRounds = 10;

export async function hashPassword(passoword) {
  return bcrypt.hashSync(passoword, 10);
}

export async function compareWithHash(hashed, password) {
  console.log(hashed);
  return bcrypt.compareSync(password, hashed);
}
