import bcrypt from "bcrypt";
import crypto from "crypto";

export class PasswordUtils {
  hashPassword = async (hashPassword: string) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(hashPassword, salt);
    return hashedPassword;
  };

  validatePassword = async (password: string, hashedPassword: string) => {
    const isValid = await bcrypt.compare(password, hashedPassword);
    return isValid;
  };

  generateResetToken = () => {
    return crypto.randomBytes(32).toString("hex");
  };

  hashResetToken = (resizeToken: string) => {
    return crypto.createHash("sha256").update(resizeToken).digest("hex");
  };

  validateResetToken = (resetToken: string, hashedToken: string) => {
    return (
      this.hashResetToken(resetToken) === hashedToken
    );
  }
}
