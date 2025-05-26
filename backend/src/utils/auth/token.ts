import jwt from 'jsonwebtoken'
import config from '../../config/config'

const JWT_EXPRIRATION = config.jwtExpiration;
const JWT_SECRET = config.jwtSecret;

export class Token {
  private user: any;

  constructor(user: any){
    this.user = user;
  }

  generate = () => {
    const token = jwt.sign({ user: this.user }, JWT_SECRET, {
      expiresIn: JWT_EXPRIRATION,
    });
    return token;
  }


 static verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
 }
}