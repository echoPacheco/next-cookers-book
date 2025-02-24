import mongoose, { models, Schema } from "mongoose";
import RecipeType from "@/types/recipe";

const recipeSchema = new mongoose.Schema<RecipeType>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
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
  ingredients_id_list: [
    {
      type: Schema.Types.ObjectId,
      ref: "Ingredient",
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
