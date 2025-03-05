"use client";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UnitType } from "@/types/recipe";
import { CategoryType } from "@/types/category";

const NewRecipeForm = () => {
  const [previewPic, setPreviewPic] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [ingredients, setIngredients] = useState([
    { name: "", quantity: "", unit_type: "g" as UnitType, price: "" },
  ]);
  const [instructions, setInstructions] = useState([""]);
  const [recipePic, setRecipePic] = useState<File | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleRecipePicChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setRecipePic(file);
      setPreviewPic(URL.createObjectURL(file));
    }
  };

  const handleAddIngredient = () => {
    setIngredients([
      ...ingredients,
      { name: "", quantity: "", unit_type: "g" as UnitType, price: "" },
    ]);
  };

  const handleIngredientChange = (
    index: number,
    field: keyof (typeof ingredients)[0],
    value: string,
  ) => {
    setIngredients(
      ingredients.map((ing, i) =>
        i === index ? { ...ing, [field]: value } : ing,
      ),
    );
  };

  const handleAddInstruction = () => {
    setInstructions([...instructions, ""]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("is_private", isPrivate.toString());
    formData.append("ingredients", JSON.stringify(ingredients));
    formData.append("instructions", JSON.stringify(instructions));
    if (recipePic) {
      formData.append("recipe_pic", recipePic);
    }

    try {
      console.log(formData);

      // const response = await fetch("/api/recipes", {
      //   method: "POST",
      //   body: formData,
      //   credentials: "include",
      // });

      // if (response.ok) {
      //   console.log("Recipe created successfully!");
      //   router.push("/");
      // } else {
      //   console.error("Failed to create recipe.");
      // }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <main className="mx-auto my-8 max-w-4xl px-4 text-dark_brown">
      <h1 className="mb-6 text-center font-kalam text-4xl font-bold">
        Create a New Recipe
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex w-full flex-col items-center rounded-md bg-gray-700 bg-opacity-40">
          {previewPic ? (
            <Image
              className="max-h-[300px] w-full rounded-md object-cover"
              src={previewPic}
              alt="Recipe Preview"
              width={128}
              height={128}
              quality={100}
            />
          ) : (
            <div className="flex h-[300px] w-full items-center justify-center rounded-md">
              <label
                htmlFor="recipePic"
                className="chocolate-button cursor-pointer"
              >
                Add picture
              </label>
            </div>
          )}
          <input
            id="recipePic"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleRecipePicChange}
          />
        </div>
        {previewPic ? (
          <div className="mb-4 flex justify-center">
            <label
              htmlFor="recipePic"
              className="chocolate-button cursor-pointer text-center"
            >
              Update picture
            </label>
          </div>
        ) : null}

        {/* Recipe Name */}
        <div className="mb-4">
          <label className="block">Recipe Name</label>
          <input
            type="text"
            placeholder="Recipe Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border px-3 py-2"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block">Description</label>
          <textarea
            placeholder="Description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-md border px-3 py-2"
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-md border px-3 py-2"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Ingredients */}
        <div className="mb-4">
          <label className="block">Ingredients</label>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="mb-2 flex items-center gap-2">
              <input
                type="text"
                placeholder="Name"
                value={ingredient.name}
                onChange={(e) =>
                  handleIngredientChange(index, "name", e.target.value)
                }
                className="w-full rounded-md border px-3 py-2"
                required
              />
              <input
                type="number"
                placeholder="Qty"
                value={ingredient.quantity}
                onChange={(e) =>
                  handleIngredientChange(index, "quantity", e.target.value)
                }
                className="w-24 rounded-md border px-3 py-2"
                required
              />
              <select
                value={ingredient.unit_type}
                onChange={(e) =>
                  handleIngredientChange(index, "unit_type", e.target.value)
                }
                className="w-24 rounded-md border px-3 py-2"
              >
                {[
                  "mg",
                  "g",
                  "kg",
                  "ml",
                  "l",
                  "cm",
                  "m",
                  "unit",
                  "tsp",
                  "tbsp",
                  "cup",
                  "pint",
                ].map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Price"
                value={ingredient.price}
                onChange={(e) =>
                  handleIngredientChange(index, "price", e.target.value)
                }
                className="w-24 rounded-md border px-3 py-2"
              />
              {ingredients.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    setIngredients((prev) => prev.filter((_, i) => i !== index))
                  }
                  className="text-red-500 hover:text-red-700"
                >
                  ✖
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddIngredient}
            className="chocolate-button"
          >
            Add Ingredient
          </button>
        </div>

        {/* Instructions */}
        <div className="mb-4">
          <label className="block">Instructions</label>
          {instructions.map((instruction, index) => (
            <div key={index} className="mb-2 flex items-center gap-2">
              <textarea
                value={instruction}
                onChange={(e) =>
                  setInstructions(
                    instructions.map((ins, i) =>
                      i === index ? e.target.value : ins,
                    ),
                  )
                }
                placeholder={`Step ${index + 1}`}
                className="w-full rounded-md border px-3 py-2"
                required
              />
              {instructions.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    setInstructions((prev) =>
                      prev.filter((_, i) => i !== index),
                    )
                  }
                  className="text-red-500 hover:text-red-700"
                >
                  ✖
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddInstruction}
            className="chocolate-button"
          >
            Add Instruction
          </button>
        </div>

        {/* Privacy Setting */}
        <div className="mb-4 flex items-center justify-center space-x-2">
          <input
            type="checkbox"
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
            id="private-checkbox"
            className="peer opacity-0"
          />
          <label
            htmlFor="private-checkbox"
            className="h-5 w-5 cursor-pointer rounded-md border-2 border-dark_brown peer-checked:border-transparent peer-checked:bg-dark_brown"
          >
            <span className="block h-full w-full bg-transparent"></span>
          </label>
          <span>Keep this recipe secret, so only you can see it.</span>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button type="submit" className="chocolate-button">
            Create Recipe
          </button>
        </div>
      </form>
    </main>
  );
};

export default NewRecipeForm;
