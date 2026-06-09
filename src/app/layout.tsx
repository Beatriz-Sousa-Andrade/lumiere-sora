import { Playfair_Display, Montserrat } from "next/font/google";
// @ts-ignore: CSS module import handled by Next.js
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Lumière Sora | Alta Perfumaria & Fragrâncias Exclusivas",
  description: "Explore a curadoria de luxo Lumière Sora. Fragrâncias premium francesas, notas raras e essências exclusivas que eternizam momentos e expressam sofisticação.",
} as const;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0A0A0A] font-sans">
        <CartProvider>
          <Header />
          <div className="flex-1 flex flex-col">
            {children}
          </div>
          <CartDrawer />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

