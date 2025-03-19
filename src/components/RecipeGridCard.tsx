import RecipeType from "@/types/recipe";
import Image from "next/image";

type RecipeGridCardProps = {
  recipe: RecipeType;
};

const RecipeGridCard = ({ recipe }: RecipeGridCardProps) => {
  const { name, recipe_pic, ingredients } = recipe;

  return (
    <div>
      <div className="flex max-w-md transform gap-4 truncate rounded-xl pb-4 transition-transform duration-300 hover:scale-105">
        <Image
          src={
            typeof recipe_pic === "string"
              ? recipe_pic
              : "/images/default_recipe.webp"
          }
          width={100}
          height={100}
          alt={name || "Default recipe image"}
          className="size-28 rounded-lg object-cover"
          onDragStart={(e) => e.preventDefault()}
        />

        <div className="flex flex-col">
          <h2
            className="text-start text-lg font-bold text-dark_brown"
            title={name}
          >
            {name}
          </h2>

          {ingredients && ingredients.length > 0 && (
            <ul className="mt-1 list-inside list-disc items-start text-left text-sm text-dark_brown">
              {ingredients.slice(0, 3).map((ingredient, index) => (
                <li key={`${ingredient.name}-${index}`}>{ingredient.name}</li>
              ))}
              {ingredients.length > 3 && <li>…</li>}
            </ul>
          )}
        </div>
      </div>
      <hr className="rounded-full border border-brown" />
    </div>
  );
};

export default RecipeGridCard;
