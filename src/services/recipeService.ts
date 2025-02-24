import connectToDatabase from "@/lib/db";
import { Recipe } from "@/models/recipeSchema";
// import { getUserById } from "./userController";
// import { User } from "@/models/userSchema";
import RecipeType from "@/types/recipe";
// import { addMultipleIngredients } from "./ingredientController";
// import IngredientType from "../types/ingredient";
// import cloudinary from "../cloudinaryConfig";
// import { MulterRequest } from "../middlewares/multerConfig";

// export const getRecipe = async (req: Request, res: Response) => {
//     const recipe_id = req.params.recipe_id;

//     try {
//         const recipe = await Recipe.findById(recipe_id).populate(
//             "ingredients_id_list"
//         );

//         if (!recipe) {
//             return res.status(404).json({ message: "Recipe not found" });
//         }
//         res.json(recipe);
//     } catch (error) {
//         res.status(500).json({ message: "Internal server error", error });
//     }
// };

// export const getUserRecipes = async (req: Request, res: Response) => {
//     const user_id = req.session.currentUser.id;

//     try {
//         if (user_id) {
//             const { user, error } = await getUserById(user_id);

//             if (error || !user) {
//                 return res.status(404).json({ message: "User not found" });
//             }

//             const recipes = await Recipe.find({
//                 _id: { $in: user.recipes_id_list },
//             });
//             if (!recipes) {
//                 return res.status(404).json({ message: "Recipes not found" });
//             }
//             res.json(recipes);
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Internal server error", error });
//     }
// };

export const getPublicRecipes = async (): Promise<RecipeType[] | undefined> => {
  try {
    await connectToDatabase();

    const recipes = await Recipe.find({ is_private: false });
    if (!recipes) {
      console.log("Recipes not found");
    }
    return recipes;
  } catch (error) {
    console.log("error", error);
  }
};

// export const addRecipe = async (req: MulterRequest, res: Response) => {
//     const user_id = req.session.currentUser.id;

//     const {
//         name,
//         description,
//         is_private,
//         category_id,
//         ingredients,
//         instructions,
//     } = req.body;

//     const parsedIngredients = JSON.parse(ingredients);
//     const parsedInstructions = JSON.parse(instructions);

//     let newIngredients: IngredientType[] | { error: string };

//     try {
//         newIngredients = await addMultipleIngredients(parsedIngredients);
//     } catch (error) {
//         return res
//             .status(500)
//             .json({ message: "Error adding ingredients", error });
//     }

//     let recipePicUrl = "";
//     if (req.file) {
//         try {
//             const result = await cloudinary.uploader.upload(req.file.path, {
//                 folder: "recipes",
//             });
//             recipePicUrl = result.secure_url;
//         } catch (error) {
//             return res
//                 .status(500)
//                 .json({ message: "Error uploading image", error });
//         }
//     }

//     if (Array.isArray(newIngredients)) {
//         const ingredients_id_list = newIngredients.map(
//             (ingredient: IngredientType) => ingredient._id
//         );

//         try {
//             console.log(
//                 "alooooo",
//                 name,
//                 description,
//                 is_private,
//                 recipePicUrl,
//                 category_id,
//                 ingredients_id_list,
//                 parsedInstructions
//             );

//             const recipe = await Recipe.create({
//                 name,
//                 description,
//                 is_private,
//                 recipe_pic: recipePicUrl,
//                 category_id,
//                 ingredients_id_list,
//                 parsedInstructions,
//             });

//             console.log("recipe");

//             await User.findByIdAndUpdate(user_id, {
//                 $push: { recipes_id_list: recipe._id },
//             });

//             res.status(201).json({
//                 status: 201,
//                 message: "Recipe Created",
//                 data: recipe,
//             });
//         } catch (error) {
//             res.status(500).json({ message: "Error creating recipe", error });
//         }
//     } else {
//         throw new Error("Invalid response from addMultipleIngredients");
//     }
// };

// export const updateRecipe = async (req: Request, res: Response) => {
//     const recipe_id = req.params.recipe_id;
//     const updateData = {
//         ...req.body,
//         updated_at: Date.now(),
//     };

//     try {
//         const recipeUpdated = await Recipe.findByIdAndUpdate(
//             recipe_id,
//             updateData,
//             {
//                 new: true,
//                 runValidators: true,
//             }
//         );

//         if (!recipeUpdated) {
//             return res.status(404).json({ message: "Recipe not found" });
//         }

//         res.status(200).json({
//             status: 200,
//             message: "Recipe Updated",
//             data: recipeUpdated,
//         });
//     } catch (error) {
//         res.status(500).json({ message: "Error updating recipe", error });
//     }
// };

// export const deleteRecipe = async (req: Request, res: Response) => {
//     const recipe_id = req.params.recipe_id;

//     try {
//         const result = await Recipe.findByIdAndDelete(recipe_id);

//         if (!result) {
//             return res.status(404).json({
//                 status: 404,
//                 message: "Recipe not found",
//             });
//         }

//         res.status(200).json({
//             status: 200,
//             message: "Recipe deleted successfully",
//         });
//     } catch (error) {
//         res.status(500).json({ message: "Error deleting recipe", error });
//     }
// };
