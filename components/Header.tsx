/* eslint-disable @next/next/no-img-element */
'use client';
import Link from 'next/link';
import { totalItems } from '@/store/cartStore';
import { useSignalValue } from '@/hooks/useSignalValue';
import { useState, useEffect } from 'react';
import { Search, User, Heart, ShoppingCart, Menu } from 'lucide-react';
import { Input } from '@/components/ui/input';

const categories = [
  { id: 1, label: 'Electronics' },
  { id: 2, label: 'Jewelery' },
  { id: 3, label: "Men's Clothing" },
  { id: 4, label: "Women's Clothing" },
];

const links = [
  { id: 1, label: 'New Drops' },
  { id: 2, label: 'Men' },
  { id: 3, label: 'Women' },
];

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const itemsCount = useSignalValue(totalItems);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <header className="bg-white">
      <div className="container mx-auto px-4 py-2 hidden lg:flex justify-between items-center">
        <Link href="/" className="flex self-end">
          <img
            src="/Icons/DEVELOPER TEST - Logo Black.png"
            alt="Logo"
            height="98"
            className="mr-2 h-24 w-auto object-contain"
          />
        </Link>

        <div className="text-uppercase font-semibold uppercase">
          <nav>
            <ul className="flex gap-4">
              {categories.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/category/${c.id}`}
                    className="block py-3 text-brand-dark hover:opacity-75"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div>
          <div className="flex items-center gap-3">

            <Link href="#" className="text-brand-dark">
              <User className="w-6 h-6" />
            </Link>

            <Link href="#" className="text-brand-dark">
              <Heart className="w-6 h-6" />
            </Link>

            <Link href="/cart" className="relative text-brand-dark">
              <ShoppingCart className="w-6 h-6" />
              {mounted && itemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-gold text-dark text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      <nav className="bg-white lg:hidden border-t">
        
        <div className="container mx-auto px-4 py-3">
            <div className="flex justify-between items-center">
                <Link href="/" className="navbar-brand">
                    <img src="/Icons/DEVELOPER TEST - Logo Black.png" className="h-[90px] w-auto" alt="Logo" />
                </Link>

                <div className="flex items-center gap-3">
                    <div className="flex gap-3">
                        <Link href="#">
                            <User className="w-6 h-6 text-brand-dark" />
                        </Link>
                        <Link href="#">
                            <Heart className="w-6 h-6 text-brand-dark" />
                        </Link>
                        <Link href="/cart" className="relative text-brand-dark">
                            <ShoppingCart className="w-6 h-6" />
                            {mounted && itemsCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-brand-gold text-dark text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {itemsCount}
                                </span>
                            )}
                        </Link>
                    </div>

                    <button
                        className="p-2 border rounded"
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                    >
                        <Menu className="w-6 h-6 text-brand-dark" />
                    </button>
                </div>
            </div>

            {isMobileOpen && (
                <div className="mt-3">
                    <ul className="mb-3 flex flex-col gap-2">
                        {links.map((link) => (
                            <li key={link.id}>
                                <Link href="#" className="block py-2">{link.label}</Link>
                            </li>
                        ))}
                    </ul>

                    <h6 className="font-bold mb-2">Categories</h6>
                    <ul className="mb-3 flex flex-col gap-2">
                        {categories.map((c) => (
                            <li key={c.id}>
                                <Link href={`/category/${c.id}`} className="block py-2">{c.label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
      </nav>
    </header>
  );
}
