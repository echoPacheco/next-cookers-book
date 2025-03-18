import RecipeList from "@/components/RecipeList";
// import SearchFilter from "@/components/SearchFilter";
import { getPublicRecipes } from "@/services/recipeService";
import { findOrCreateUser } from "@/services/userService";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Home() {
  const publicRecipes = await getPublicRecipes();

  const clerkUser = await currentUser();
  let user;

  if (clerkUser) {
    user = await findOrCreateUser(
      clerkUser.id,
      clerkUser.username || clerkUser.firstName || undefined,
      clerkUser.imageUrl,
    );
  }

  return (
    <main className="mx-10 my-8 max-w-full text-center">
      <span className="me-4 font-kalam text-4xl font-bold">
        {user ? `Welcome, ${user.name}👋` : `Welcome to Cooker's book!`}
      </span>
      <span className="font-kalam text-4xl font-bold">Let&apos;s cook!</span>
      {/* <SearchFilter /> */}
      <div className="mb-6">
        <div className="flex justify-between text-xl">
          <p>Featured Recipe</p>
          <Link href={"/search"}>see more &gt;</Link>
        </div>
        <section>
          {publicRecipes && publicRecipes.length > 0 ? (
            <RecipeList recipes={publicRecipes} />
          ) : (
            <p>No recipes available at the moment. Please check back later!</p>
          )}
        </section>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-xl">
          <p>Recent checked recipes</p>
          <Link href={"/search"}>see more &gt;</Link>
        </div>
        <section>
          {publicRecipes && publicRecipes.length > 0 ? (
            <RecipeList recipes={publicRecipes} />
          ) : (
            <p>No recipes available at the moment. Please check back later!</p>
          )}
        </section>
      </div>
    </main>
  );
}
