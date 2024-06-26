import AuthProvider from "@/provider/AuthProvider";
import { Josefin_Sans } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";


const inter = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "700"]
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en" className="dark">
        <body className={inter.className}>
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
