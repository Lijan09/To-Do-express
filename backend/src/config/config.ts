import dotenv from 'dotenv';

dotenv.config();

interface Config {
    port: number;
    dbURL: string;
    jwtSecret: string;
    jwtExpiration: any
}

const config: Config = {
    port: Number(process.env.PORT),
    dbURL: String(process.env.MONGOURI),
    jwtSecret: String(process.env.JWT_SECRET),
    jwtExpiration: process.env.JWT_EXPIRATION
}

export default config;