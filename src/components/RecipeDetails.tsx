"use client";
import RecipeType from "@/types/recipe";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type RecipeDetailsProps = {
  recipe: RecipeType;
};

export default function RecipeDetails({ recipe }: RecipeDetailsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const totalPrice = recipe.ingredients.reduce((acc, ingredient) => {
    const price = Number(ingredient.price) || 0;
    return acc + price;
  }, 0);

  const formatPrepTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  };

  const handleCloseModal = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <button
        onClick={() => router.back()}
        className="mb-2 flex items-center gap-2"
      >
        <span className="text-lg font-bold">&lt; Back</span>
      </button>

      <Image
        src={
          recipe.recipe_pic ||
          "https://morar.com.br/wp-content/uploads/2020/08/Receitas_Rapidas_Morar_Construtora.jpeg"
        }
        alt={recipe.name}
        width={120}
        height={120}
        className="h-60 w-full rounded-lg object-cover sm:h-80 md:h-96"
      />

      <div className="text-start">
        <h1 className="mb-2 font-kalam text-3xl font-bold sm:text-4xl">
          {recipe.name}
        </h1>
        <p className="mb-4">{recipe.description}</p>

        {recipe.ingredients.some((i) => i.price) && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-center rounded-lg border border-gray-400 p-4">
              <Image
                src="/icons/clock.svg"
                alt="Clock icon"
                className="mr-3 mt-1 h-6 w-6"
                width={24}
                height={24}
              />
              <div>
                <p className="text-sm font-semibold">Prep time</p>
                <p className="text-lg font-bold">
                  {formatPrepTime(recipe.prep_time)}
                </p>
              </div>
            </div>

            <div className="flex items-center rounded-lg border border-gray-400 p-4">
              <Image
                src="/icons/money.svg"
                alt="Money icon"
                className="mr-3 mt-1 h-6 w-6"
                width={24}
                height={24}
              />
              <div>
                <p className="text-sm font-semibold">Total cost</p>
                <p className="text-lg font-bold">${totalPrice.toFixed(2)}</p>
              </div>

              <Image
                src="/icons/info.svg"
                alt="Info icon"
                className="ml-auto size-8 cursor-pointer"
                width={32}
                height={32}
                onClick={() => setIsModalOpen(true)}
              />
            </div>
          </div>
        )}

        {isModalOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-3"
            onClick={handleCloseModal}
          >
            <div className="relative w-96 rounded-lg bg-white px-6 py-5 shadow-lg">
              <button
                className="absolute right-4 top-4 text-xl font-bold"
                onClick={() => setIsModalOpen(false)}
              >
                X
              </button>
              <h2 className="mb-2 text-center font-kalam text-xl font-semibold">
                Total Cost: ${totalPrice.toFixed(2)}
              </h2>
              <hr className="rounded-lg border-2 border-dark_brown" />
              <ul>
                {recipe.ingredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className="flex justify-between border-b py-2"
                  >
                    <span>{ingredient.name}</span>
                    <span>${Number(ingredient.price).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        <div className="w-full md:w-1/2">
          <h2 className="mb-4 text-2xl font-semibold">Ingredients</h2>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <div key={index}>
                <li className="mb-2 flex justify-between">
                  <span>{ingredient.name}</span>
                  <span>
                    {ingredient.quantity} {ingredient.unit_type}
                  </span>
                </li>
                {index < recipe.ingredients.length - 1 && (
                  <hr className="my-2 border-gray-300" />
                )}
              </div>
            ))}
          </ul>
        </div>

        <div className="w-full md:w-1/2">
          <h2 className="mb-4 text-2xl font-semibold">Instructions</h2>
          <ol className="list-inside list-decimal space-y-2">
            {recipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
