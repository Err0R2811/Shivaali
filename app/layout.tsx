import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { CartProvider } from "@/lib/cart-context";
import { ThemeProvider } from "@/lib/theme-context";
import { CartDrawer } from "@/components/cart/cart-drawer";

export const metadata: Metadata = {
  title: "Shivaali | Premium Indian Ethnic Fashion",
  description: "Discover the elegance of traditional Indian ethnic wear - Handcrafted Sarees, Lehengas, Kurtis & more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('shivaali-theme');
                  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <CartDrawer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}