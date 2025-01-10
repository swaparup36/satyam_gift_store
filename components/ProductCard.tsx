"use client";

import Image from 'next/image';
import React from 'react';
import RatingStars from './RatingStars';
import { productType } from '@/lib/types';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

function ProductCard( product: productType ) {
  const router = useRouter();

  const handleViewProduct = () => {
    router.push(`/product-details/${product.id}`);
  }

  return (
    <>
        <div className="group">
                <div className="relative aspect-square overflow-hidden bg-white rounded-lg mb-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    height={500}
                    width={500}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button onClick={handleViewProduct} className="bg-white text-[#B8860B] hover:bg-[#B8860B] hover:text-white transition-colors">
                      Quick View
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900 group-hover:text-[#B8860B] transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-[#B8860B]">
                      ₹{product.price}
                    </span>
                    {product.discountedPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ₹{product.price}
                      </span>
                    )}
                  </div>
                  <RatingStars rating={product.rating} />
                </div>
              </div>
    </>
  )
}

export default ProductCard