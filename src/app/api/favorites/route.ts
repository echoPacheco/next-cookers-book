import { NextRequest, NextResponse } from "next/server";
import { getUserByClerkId, toggleFavoriteRecipe } from "@/services/userService";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const path = req.nextUrl.searchParams.get("path");
    const userClerk = await currentUser();
    if (!userClerk)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await getUserByClerkId(userClerk.id);
    const { recipeId } = await req.json();

    await toggleFavoriteRecipe(user._id, recipeId);

    if (path) {
      revalidatePath(path);
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in POST /api/favorites:", error);
    return NextResponse.json(
      { error: "Failed to add favorite" },
      { status: 500 },
    );
  }
}
