import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
// import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";

export const metadata: Metadata = {
  title: "Cooker's Book",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`antialiased pb-16`}>
          <Navbar />
          {children}
          {/* <Footer /> */}
        </body>
      </html>
    </ClerkProvider>
  );
}
