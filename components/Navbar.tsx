'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-md fixed w-full z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center w-fit">
            <Image src="/logo.png" alt='logo' width={200} height={200} className='w-12 h-10' />
            <div className='ml-2 flex justify-center items-start flex-col'>
              <span className="text-xl font-semibold text-gray-800">Ambbera</span>
              <p className='text-xs'>Unwrap joy, and discover happiness</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-14 -ml-52">
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