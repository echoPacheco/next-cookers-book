import Image from "next/image";
import { getUserByClerkId } from "@/services/userService";
import ProfileForm from "@/components/ProfileForm";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Profile() {
  const userClerk = await currentUser();

  if (!userClerk || !userClerk.id) redirect("/sign-in");
  const user = await getUserByClerkId(userClerk.id);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:flex relative w-full h-60 md:h-auto justify-center items-center">
        <Image
          src="/images/food_background.webp"
          alt="Food Background"
          fill
          className="object-cover max-h-[400px] md:max-h-full"
        />
      </div>

      <div className="flex flex-col items-center justify-center text-center px-6 py-8">
        <h1 className="font-kalam text-4xl font-bold py-3">
          {user?.name || "User"}
        </h1>
        <ProfileForm user={user} />
      </div>
    </div>
  );
}
