import RecipeType from "@/types/recipe";
import Image from "next/image";

type RecipeCardProps = {
  recipe: RecipeType;
};

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const { name, recipe_pic, category } = recipe;

  return (
    <>
      <div className="flex flex-col justify-around rounded-2xl shadow-lg shadow-zinc-900 max-w-sm transform hover:scale-105 transition-transform duration-300">
        <Image
          src={
            typeof recipe_pic === "string"
              ? recipe_pic
              : "https://morar.com.br/wp-content/uploads/2020/08/Receitas_Rapidas_Morar_Construtora.jpeg"
          }
          width={350}
          height={350}
          alt={name || "Default recipe image"}
          className="w-full max-h-52 object-cover rounded-t-2xl"
        />
        <div className="flex justify-between items-center p-2 pb-2">
          <h2 className="text-xl font-semibold ">{name}</h2>
          <div className="rounded-full p-2 shadow-md bg-zinc-300">
            <span className="text-gray-600">{category}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeCard;
