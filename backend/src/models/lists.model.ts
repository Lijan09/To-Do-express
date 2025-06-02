import mongoose, { Schema, Document } from "mongoose";

export interface IListSchema extends Document {
  title: string;
  description?: string;
  comments?: string;
  status: "active" | "doing" | "completed";
  createdAt: Date;
  user: mongoose.Types.ObjectId;
}

const listSchema: Schema<IListSchema> = new Schema<IListSchema>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  comments: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ["active", "doing", "completed"],
    default: "active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

listSchema.index({ user: 1, title: 1 }, { unique: true });

const List = mongoose.model<IListSchema>("List", listSchema);

export default List;
