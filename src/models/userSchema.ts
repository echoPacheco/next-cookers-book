import mongoose, { models, Schema } from "mongoose";
import UserType from "@/types/user";

const userSchema = new mongoose.Schema<UserType>({
  clerk_id: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  profile_pic: {
    type: String,
  },
  favorite_recipes_id_list: [
    {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
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

export const User = models.User || mongoose.model<UserType>("User", userSchema);
