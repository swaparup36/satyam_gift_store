"use client";


import ProductCard from '@/components/ProductCard';
import { productType } from '@/lib/types';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function FeatureProducts() {
  const [featureProducts, SetFeatureProducts] = useState<productType[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getFeaturedProducts = async() => {
      setIsLoading(true);
      try {
        const getAllProductsResponse = await axios.get("/api/get-all-products");
  
        if(!getAllProductsResponse.data.success){
          setIsLoading(false);
          return console.log(`can fetch all products: ${getAllProductsResponse.data.message}`);
        }
  
        SetFeatureProducts(getAllProductsResponse.data.allProducts);
        setIsLoading(false);
      } catch (error) {
        console.log(`can fetch all products: ${error}`);
        setIsLoading(false);
      }
  }

  useEffect(() => {
    getFeaturedProducts();
  }, []);

  return (
    <section className="py-24 bg-[#FFF5E6]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-['Playfair_Display']">
              Featured items
            </h2>
            <div className="flex justify-center items-center gap-4">
              <div className="h-px bg-[#B8860B]/30 w-20"></div>
              <div className="w-2 h-2 rounded-full bg-[#B8860B]"></div>
              <div className="h-px bg-[#B8860B]/30 w-20"></div>
            </div>
          </div>

          {
            isLoading ? (
              <div className='flex w-full justify-center items-center'>
                <p className='text-gray-500'>Loading...</p>
              </div>
            ) : (
                featureProducts ? (
                    featureProducts.map((product) => (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"  key={product.id}>
                        <div>
                            <ProductCard {...product} />
                        </div>
                      </div>  
                    ))
                ) : (
                    <div className='flex justify-center items-center w-full'>
                        <p className='text-gray-500'>no feature products</p>
                    </div>
                )
            )
          }
        </div>
      </section>
  )
}

export default FeatureProducts;