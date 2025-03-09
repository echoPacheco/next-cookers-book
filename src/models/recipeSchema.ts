import mongoose, { models } from "mongoose";
import RecipeType from "@/types/recipe";

const recipeSchema = new mongoose.Schema<RecipeType>({
  user_id: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  prep_time: {
    type: Number,
    required: true,
  },
  is_private: {
    type: Boolean,
    default: true,
  },
  recipe_pic: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      type: Object,
      required: true,
    },
  ],
  instructions: [
    {
      type: String,
      required: true,
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    required: false,
  },
});

export const Recipe =
  models.Recipe || mongoose.model<RecipeType>("Recipe", recipeSchema);
