import {
  getFavoriteRecipes,
  getFeaturedRecipes,
  //   getRecentRecipes,
  getMyRecipes,
  //   getFavoriteRecipes,
} from "@/services/recipeService";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import RecipeGrid from "@/components/RecipeGrid";

const FilterPage = async ({ params }: { params: { filterType: string } }) => {
  const { filterType } = params;
  let filterName: string = "Recipes";

  const userClerk = await currentUser();

  const fetchRecipes = async (filterType: string) => {
    switch (filterType) {
      case "featured":
        filterName = "Featured";
        return await getFeaturedRecipes("Bakery");
      //   case "recent":
      // filterName = "Recent Viewed";
      //     return await getRecentRecipes();
      case "myRecipes":
        filterName = "My Recipes";
        return userClerk
          ? await getMyRecipes(userClerk.id)
          : redirect("/sign-in");

      case "favorites":
        filterName = "Favorites";
        return userClerk
          ? await getFavoriteRecipes(userClerk.id)
          : redirect("/sign-in");
      default:
        return [];
    }
  };

  const recipes = await fetchRecipes(filterType);

  return (
    <main className="mx-10 my-8 max-w-full text-center">
      <div className="mb-6">
        <div className="flex text-xl">
          <p>{filterName}</p>
        </div>
        <section>
          {recipes && recipes.length > 0 ? (
            <RecipeGrid recipes={recipes} />
          ) : (
            <p>No recipes available at the moment. Please check back later!</p>
          )}
        </section>
      </div>
    </main>
  );
};

export default FilterPage;
