import mongoose, { Schema, Document } from "mongoose";

export interface IListSchema extends Document {
  title: string;
  description?: string;
  comments?: string;
  status: "active" | "doing" | "completed";
  createdAt: Date;
  userID: mongoose.Types.ObjectId;
  deadline?: Date;
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
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  deadline: {
    type: Date,
    required: false,
  },
});

listSchema.index({ userID: 1, title: 1 }, { unique: true });

const List = mongoose.model<IListSchema>("List", listSchema);

export default List;
