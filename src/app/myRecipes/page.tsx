import RecipeList from "@/components/RecipeList";
import { getFavoriteRecipes, getMyRecipes } from "@/services/recipeService";
import { findOrCreateUser } from "@/services/userService";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function MyRecipes() {
  const clerkUser = await currentUser();
  const userRecipes = clerkUser ? await getMyRecipes(clerkUser.id) : null;
  const favoriteRecipes = clerkUser
    ? await getFavoriteRecipes(clerkUser.id)
    : null;

  let user;

  if (clerkUser) {
    user = await findOrCreateUser(
      clerkUser.id,
      clerkUser.username || clerkUser.firstName || undefined,
      clerkUser.imageUrl,
    );
  }

  return (
    <main className="mx-5 my-8 max-w-full text-center sm:mx-10">
      <span className="me-4 font-kalam text-4xl font-bold">
        {user ? `Hey, ${user.name}!` : `Welcome to Cooker's book!`}
      </span>
      <br />
      <span className="font-kalam text-4xl font-bold">
        What are we cooking today?
      </span>
      <div className="mb-6">
        <div className="flex justify-between text-xl">
          <p>My Recipes</p>
          <Link href={"/search/myRecipes"}>see more &gt;</Link>
        </div>
        <section>
          {userRecipes && userRecipes.length > 0 ? (
            <RecipeList recipes={userRecipes} />
          ) : (
            <p>No recipes available at the moment. Please check back later!</p>
          )}
        </section>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-xl">
          <p>Favorites</p>
          <Link href={"/search/favorites"}>see more &gt;</Link>
        </div>
        <section>
          {favoriteRecipes && favoriteRecipes.length > 0 ? (
            <RecipeList recipes={favoriteRecipes} />
          ) : (
            <p>No recipes available at the moment. Please check back later!</p>
          )}
        </section>
      </div>
    </main>
  );
}
