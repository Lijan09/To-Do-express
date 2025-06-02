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
  user: string;
}

export interface IUpdateDescription {
  title: string;
  newDescription: string;
  user: string;
}

export interface IUpdateComment {
  title: string;
  newComment: string;
  user: string;
}

export interface ICreate {
  title: string;
  description?: string;
  comments?: string;
  user: string;
}

export interface ICreateReturn {
  title: string;
  description?: string;
  comments?: string;
}
