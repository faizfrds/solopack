import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ModalProvider from "@/provider/ModalProvider";
import ToasterProvider from "@/provider/ToasterProvider";
import Providers from "@/components/Providers";
import Footer from "@/components/Footer";

const font = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["devanagari", "latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Solopack",
  description: "Find your next adventure",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Providers>
          <ToasterProvider />
          <ModalProvider />
          <Navbar>
            {children}
            <Footer />
          </Navbar>
        </Providers>
      </body>
    </html>
  );
}
