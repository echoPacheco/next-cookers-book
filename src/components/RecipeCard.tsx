import RecipeType from "@/types/recipe";
import Image from "next/image";

type RecipeCardProps = {
  recipe: RecipeType;
};

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const { name, recipe_pic, category } = recipe;

  return (
    <>
      <div className="flex max-w-sm transform flex-col justify-around rounded-2xl shadow-lg shadow-zinc-900 transition-transform duration-300 hover:scale-105">
        <Image
          src={
            typeof recipe_pic === "string"
              ? recipe_pic
              : "/images/default_recipe.webp"
          }
          width={350}
          height={350}
          alt={name || "Default recipe image"}
          className="max-h-52 w-full rounded-t-2xl object-cover"
        />
        <div className="flex items-center justify-between p-2 pb-2">
          <h2 className="text-xl font-semibold">{name}</h2>
          <div className="rounded-full bg-zinc-300 p-2 shadow-md">
            <span className="text-gray-600">{category}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeCard;
