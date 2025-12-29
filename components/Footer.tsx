/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { Facebook, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white pt-12 pb-5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center mb-3 justify-center md:justify-start">
              <img
                src="/Icons/DEVELOPER TEST - Logo.png"
                alt="Logo"
                height="200"
                className="mr-2 h-[200px] w-auto object-contain"
              />
            </div>
            <div className="flex gap-3 justify-center md:justify-start">
              <a href="https://facebook.com" target="_blank" rel="noopener">
                <Facebook className="w-6 h-6 text-brand-gold" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener">
                <Instagram className="w-6 h-6 text-brand-gold" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener">
                <Youtube className="w-7 h-7 text-brand-gold" />
              </a>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="col-span-1">
                <ul className="flex flex-col gap-4">
                  <li><Link href="/" className="hover:text-brand-gold">Home</Link></li>
                  <li><Link href="/" className="hover:text-brand-gold">About Us</Link></li>
                  <li><Link href="/" className="hover:text-brand-gold">Media Center</Link></li>
                  <li><Link href="/" className="hover:text-brand-gold">Contact Us</Link></li>
                </ul>
              </div>
              <div className="col-span-1">
                <ul className="flex flex-col gap-4">
                  <li><Link href="/category/1" className="hover:text-brand-gold">Electronics</Link></li>
                  <li><Link href="/category/2" className="hover:text-brand-gold">Jewelery</Link></li>
                  <li><Link href="/category/3" className="hover:text-brand-gold">Men Clothing</Link></li>
                  <li><Link href="/category/4" className="hover:text-brand-gold">Women Clothing</Link></li>
                </ul>
              </div>
              <div className="col-span-2 md:col-span-1">
                <ul className="flex flex-col gap-4">
                  <li className="font-semibold mb-2 text-2xl">Contact us</li>
                  <li>+971 0000 0000</li>
                  <li>info@example.com</li>
                  <li>Dubai, UAE</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="border-gray-600 my-8" />
        <div className="text-center pb-3">
          © Developer Test 2025. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
