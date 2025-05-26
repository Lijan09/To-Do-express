import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUserSchema extends Document {
  name: string;
  password: string;
  userName: string;
  role: 'admin' | 'user';
}

const userSchema: Schema<IUserSchema> = new Schema<IUserSchema>({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
    validate: {
      validator: (password: string) => password.length >= 8,
      message: "Password must be at least 8 characters long",
    },
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
});

userSchema.pre<IUserSchema>('save', async function () {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


const User = mongoose.model<IUserSchema>('User', userSchema);

export default User;
