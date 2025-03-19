import { SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const Navbar = async () => {
  return (
    <>
      {/* Navbar Desktop */}
      <div className="hidden h-20 w-full items-center justify-between bg-brown px-8 shadow-md md:flex">
        <Link
          href="/"
          className="flex items-center text-lg font-semibold text-white hover:text-white"
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

        <nav className="mx-5 flex flex-1 justify-end space-x-6">
          <Link href="/" className="text-gray-200 hover:text-white">
            Home
          </Link>
          <Link href="/myRecipes" className="text-gray-200 hover:text-white">
            My Recipes
          </Link>
          <Link href="/profile" className="text-gray-200 hover:text-white">
            Profile
          </Link>
        </nav>

        <div className="flex space-x-4">
          <SignedIn>
            <Link href="/recipe">
              <button className="rounded-md bg-dark_brown px-4 py-2 text-white hover:opacity-85">
                Add recipe
              </button>
            </Link>
            <SignOutButton>
              <button className="rounded-md bg-white px-4 py-2 text-dark_brown hover:opacity-85">
                Logout
              </button>
            </SignOutButton>
          </SignedIn>

          <SignedOut>
            <Link
              href={"/sign-in"}
              className="rounded-md bg-white px-4 py-2 text-dark_brown hover:opacity-75"
            >
              Sign In
            </Link>
          </SignedOut>
        </div>
      </div>

      {/* Navbar Mobile */}
      <div className="fixed bottom-0 z-50 flex w-full justify-around bg-light_brown py-3 text-black shadow-md md:hidden">
        <Link href="/" className="flex flex-col items-center gap-1">
          <Image src="/icons/home.svg" alt="Home" width={24} height={24} />
          <span className="text-xs">Home</span>
        </Link>

        <Link href="/search" className="flex flex-col items-center gap-1">
          <Image
            src="/icons/search.svg"
            alt="Magnifying Glass"
            width={24}
            height={24}
          />
          <span className="text-xs">Search</span>
        </Link>

        <Link href="/myRecipes" className="flex flex-col items-center gap-1">
          <Image
            src="/icons/heart.svg"
            alt="Heart Icon"
            width={24}
            height={24}
          />
          <span className="text-xs">Favorites</span>
        </Link>

        <Link href="/recipe" className="flex flex-col items-center gap-1">
          <Image src="/icons/add.svg" alt="Plus icon" width={24} height={24} />
          <span className="text-xs">Create</span>
        </Link>

        <Link href="/profile" className="flex flex-col items-center gap-1">
          <Image src="/icons/user.svg" alt="Profile" width={24} height={24} />
          <span className="text-xs">Profile</span>
        </Link>
      </div>
    </>
  );
};

export default Navbar;
