import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/ui/navbar";
import Footer from "./_components/ui/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Oyekanmi Boluwatife Portfolio",
  description:
    "Welcome to Oyekanmi Boluwatife's Project house. This portfolio housed the whole projects from Oyekanmi Boluwatife. It consist of Website design and Website development and Mobile Application developpment. I build Mobile app and interactive web interface for a living.",
  icons: {
    icon: "/favicon.png", // /public path
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-black text-white h-full ${inter.className}`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
