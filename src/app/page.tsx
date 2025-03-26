import RecipeList from "@/components/RecipeList";
import { getFeaturedRecipes, getRecentRecipes } from "@/services/recipeService";
import { findOrCreateUser } from "@/services/userService";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Home() {
  const featuredRecipes = await getFeaturedRecipes("Bakery");
  const clerkUser = await currentUser();
  const recentRecipes = clerkUser ? await getRecentRecipes(clerkUser.id) : null;
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
        {user ? `Welcome, ${user.name}👋` : `Welcome to Cooker's book!`}
      </span>
      <br />
      <span className="font-kalam text-4xl font-bold">Let&apos;s cook!</span>
      <div className="mb-6">
        <div className="flex justify-between text-xl">
          <p>Featured Recipe</p>
          <Link href={"/search/featured"}>see more &gt;</Link>
        </div>
        <section>
          {featuredRecipes && featuredRecipes.length > 0 ? (
            <RecipeList recipes={featuredRecipes} />
          ) : (
            <p>No recipes available at the moment. Please check back later!</p>
          )}
        </section>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-xl">
          <p>Recent checked</p>
          <Link href={"/search"}>see more &gt;</Link>
        </div>
        <section>
          {recentRecipes && recentRecipes.length > 0 ? (
            <RecipeList recipes={recentRecipes} />
          ) : (
            <p>No recipes available at the moment. Please check back later!</p>
          )}
        </section>
      </div>
    </main>
  );
}
