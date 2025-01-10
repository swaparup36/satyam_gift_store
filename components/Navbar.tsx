'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-md fixed w-full z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-[#B8860B]">सत्यम्</span>
            <span className="ml-2 text-xl font-semibold text-gray-800">Satyam</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-[#B8860B] transition-colors">
              Home
            </Link>
            <Link href="/shop" className="text-gray-700 hover:text-[#B8860B] transition-colors">
              Shop
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-[#B8860B] transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-[#B8860B] transition-colors">
              Contact
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5 text-gray-700" />
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-5 w-5 text-gray-700" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-[#B8860B] transition-colors">
                Home
              </Link>
              <Link href="/shop" className="block px-3 py-2 text-gray-700 hover:text-[#B8860B] transition-colors">
                Shop
              </Link>
              <Link href="/about" className="block px-3 py-2 text-gray-700 hover:text-[#B8860B] transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="block px-3 py-2 text-gray-700 hover:text-[#B8860B] transition-colors">
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}