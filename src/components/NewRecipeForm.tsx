"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UnitType } from "@/types/recipe";
import { Category } from "@/types/category";

const NewRecipeForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [ingredients, setIngredients] = useState([
    { name: "", quantity: "", unit_type: "g" as UnitType },
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

  const handleAddIngredient = () => {
    setIngredients([
      ...ingredients,
      { name: "", quantity: "", unit_type: "g" as UnitType },
    ]);
  };

  const handleIngredientChange = (
    index: number,
    field: keyof (typeof ingredients)[0],
    value: string
  ) => {
    setIngredients(
      ingredients.map((ing, i) =>
        i === index ? { ...ing, [field]: value } : ing
      )
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
      const response = await fetch("/api/recipes", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (response.ok) {
        console.log("Recipe created successfully!");
        router.push("/");
      } else {
        console.error("Failed to create recipe.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <main className="max-w-4xl text-dark_brown mx-auto my-8 px-4">
      <h1 className="font-kalam text-4xl font-bold mb-6">
        Create a New Recipe
      </h1>
      <form onSubmit={handleSubmit}>
        {/* Recipe Name */}
        <div className="mb-4">
          <label className="block">Recipe Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded w-full py-2 px-3"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded w-full py-2 px-3"
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded w-full py-2 px-3"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Privacy Setting */}
        <div className="mb-4">
          <label className="block">Private Recipe</label>
          <input
            type="checkbox"
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
          />
        </div>

        {/* Ingredients */}
        <div className="mb-4">
          <label className="block">Ingredients</label>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex space-x-4 mb-2">
              <input
                type="text"
                placeholder="Ingredient Name"
                value={ingredient.name}
                onChange={(e) =>
                  handleIngredientChange(index, "name", e.target.value)
                }
                className="border rounded py-2 px-3 w-full"
              />
              <input
                type="number"
                placeholder="Quantity"
                value={ingredient.quantity}
                onChange={(e) =>
                  handleIngredientChange(index, "quantity", e.target.value)
                }
                className="border rounded py-2 px-3 w-full"
              />
              <select
                value={ingredient.unit_type}
                onChange={(e) =>
                  handleIngredientChange(index, "unit_type", e.target.value)
                }
                className="border rounded py-2 px-3 w-full"
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
            <textarea
              key={index}
              value={instruction}
              onChange={(e) =>
                setInstructions(
                  instructions.map((ins, i) =>
                    i === index ? e.target.value : ins
                  )
                )
              }
              placeholder={`Step ${index + 1}`}
              className="border rounded w-full py-2 px-3 mb-2"
            />
          ))}
          <button
            type="button"
            onClick={handleAddInstruction}
            className="chocolate-button"
          >
            Add Instruction
          </button>
        </div>

        {/* Recipe Image */}
        <div className="mb-4">
          <label className="block">Recipe Image</label>
          <input
            type="file"
            onChange={(e) =>
              setRecipePic(e.target.files ? e.target.files[0] : null)
            }
            className="border rounded py-2 px-3"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="chocolate-button">
          Create Recipe
        </button>
      </form>
    </main>
  );
};

export default NewRecipeForm;
