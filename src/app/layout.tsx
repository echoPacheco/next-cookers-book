import type { Metadata } from "next";
import { ClerkProvider, ClerkLoaded } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";

export const metadata: Metadata = {
  title: "Cooker's Book",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <ClerkLoaded>
        <html lang="en">
          <body className="pb-16 antialiased md:pb-0">
            <Navbar />
            {children}
          </body>
        </html>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
