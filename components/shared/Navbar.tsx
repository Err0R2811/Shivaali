import Link from 'next/link';
import { ShoppingBag, Menu, Search } from 'lucide-react';
import { Button } from '../ui/button';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Mobile Menu */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-playfair text-2xl font-bold tracking-tight text-primary">
            Rivaaj
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          <Link href="/sarees" className="text-sm font-medium transition-colors hover:text-primary">Sarees</Link>
          <Link href="/lehengas" className="text-sm font-medium transition-colors hover:text-primary">Lehengas</Link>
          <Link href="/kurtis" className="text-sm font-medium transition-colors hover:text-primary">Kurtis</Link>
          <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">Our Story</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <ShoppingBag className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
