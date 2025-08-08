import { Outfit,  Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});



const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight:"200"
});


export const metadata = {
  title: "TopGear58",
  description: "A Vip Auto Repair shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="root">
      <body
        className={`${outfit.variable}  ${poppins.variable} antialiased`}
      >
        <Toaster richColors position="bottom-center"/>
        <Analytics/>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
