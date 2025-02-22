// import Image from "next/image";

import RecipeList from "@/components/RecipeList";
import { getPublicRecipes } from "@/services/recipeController";

export default async function Home() {
  const publicRecipes = await getPublicRecipes();

  return (
    <main className="text-center my-8">
      <h1 className="text-4xl font-bold">Welcome to Cooker's book!</h1>
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
