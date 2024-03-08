import jwt from "jsonwebtoken";
import Users from "../models/Users.js";

const checkAuth = async (req, res, next) => {
  let token = req.cookies['token'];
  
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = await Users.findByPk(decoded.id);
      return next();
    } catch (error) {
      return res.status(401).json({ msg: "Hubo un error" });
    }
  }

  if (!token) {
    const error = new Error("Token no válido");
    return res.status(401).json({ msg: error.message });
  }

  next();
};

export default checkAuth;