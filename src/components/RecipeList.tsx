import Link from "next/link";
import RecipeType from "@/types/recipe";
import RecipeCard from "@/components/RecipeCard";

type RecipeListProps = {
  recipes: RecipeType[];
};

const RecipeList = ({ recipes }: RecipeListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-10">
      {recipes.map((recipe) => (
        <Link
          href={`/recipe/${recipe._id}`}
          className="text-gray-200 hover:text-white"
        >
          <RecipeCard key={recipe._id?.toString()} recipe={recipe} />
        </Link>
      ))}
    </div>
  );
};

export default RecipeList;
