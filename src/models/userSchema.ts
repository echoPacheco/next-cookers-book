import mongoose, { Schema } from "mongoose";
import UserType from "@/types/user";

const userSchema = new mongoose.Schema<UserType>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  profile_pic: {
    type: String,
  },
  recipes_id_list: [
    {
      type: Schema.Types.ObjectId,
      ref: "Recipes",
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model<UserType>("User", userSchema);
