import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { allProducts } from '@/lib/products';
import { Gift, ArrowRight, Package, HeadphonesIcon, MessageSquare, PartyPopper } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import FeatureProducts from './FeatureProducts';

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-b from-[#FFF5E6] to-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1604548738669-d4e6c5666dc4')] bg-cover bg-center opacity-5" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-[#FFF5E6] rounded-full">
                <Gift className="h-5 w-5 text-[#B8860B] mr-2" />
                <span className="text-sm font-medium text-[#B8860B]">Handcrafted with Love</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
                Discover Unique
                <span className="block text-[#B8860B] mt-2">Indian Gifts</span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-2xl">
                Experience the beauty of traditional Indian craftsmanship blended with modern design. Each piece tells a story of heritage and elegance.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href='/shop' className="bg-[#B8860B] hover:bg-[#8B6914] text-white px-8 py-6 text-lg flex items-center h-5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md justify-center">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Button variant="outline" className="border-[#B8860B] text-[#B8860B] hover:bg-[#FFF5E6] px-8 py-6 text-lg">
                  Learn More
                </Button>
              </div>
              
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div>
                  <h4 className="text-2xl font-bold text-gray-900">1000+</h4>
                  <p className="text-gray-600">Unique Products</p>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-gray-900">5000+</h4>
                  <p className="text-gray-600">Happy Customers</p>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-gray-900">15+</h4>
                  <p className="text-gray-600">Years Experience</p>
                </div>
              </div>
            </div>
            
            {/* Image */}
            <div className="relative md:block hidden">
              <div className="aspect-square rounded-full bg-[#FFF5E6] overflow-hidden">
                <Image
                  src="/images/hero.jpg"
                  alt="Handcrafted Indian Gifts"
                  className="object-cover w-full h-full transform scale-90"
                  width={800}
                  height={800}
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-xl p-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 rounded-full p-2">
                    <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Free Delivery</p>
                    <p className="text-sm text-gray-500">On orders above ₹999</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#E6E8FF] mb-6">
                <Package className="h-8 w-8 text-[#B8860B]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Delivering quality gifts
              </h3>
              <p className="text-gray-600">
                Carefully curated and beautifully packaged gifts for your special moments
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FFF5E6] mb-6">
                <PartyPopper className="h-8 w-8 text-[#B8860B]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Gifts for all occasions
              </h3>
              <p className="text-gray-600">
                Perfect presents for birthdays, weddings, festivals, and special celebrations
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FFE6E6] mb-6">
                <HeadphonesIcon className="h-8 w-8 text-[#B8860B]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Great customer service
              </h3>
              <p className="text-gray-600">
                Dedicated support team to help you find the perfect gift
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items Section */}
      <FeatureProducts />

      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-center">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="inline-block mb-6">
                <div className="w-16 h-16 rounded-full bg-[#E6E8FF] flex items-center justify-center">
                  <Package className="h-8 w-8 text-[#B8860B]" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Delivering quality gifts
              </h3>
              <p className="text-gray-500">
                information on its origins
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="inline-block mb-6">
                <div className="w-16 h-16 rounded-full bg-[#FFF5E6] flex items-center justify-center">
                  <MessageSquare className="h-8 w-8 text-[#B8860B]" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Gifts for all occasions
              </h3>
              <p className="text-gray-500">
                Variants and technical
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="inline-block mb-6">
                <div className="w-16 h-16 rounded-full bg-[#FFE6E6] flex items-center justify-center">
                  <PartyPopper className="h-8 w-8 text-[#B8860B]" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Great customer service
              </h3>
              <p className="text-gray-500">
                random Lipsum generator
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}