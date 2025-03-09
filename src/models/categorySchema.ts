import mongoose, { models } from "mongoose";
import CategoryType from "@/types/category";

const categorySchema = new mongoose.Schema<CategoryType>({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export const Category =
  models.Category || mongoose.model<CategoryType>("Category", categorySchema);
