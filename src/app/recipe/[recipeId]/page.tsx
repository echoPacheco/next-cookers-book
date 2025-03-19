import RecipeDetails from "@/components/RecipeDetails";
import { getRecipeById } from "@/services/recipeService";
import { checkFavoriteRecipe, getUserByClerkId } from "@/services/userService";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

async function fetchRecipe(id: string) {
  try {
    const userClerk = await currentUser();
    const userId = userClerk
      ? (await getUserByClerkId(userClerk.id))?._id
      : null;

    const recipe = await getRecipeById(id, userId);
    if (!recipe || "error" in recipe) {
      console.error(recipe?.error || "Recipe not found");
      return null;
    }

    const isFavorite = userId
      ? await checkFavoriteRecipe(recipe._id.toString(), userId)
      : false;

    return { recipe, isFavorite };
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return null;
  }
}

export default async function RecipeDetailsPage({
  params,
}: {
  params: {
    recipeId: string;
  };
}) {
  try {
    const result = await fetchRecipe(params.recipeId);
    if (!result) return notFound();

    const { recipe, isFavorite } = result;

    return (
      <main className="mx-auto my-8 max-w-5xl px-4 sm:px-6 lg:px-8">
        <RecipeDetails recipe={recipe} isFavorite={isFavorite} />
      </main>
    );
  } catch (error) {
    console.error("Error rendering RecipeDetailsPage:", error);
    return notFound();
  }
}
