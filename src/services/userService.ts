"use server";

import connectToDatabase from "@/lib/db";
import { User } from "@/models/userSchema";
import { revalidatePath } from "next/cache";
import UserType from "@/types/user";

export async function getUserByClerkId(clerkId: string) {
  try {
    await connectToDatabase();
    const user = await User.findOne({ clerk_id: clerkId });
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.log("error", error);
  }
}

export async function findOrCreateUser(
  clerkId: string,
  name?: string,
  profilePic?: string,
  email?: string
): Promise<UserType | null> {
  try {
    await connectToDatabase();
    const user = await User.findOne({ clerk_id: clerkId });

    if (user) {
      return user;
    }

    const newUser = await User.create({
      clerk_id: clerkId,
      name: name || "User",
      profile_pic: profilePic || "/default_user.png",
      email,
    });

    return newUser;
  } catch (error) {
    console.error("Error checking or creating user:", error);
    return null;
  }
}

export async function updateUserProfile(formData: FormData) {
  try {
    await connectToDatabase();
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const profilePic = formData.get("profile_pic") as string;

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { name, profile_pic: profilePic },
      { new: true }
    );

    if (!updatedUser) {
      return { error: "User not found" };
    }

    revalidatePath("/profile");
    return { success: "Profile updated successfully" };
  } catch (error) {
    console.error("Update error:", error);
    return { error: "Failed to update profile" };
  }
}
