import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="font-playfair text-2xl font-bold text-primary">Rivaaj</h3>
            <p className="text-sm text-muted-foreground">
              Discover the elegance of traditional Indian ethnic wear. Curated with love, crafted for perfection.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/sarees" className="hover:text-foreground transition-colors">Sarees</Link></li>
              <li><Link href="/lehengas" className="hover:text-foreground transition-colors">Lehengas</Link></li>
              <li><Link href="/kurtis" className="hover:text-foreground transition-colors">Kurtis</Link></li>
              <li><Link href="/new-arrivals" className="hover:text-foreground transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider">Help</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact Us</Link></li>
              <li><Link href="/shipping" className="hover:text-foreground transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/faq" className="hover:text-foreground transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Email: hello@rivaaj.com</li>
              <li>Phone: +91 98765 43210</li>
              <li>Address: Mumbai, Maharashtra</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Rivaaj. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
