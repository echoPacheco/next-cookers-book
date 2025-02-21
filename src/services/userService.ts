"use server";

import connectToDatabase from "@/lib/db";
import { User } from "@/models/userSchema";
// import { UserType } from "@/types/user";

export async function getUserByEmail(email: string) {
  try {
    await connectToDatabase();
    const user = await User.findOne({ email: email });
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.log("error", error);
  }
}
