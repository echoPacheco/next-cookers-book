import { ObjectId } from "mongoose";

type RecipeType = {
  _id: ObjectId;
  user_id: string;
  name: string;
  description: string;
  prep_time: number;
  is_private: boolean;
  recipe_pic: string;
  category: string;
  ingredients: IngredientType[];
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

export type IngredientType = {
  name: string;
  unit_type: UnitType;
  quantity: number;
  price?: number;
};

export default RecipeType;
