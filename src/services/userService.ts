"use server";

import connectToDatabase from "@/lib/db";
import { User } from "@/models/userSchema";
import { revalidatePath } from "next/cache";
import UserType from "@/types/user";
import cloudinary from "@/cloudinaryConfig";
import { UploadApiResponse } from "cloudinary";
import { ObjectId } from "mongodb";

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
  email?: string,
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
    const profilePic = formData.get("profile_pic") as File | null;

    let profilePicUrl = null;

    if (profilePic) {
      const arrayBuffer = await profilePic.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "profile_pictures" }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          })
          .end(buffer);
      });

      profilePicUrl = (uploadResult as UploadApiResponse).secure_url;
    }

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { name, ...(profilePicUrl && { profile_pic: profilePicUrl }) },
      { new: true },
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

export const checkFavoriteRecipe = async (
  recipeId: string,
  userId: string,
): Promise<boolean> => {
  try {
    await connectToDatabase();

    const user = await User.findOne({ _id: userId }).select(
      "favorite_recipes_id_list",
    );

    if (!user) {
      console.log("User not found");
      return false;
    }

    return user.favorite_recipes_id_list.some(
      (favId: ObjectId) => favId.toString() === recipeId,
    );
  } catch (error) {
    console.error("Error checking favorite recipe:", error);
    return false;
  }
};

export const toggleFavoriteRecipe = async (
  userId: string,
  recipeId: string,
) => {
  try {
    await connectToDatabase();
    const user = await User.findOne({ _id: userId });

    if (!user) {
      throw new Error("User not found");
    }

    const recipeObjectId = new ObjectId(recipeId);
    const isFavorite = user.favorite_recipes_id_list.some((id: ObjectId) =>
      id.equals(recipeObjectId),
    );

    if (isFavorite) {
      user.favorite_recipes_id_list = user.favorite_recipes_id_list.filter(
        (id: ObjectId) => !id.equals(recipeObjectId),
      );
    } else {
      user.favorite_recipes_id_list.push(recipeObjectId);
    }

    await user.save();
    revalidatePath("/favorites");

    return { success: true, isFavorite: !isFavorite };
  } catch (error) {
    console.error("Error toggling favorite recipe:", error);
    return { success: false, error: "Failed to toggle favorite" };
  }
};
