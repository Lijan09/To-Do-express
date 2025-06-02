import { Types } from "mongoose";

export interface IList {
  title: string;
  description?: string;
  comments?: string;
  status: "active" | "doing" | "completed";
  user: Types.ObjectId;
}

export interface IUpdateStatus {
  title: string;
  newStatus: "active" | "doing" | "completed";
}

export interface IUpdateDescription {
  title: string;
  newDescription: string;
}

export interface IUpdateComment {
  title: string;
  newComment: string;
}

export interface ICreate {
  title: string;
  description?: string;
  comments?: string;
}
