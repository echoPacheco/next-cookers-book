import { NextRequest, NextResponse } from "next/server";
import { getUserByClerkId, toggleFavoriteRecipe } from "@/services/userService";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const userClerk = await currentUser();
    if (!userClerk)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await getUserByClerkId(userClerk.id);
    const { recipeId } = await req.json();

    await toggleFavoriteRecipe(user._id, recipeId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in POST /api/favorites:", error);
    return NextResponse.json(
      { error: "Failed to add favorite" },
      { status: 500 },
    );
  }
}
