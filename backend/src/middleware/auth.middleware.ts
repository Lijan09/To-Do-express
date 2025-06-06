import { ExpressHandler } from "./../types/expressHandler";
import { Token } from "../utils/auth/token";
import { JwtPayload } from "jsonwebtoken";

const tokenHandler = new Token();

export const protect: ExpressHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res
      .status(401)
      .json({ message: `${req.originalUrl} needs authentication` });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = tokenHandler.verifyToken(token) as JwtPayload;

    if (!decoded) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    res.locals.user = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const allowSelfOnly: ExpressHandler = (req, res, next) => {
  const userID = res.locals.user;
  const userName = req.params.user;
  if (userID !== userName) {
    return res
      .status(403)
      .json({ message: "Forbidden: You can only access your own profile" });
  }
  next();
};
