import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cooker's Book",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
