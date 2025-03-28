import { getPublicRecipes } from "@/services/recipeService";
import RecipeList from "@/components/RecipeList";
import Link from "next/link";
import { Metadata } from "next";
import SearchFilter from "@/components/SearchFilter";

export const metadata: Metadata = {
  title: "Search Recipes",
};

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: {
    // type?: string;
    name?: string;
    category?: string;
    // page?: number;
  };
}) {
  const recipes = await getPublicRecipes({ ...searchParams });

  return (
    <main className="mx-4 my-8 max-w-full text-center sm:mx-10">
      <div className="mb-6">
        <div>
          <SearchFilter />
        </div>
        <div className="mt-6 flex justify-between text-xl">
          <p>All Public Recipes</p>
          <Link href={"/search"}>see more &gt;</Link>
        </div>
        <section>
          {recipes && recipes.length > 0 ? (
            <RecipeList recipes={recipes} />
          ) : (
            <p className="mt-5">
              No recipes available at the moment. Please check back later!
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
