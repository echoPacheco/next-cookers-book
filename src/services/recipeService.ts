import connectToDatabase from "@/lib/db";
import { Category } from "@/models/categorySchema";
import { Recipe } from "@/models/recipeSchema";
import CategoryType from "@/types/category";
// import { getUserById } from "./userController";
// import { User } from "@/models/userSchema";
import RecipeType, { IngredientType } from "@/types/recipe";
import { getUserByClerkId } from "@/services/userService";
import cloudinary from "@/cloudinaryConfig";
import { UploadApiResponse } from "cloudinary";
import { User } from "@/models/userSchema";

export const getCategories = async (): Promise<CategoryType[] | undefined> => {
  try {
    await connectToDatabase();

    const categories = await Category.find();
    if (!categories) {
      console.log("Categories not found");
    }
    return categories;
  } catch (error) {
    console.log("error", error);
  }
};

export const getPublicRecipes = async (params: {
  name?: string;
  category?: string;
}): Promise<RecipeType[] | undefined> => {
  try {
    await connectToDatabase();

    const { name, category } = params;
    const filters: { [key: string]: any } = {};
    filters.is_private = false;
    if (name) filters.name = { $regex: name, $options: "i" };
    if (category) filters.category = category;

    const recipes = await Recipe.find(filters);
    if (!recipes) {
      console.log("Recipes not found");
    }
    return JSON.parse(JSON.stringify(recipes));
  } catch (error) {
    console.log("error", error);
  }
};

export const getRecipeById = async (
  id: string,
  userId: string,
): Promise<RecipeType | { error: string }> => {
  try {
    await connectToDatabase();

    const recipe = await Recipe.findOne({ _id: id });

    if (!recipe) {
      return { error: "Recipe not found" };
    }

    if (recipe.is_private && recipe.user_id.toString() !== userId) {
      return { error: "You are not authorized to view this recipe" };
    }

    return JSON.parse(JSON.stringify(recipe));
  } catch (error) {
    console.log("error", error);
    return { error: "Error fetching recipe" };
  }
};

export const getMyRecipes = async (
  userId: string,
): Promise<RecipeType[] | undefined> => {
  try {
    await connectToDatabase();
    const user = await getUserByClerkId(userId);

    if (!user) {
      console.log("User not found");
    }

    const recipes = await Recipe.find({ user_id: user._id });
    if (!recipes) {
      console.log("Recipes not found");
    }
    return JSON.parse(JSON.stringify(recipes));
  } catch (error) {
    console.log("error", error);
  }
};

export const getFeaturedRecipes = async (
  category: string,
): Promise<RecipeType[] | undefined> => {
  try {
    await connectToDatabase();

    const recipes = await Recipe.find({ category });
    if (!recipes) {
      console.log("Recipes not found");
    }
    return JSON.parse(JSON.stringify(recipes));
  } catch (error) {
    console.log("error", error);
  }
};

export const getFavoriteRecipes = async (
  userId: string,
): Promise<RecipeType[] | undefined> => {
  try {
    await connectToDatabase();

    const user = await User.findOne({ clerk_id: userId }).populate(
      "favorite_recipes_id_list",
    );

    if (!user || !user.favorite_recipes_id_list.length) {
      console.log("No favorite recipes found");
      return [];
    }

    return JSON.parse(JSON.stringify(user.favorite_recipes_id_list));
  } catch (error) {
    console.error("Error fetching favorite recipes:", error);
  }
};

export const getRecentRecipes = async (
  userId: string,
): Promise<RecipeType[] | undefined> => {
  try {
    await connectToDatabase();

    const user = await User.findOne({ clerk_id: userId }).populate(
      "recent_recipes_id_list",
    );

    if (!user || !user.recent_recipes_id_list.length) {
      console.log("No recent recipes found");
      return [];
    }

    return JSON.parse(JSON.stringify(user.recent_recipes_id_list));
  } catch (error) {
    console.error("Error fetching recent recipes:", error);
  }
};

export const addRecipe = async (formData: FormData, userId: string) => {
  try {
    await connectToDatabase();
    const user = await getUserByClerkId(userId);

    if (!user) {
      return { error: "User not found" };
    }

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const prep_time = formData.get("prep_time") as string;
    const is_private = formData.get("is_private") === "true";
    const category = formData.get("category") as string;
    const ingredients = JSON.parse(
      formData.get("ingredients") as string,
    ) as IngredientType[];
    const instructions = JSON.parse(
      formData.get("instructions") as string,
    ) as string[];
    const recipe_pic = formData.get("recipe_pic") as File | null;
    let recipe_pic_url = null;

    if (recipe_pic) {
      const arrayBuffer = await recipe_pic.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "recipe_pictures" }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          })
          .end(buffer);
      });
      recipe_pic_url = (uploadResult as UploadApiResponse).secure_url;
    }

    const newRecipe = Recipe.create({
      name,
      user_id: user._id,
      description,
      is_private,
      prep_time: convertToSeconds(prep_time),
      recipe_pic: recipe_pic_url,
      category,
      ingredients,
      instructions,
    });

    return newRecipe;
  } catch (error) {
    console.log("error", error);
    return { error: "Error creating recipe" };
  }
};

const convertToSeconds = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 3600 + minutes * 60;
};
