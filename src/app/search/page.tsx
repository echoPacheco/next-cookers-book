import { getPublicRecipes } from "@/services/recipeService";
import RecipeList from "@/components/RecipeList";
import Link from "next/link";

const SearchPage = async () => {
  const recipes = await getPublicRecipes();

  return (
    <main className="mx-10 my-8 max-w-full text-center">
      <div className="mb-6">
        <div className="flex justify-between text-xl">
          <p>All Public Recipes</p>
          <Link href={"/search"}>see more &gt;</Link>
        </div>
        <section>
          {recipes && recipes.length > 0 ? (
            <RecipeList recipes={recipes} />
          ) : (
            <p>No recipes available at the moment. Please check back later!</p>
          )}
        </section>
      </div>
    </main>
  );
};

export default SearchPage;
