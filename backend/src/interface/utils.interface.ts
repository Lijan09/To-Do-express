export interface IPasswordUtil {
  hashPassword(password: string): Promise<string>;
  validatePassword(password: string, hashedPassword: string): Promise<boolean>;
}

export interface IToken {
  generate(user: string): string;
  verifyToken(token: string): any | null;
}
