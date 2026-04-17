import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden bg-primary/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1583391733958-d25e07fac04f?q=80&w=2574&auto=format&fit=crop" 
            alt="Traditional Indian Saree" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container relative z-20 px-4 flex flex-col items-center text-center">
          <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            Elegance in Every Thread
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl font-light">
            Discover our exclusive collection of luxury ethnic wear. Handcrafted for your most beautiful moments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8">
              Shop Collection
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 rounded-full px-8">
              Explore New Arrivals
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground">
              Shop by Category
            </h2>
            <Link href="/categories" className="flex items-center text-primary font-medium hover:underline">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Category 1 */}
            <Link href="/sarees" className="group relative h-[400px] overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=2574&auto=format&fit=crop" 
                alt="Sarees" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="font-playfair text-2xl font-semibold text-white">Sarees</h3>
                <p className="text-white/80 mt-2">Timeless Drapes</p>
              </div>
            </Link>

            {/* Category 2 */}
            <Link href="/lehengas" className="group relative h-[400px] overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=2583&auto=format&fit=crop" 
                alt="Lehengas" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="font-playfair text-2xl font-semibold text-white">Lehengas</h3>
                <p className="text-white/80 mt-2">Royal Ensembles</p>
              </div>
            </Link>

            {/* Category 3 */}
            <Link href="/kurtis" className="group relative h-[400px] overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1583391733975-c7e6c4ea557d?q=80&w=2574&auto=format&fit=crop" 
                alt="Kurtis" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="font-playfair text-2xl font-semibold text-white">Kurtis</h3>
                <p className="text-white/80 mt-2">Everyday Elegance</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
