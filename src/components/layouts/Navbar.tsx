import { SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
// import { redirect } from "next/navigation";

const Navbar = async () => {
  return (
    <div className="relative w-full h-20 shadow-md">
      <div className="absolute inset-0 bg-brown flex items-center justify-between px-8">
        <Link
          href="/"
          className="text-white text-lg font-semibold flex items-center hover:text-white"
        >
          <Image
            className="max-h-12"
            src="/icons/cooker.svg"
            alt="Logo"
            width={48}
            height={48}
          />{" "}
          Cooker&apos;s Book
        </Link>

        <nav className="flex-1 flex justify-end space-x-6 mx-5">
          <Link href="/" className="text-gray-200 hover:text-white">
            Home
          </Link>
          <Link href="/user_recipes" className="text-gray-200 hover:text-white">
            My Recipes
          </Link>
          <Link href="/profile" className="text-gray-200 hover:text-white">
            Profile
          </Link>
        </nav>

        <div className="flex space-x-4">
          <SignedIn>
            <Link href="/recipe/new">
              <button className="bg-dark_brown text-white hover:opacity-85 py-2 px-4 rounded-md">
                Add recipe
              </button>
            </Link>
            <SignOutButton>
              <button className="bg-white text-dark_brown hover:opacity-85 py-2 px-4 rounded-md">
                Logout
              </button>
            </SignOutButton>
          </SignedIn>

          <SignedOut>
            <Link
              href={"/sign-in"}
              className="bg-white text-dark_brown hover:opacity-75 py-2 px-4 rounded-md"
            >
              Sign In
            </Link>
          </SignedOut>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
