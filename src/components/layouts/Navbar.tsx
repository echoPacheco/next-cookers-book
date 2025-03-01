import { SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const Navbar = async () => {
  return (
    <>
      {/* Navbar Desktop */}
      <div className="hidden md:flex w-full h-20 shadow-md bg-brown items-center justify-between px-8">
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
          />
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

      {/* Navbar Mobile */}
      <div className="fixed bottom-0 w-full md:hidden bg-light_brown text-black shadow-md flex justify-around py-3 z-50">
        <Link href="/" className="flex flex-col gap-1 items-center">
          <Image src="/icons/home.svg" alt="Home" width={24} height={24} />
          <span className="text-xs">Home</span>
        </Link>

        <Link href="/user_recipes" className="flex flex-col gap-1 items-center">
          <Image
            src="/icons/search.svg"
            alt="Magnifying Glass"
            width={24}
            height={24}
          />
          <span className="text-xs">Search</span>
        </Link>

        <Link href="/user_recipes" className="flex flex-col gap-1 items-center">
          <Image
            src="/icons/heart.svg"
            alt="Heart Icon"
            width={24}
            height={24}
          />
          <span className="text-xs">Favorites</span>
        </Link>

        <Link href="/profile" className="flex flex-col gap-1 items-center">
          <Image src="/icons/add.svg" alt="Plus icon" width={24} height={24} />
          <span className="text-xs">Create</span>
        </Link>

        <Link href="/profile" className="flex flex-col gap-1 items-center">
          <Image src="/icons/user.svg" alt="Profile" width={24} height={24} />
          <span className="text-xs">Profile</span>
        </Link>
      </div>
    </>
  );
};

export default Navbar;
