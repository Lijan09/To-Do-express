import bcrypt from "bcrypt";

export class PasswordUtils {
  static hashPassword = async (hashPassword: string) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(hashPassword, salt);
    return hashedPassword;
  };

  static validatePassword = async (
    password: string,
    hashedPassword: string
  ) => {
    const isValid = await bcrypt.compare(password, hashedPassword);
    return isValid;
  };
}
