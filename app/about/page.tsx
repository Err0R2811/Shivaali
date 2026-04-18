import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Our Story - Shivaali",
  description: "Handcrafted ethnic wear from India's finest artisans",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero-saree.png"
          alt="Traditional Indian Saree"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
        
        <div className="relative z-10 container mx-auto px-4 lg:px-8">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Our Story
          </h1>
          <p className="text-lg text-white/80 max-w-xl">
            Preserving tradition, celebrating craft
          </p>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              A Legacy of Craftsmanship
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Shivaali was born from a simple belief: that every thread tells a story. 
              Founded with a mission to bring the timeless elegance of Indian ethnic 
              wear to modern women across the world, we work directly with skilled 
              artisans from Varanasi, Banaras, Surat, and other legendary textile 
              centers of India.
            </p>

            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4 mt-12">
              Our Craft
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Each piece in our collection is a testament to generations of expertise. 
              From the intricate zari work of Banarasi silk to the graceful drapes of 
              Kanjivaram, we curate only the finest examples of Indian textile art. 
              Our artisans use traditional techniques passed down through generations, 
              ensuring authenticity in every fold.
            </p>

            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4 mt-12">
              Our Promise
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We promise authentic craftsmanship, premium quality, and fair trade. 
              Every purchase supports traditional artisans and their families, 
              helping preserve these ancient arts for future generations.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Authentic",
                desc: "Handcrafted by verified artisans using traditional techniques",
              },
              {
                title: "Sustainable",
                desc: "Supporting fair trade and preserving Indian textile heritage",
              },
              {
                title: "Premium Quality",
                desc: "Only the finest silks, zari, and embroidery materials",
              },
            ].map((item) => (
              <div key={item.title} className="text-center p-8">
                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}