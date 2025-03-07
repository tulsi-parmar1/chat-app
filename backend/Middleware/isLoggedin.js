import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
async function isLoggedIn(req, res, next) {
  const token = req.cookies.token;

  //if token is not present
  if (!token) {
    return res.status(401).json({ message: "Unauthorized1" });
  }
  try {
    //verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized2" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized3" });
  }
}

export default isLoggedIn;
