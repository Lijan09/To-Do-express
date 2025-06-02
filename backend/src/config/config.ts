import dotenv from "dotenv";

dotenv.config();

interface Config {
  port: number;
  dbURI: string;
  jwtSecret: string;
  jwtExpiration: number;
}

const config: Config = {
  port: Number(process.env.PORT),
  dbURI: String(process.env.MONGODB_URI),
  jwtSecret: String(process.env.JWT_SECRET),
  jwtExpiration: Number(process.env.JWT_EXPIRATION),
};

export default config;
