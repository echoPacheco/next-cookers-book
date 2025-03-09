import { NextResponse } from "next/server";
import { addRecipe } from "@/services/recipeService";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();

    const result = await addRecipe(formData, userId);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error adding recipe:", error);
    return NextResponse.json(
      { error: "Failed to add recipe" },
      { status: 500 },
    );
  }
}
