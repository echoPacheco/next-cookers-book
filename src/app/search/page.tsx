import {
  getFavoriteRecipes,
  getFeaturedRecipes,
  getMyRecipes,
  getPublicRecipes,
  getRecentRecipes,
} from "@/services/recipeService";
import { Metadata } from "next";
import SearchFilter from "@/components/SearchFilter";
import RecipeGrid from "@/components/RecipeGrid";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Search Recipes",
};

type searchParams = {
  type?: "featured" | "recent" | "myRecipes" | "favorites";
  name?: string;
  category?: string;
};

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: {
    type?: "featured" | "recent" | "myRecipes" | "favorites";
    name?: string;
    category?: string;
    // page?: number;
  };
}) {
  const userClerk = await currentUser();
  let title: string = "";

  const fetchRecipes = async (filters: searchParams) => {
    switch (filters.type) {
      case "featured":
        title = "Featured";
        return await getFeaturedRecipes("Bakery", filters.name);
      case "recent":
        title = "Recent Viewed";
        return userClerk
          ? await getRecentRecipes(userClerk.id, filters)
          : redirect("/sign-in");
      case "myRecipes":
        title = "My Recipes";
        return userClerk
          ? await getMyRecipes(userClerk.id, filters)
          : redirect("/sign-in");

      case "favorites":
        title = "Favorites";
        return userClerk
          ? await getFavoriteRecipes(userClerk.id, filters)
          : redirect("/sign-in");
      default:
        title = "Public Recipes";
        return await getPublicRecipes(filters);
    }
  };

  const recipes = await fetchRecipes({ ...searchParams });

  return (
    <main className="mx-4 my-8 max-w-full text-center sm:mx-10">
      <div className="mb-6">
        <div>
          <SearchFilter />
        </div>
        <div className="mb-2 mt-6 text-left text-xl">
          <p>{title}</p>
        </div>
        <section>
          {recipes && recipes.length > 0 ? (
            <RecipeGrid recipes={recipes} />
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
