import mongoose from "mongoose";

type UserType = {
  _id: mongoose.Types.ObjectId;
  clerk_id: string;
  email?: string;
  name: string;
  profile_pic: string;
  favorite_recipes_id_list?: mongoose.Types.ObjectId[];
  created_at: Date;
  updated_at?: Date;
};

export default UserType;
