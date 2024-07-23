import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Leader Consulting POA Generator",
  description: "Generate POA",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className=" h-screen ">
        {children}
        </div>
      </body>
    </html>
  );
}
