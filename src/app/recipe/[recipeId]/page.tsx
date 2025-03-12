import RecipeDetails from "@/components/RecipeDetails";
import { getRecipeById } from "@/services/recipeService";
import { getUserByClerkId } from "@/services/userService";
import RecipeType from "@/types/recipe";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

async function fetchRecipe(id: string): Promise<RecipeType | null> {
  try {
    const userClerk = await currentUser();
    const userId = userClerk ? (await getUserByClerkId(userClerk.id)).id : null;
    const res = await getRecipeById(id, userId);

    if ("error" in res) {
      console.error(res.error);
      return null;
    }

    return res;
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
  const recipe = await fetchRecipe(params.recipeId);

  if (!recipe) return notFound();

  return (
    <main className="mx-auto my-8 max-w-5xl px-4 sm:px-6 lg:px-8">
      <RecipeDetails recipe={recipe} />
    </main>
  );
}
