"use client";
import Link from "next/link";
import RecipeType from "@/types/recipe";
import RecipeGridCard from "@/components/RecipeGridCard";

type RecipeGridProps = {
  recipes: RecipeType[];
};

const RecipeGrid = ({ recipes }: RecipeGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 pt-4 sm:grid-cols-2">
      {recipes.map((recipe) => (
        <Link
          key={recipe._id.toString()}
          href={`/recipe/${recipe._id}`}
          className="text-gray-200 hover:text-white"
        >
          <RecipeGridCard recipe={recipe} />
        </Link>
      ))}
    </div>
  );
};

export default RecipeGrid;
