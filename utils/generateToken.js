import jwt from "jsonwebtoken";
export const genrateToken = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
  res.cookie("jwt", token, {
    maxAge: 10 * 24 * 60 * 60 * 1000,
    httpOnly: true, //prevent xss attacks - not accessible vai js
    sameSite: "strict", //prevent CSRF attacks
  });
};
