import RecipeList from "@/components/RecipeList";
import { getPublicRecipes } from "@/services/recipeService";
import { findOrCreateUser } from "@/services/userService";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const publicRecipes = await getPublicRecipes();

  const user = await currentUser();

  if (user) {
    await findOrCreateUser(
      user.id,
      user.username || user.firstName || undefined,
      user.imageUrl
    );
  }

  return (
    <main className="text-center my-8">
      <h1 className="text-4xl font-bold">Welcome to Cooker&apos;s book!</h1>
      <p className="text-lg mt-4">
        Explore delicious recipes and create your own culinary masterpieces.
      </p>
      <p className="text-2xl mt-6 font-semibold">
        Looking for inspiration? Here are some recipes just for you:
      </p>
      <section className="mt-8">
        {publicRecipes && publicRecipes.length > 0 ? (
          <RecipeList recipes={publicRecipes} />
        ) : (
          <p>No recipes available at the moment. Please check back later!</p>
        )}
      </section>
    </main>
  );
}
