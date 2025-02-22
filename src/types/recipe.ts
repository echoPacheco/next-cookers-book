import mongoose, { ObjectId } from "mongoose";

type RecipeType = {
  _id: ObjectId;
  name: string;
  description: string;
  is_private: boolean;
  recipe_pic: String;
  category: string;
  ingredients_id_list: mongoose.Types.ObjectId[];
  instructions: string[];
  created_at: Date;
  updated_at?: Date;
};

export default RecipeType;
