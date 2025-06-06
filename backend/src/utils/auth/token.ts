import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config/config";

const JWT_EXPRIRATION = config.jwtExpiration;
const JWT_SECRET = config.jwtSecret;

export class Token {
  generate = (user: string) => {
    const token = jwt.sign({ id: user }, JWT_SECRET, {
      expiresIn: JWT_EXPRIRATION,
    });
    return token;
  };

  verifyToken = (token: string) => {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return decoded;
    } catch (error) {
      console.error("Token verification failed:", error);
      return null;
    }
  };
}
