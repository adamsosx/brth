import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "brtH Breathing Exercises",
  description: "Mindful breathing exercises for peace and balance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-sage-50 to-sage-100 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
