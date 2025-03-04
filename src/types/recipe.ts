import mongoose, { ObjectId } from "mongoose";

type RecipeType = {
  _id: ObjectId;
  name: string;
  description: string;
  is_private: boolean;
  recipe_pic: string;
  category: string;
  ingredients_id_list: mongoose.Types.ObjectId[];
  instructions: string[];
  created_at: Date;
  updated_at?: Date;
};

export type UnitType =
  | "mg"
  | "g"
  | "kg"
  | "ml"
  | "l"
  | "cm"
  | "m"
  | "unit"
  | "tsp"
  | "tbsp"
  | "cup"
  | "pint";

type IngredientType = {
  name: string;
  unit_type: UnitType;
  quantity: number;
  price_per_unit?: number;
  created_at: Date;
  updated_at?: Date;
  _id: string;
};

export default RecipeType;
