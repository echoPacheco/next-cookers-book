import Image from "next/image";
import { getUserByEmail } from "@/services/userService";
import ProfileForm from "@/components/ProfileForm";

export default async function Profile() {
  const email = "user@example.com"; // Substituir pelo e-mail do usuário autenticado
  const user = await getUserByEmail(email);

  return (
    <main className="flex h-screen">
      <Image
        src={"/images/food_background.webp"}
        alt="Food Background"
        width={128}
        height={128}
        // className="flex-1 bg-cover bg-center"
      />

      <div className="flex-1 text-center my-8">
        <h1 className="font-kalam text-4xl font-bold py-3">
          {user?.name || "User"}
        </h1>
        <div className="flex flex-col items-center">
          <Image
            className="size-32 rounded-full"
            src={user?.profile_pic || "/icons/user-circle.svg"}
            alt="Profile Preview"
            width={128}
            height={128}
          />
        </div>

        <ProfileForm user={user} />
      </div>
    </main>
  );
}
