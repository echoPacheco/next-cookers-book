import RecipeType from "@/types/recipe";
import Image from "next/image";

type RecipeCardProps = {
  recipe: RecipeType;
};

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const { name, recipe_pic, category } = recipe;

  return (
    <>
      <div className="flex max-w-sm transform flex-col justify-around rounded-xl shadow-sm shadow-zinc-900 transition-transform duration-300 hover:scale-105">
        <Image
          src={
            typeof recipe_pic === "string"
              ? recipe_pic
              : "/images/default_recipe.webp"
          }
          width={350}
          height={350}
          alt={name || "Default recipe image"}
          className="h-44 w-full rounded-t-xl object-cover md:h-36 xl:h-48"
          onDragStart={(e) => e.preventDefault()}
        />
        <div className="flex items-center justify-center rounded-xl bg-white p-2 pb-2">
          <h2
            className="w-full overflow-hidden truncate whitespace-nowrap text-center text-xl font-semibold text-dark_brown"
            title={name}
          >
            {name}
          </h2>
        </div>
      </div>
    </>
  );
};

export default RecipeCard;
