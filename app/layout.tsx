import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Emplois & Stages  pour étudiants et jeunes diplômés",
  description:
    "Une plateforme numérique novatrice et inclusive qui transforme la manière dont les jeunes dipômés Guinéens accèdent à des opportinités stages locaux pertinant.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="fr">
        <body className={inter.className}>
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
