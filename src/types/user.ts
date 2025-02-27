import mongoose from "mongoose";

type UserType = {
  email: string;
  password: string;
  name: string;
  profile_pic: string;
  recipes_id_list?: mongoose.Types.ObjectId[];
  created_at: Date;
  updated_at?: Date;
};

export default UserType;
