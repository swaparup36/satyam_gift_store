"use client";


import React, { useEffect, useState } from 'react';
import { Share2, Star } from 'lucide-react';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import { usePathname } from 'next/navigation';
import { productReviewType, productType } from '@/lib/types';
import RatingStars from '@/components/RatingStars';
import Link from 'next/link';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import FeatureProducts from '@/app/FeatureProducts';
import * as dotenv from "dotenv";

dotenv.config();

const ProductReview = ({ rating, author, date, content }: { 
  rating: number;
  author: string;
  date: string;
  content: string;
}) => (
  <div className="border-b border-gray-200 py-8">
    <div className="flex items-center space-x-4 mb-4">
      <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-4 h-4 ${i < rating ? 'fill-current' : ''}`}
          />
        ))}
      </div>
      <div className="text-sm">
        <span className="font-medium text-gray-900">{author}</span>
        <span className="text-gray-500"> – {(new Date(date).getDate()).toString().padStart(2, '0')}/{(new Date(date).getMonth() + 1).toString().padStart(2, '0')}/{(new Date(date).getFullYear()).toString()}</span>
      </div>
    </div>
    <p className="text-gray-600">{content}</p>
  </div>
);

const ProductDetails = () => {
    const path = usePathname();
    const productId = path.split("/")[path.split("/").length - 1];

    const [productDetails, setProductDetails] = useState<productType | null>(null);
    const [reviews, setReviews] = useState<productReviewType[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [quantity, setQuantity] = useState<number>(0);
    const [activeTab, setActiveTab] = useState('description');

    const incrementQuantity = () => setQuantity(prev => prev + 1);
    const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

    const fetchProduct = async (): Promise<productType | null> => {
        setIsLoading(true);
        try {
          const getProductRes = await axios.post("/api/get-product-by-id", { id: productId });
    
          if(!getProductRes.data.success){
            toast.error(`can not get product: ${getProductRes.data.message}`);
            setIsLoading(false);
            return null;
          }

          setProductDetails(getProductRes.data.requiredProduct);
          setReviews(getProductRes.data.reviews);
          setIsLoading(false);
          return getProductRes.data.requiredProduct;
        } catch (error) {
          toast.error(`can not get product: ${error}`);
          setIsLoading(false);
          return null;
        }
      };

    const handleContactSeller = (productId: string | undefined) => {
        if(!productId) return console.log("product id not found");

        const encodedMessege = encodeURIComponent(`
            Hi, I want to purchase this product.

            Quantity: ${quantity}

            Product link - ${process.env.NEXT_PUBLIC_HOST_NAME}/product-details/${productId}
        `);

        window.open(`https://wa.me/${7439965656}?text=${encodedMessege}`, '_blank');
    }

    useEffect(()=>{
        fetchProduct();
    }, []);

    if (isLoading) {
        return (
          <div className="max-w-2xl mx-auto px-4 py-8 pt-24">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        );
    }

    if (!productDetails) {
        return (
          <div className="max-w-2xl mx-auto px-4 py-8 pt-24">
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
              Product not found
            </div>
          </div>
        );
    }

    return (
        <>
            <ToastContainer />

            <section className="max-w-7xl mx-auto px-4 py-8 pt-24">
            {/* Previous content remains the same until the end of Product Meta */}
            <nav className="text-sm mb-8">
                <ol className="flex items-center space-x-2 text-gray-500">
                <li><Link href="/" className="hover:text-gray-700">Home</Link></li>
                <li>›</li>
                <li><Link href="/shop" className="hover:text-gray-700">Products</Link></li>
                <li>›</li>
                <li className="text-gray-900">{productDetails?.name}</li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                {/* Product Image */}
                <div className="relative">
                <Image
                    src={productDetails ? productDetails.image : "/images/products/product3.jpg"}
                    alt="Encouragement Home Decor"
                    className="w-full rounded-lg"
                    width={800}
                    height={800}
                />
                </div>

                {/* Product Details */}
                <div>
                <h1 className="text-3xl font-bold mb-4">Encouragement Home Decor</h1>
                
                <div className="flex items-center space-x-4 mb-6">
                    <span className="text-3xl text-[#C17777]">₹{productDetails?.discountedPrice}</span>
                    <span className="text-gray-500 line-through">₹{productDetails?.price}</span>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-6">
                <RatingStars rating={productDetails?.rating ? productDetails?.rating : 0} />
                    <span className="text-gray-500">({reviews ? reviews.length : 0} customer reviews)</span>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-8">
                    {productDetails?.description.slice(0, 200) + "..."}
                </p>

                {/* Quantity and Add to Cart */}
                <div className="flex md:flex-row flex-col items-center space-x-4 mb-8">
                    <div className="flex items-center justify-between w-full mb-5 px-2">
                        <span className="mr-4">Quantity:</span>
                        <div className="flex border rounded">
                            <button 
                            onClick={decrementQuantity}
                            className="px-3 py-1 border-r hover:bg-gray-100"
                            >
                            -
                            </button>
                            <input
                            type="text"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="w-16 text-center"
                            />
                            <button 
                            onClick={incrementQuantity}
                            className="px-3 py-1 border-l hover:bg-gray-100"
                            >
                            +
                            </button>
                        </div>
                    </div>
                    
                    <div className='flex w-full justify-between items-center'>
                        <button onClick={() => handleContactSeller(productDetails?.id)} className="bg-gray-900 text-white md:px-6 py-2 rounded hover:bg-gray-800 w-full">
                            Contact Seller
                        </button>
                        
                        <button className="p-2 border rounded hover:bg-gray-50 mx-4 w-fit">
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Product Meta */}
                <div className="space-y-2 text-sm text-gray-600">
                    <p>SKU: <span className="text-gray-900">N/A-350</span></p>
                    <p>
                    Categories: {' '}
                    <a href="#" className="text-gray-900 hover:text-[#C17777]">Office & Stationery</a>,{' '}
                    <a href="#" className="text-gray-900 hover:text-[#C17777]">Personalised Gifts</a>
                    </p>
                    <p>
                    Tags: {' '}
                    <a href="#" className="text-gray-900 hover:text-[#C17777]">Classic</a>,{' '}
                    <a href="#" className="text-gray-900 hover:text-[#C17777]">Shoes</a>
                    </p>
                </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="border-t border-gray-200 pt-16">
                {/* Tabs */}
                <div className="flex border-b border-gray-200 mb-8">
                <button
                    className={`pb-4 px-8 font-medium ${
                    activeTab === 'description'
                        ? 'border-b-2 border-[#C17777] text-[#C17777]'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('description')}
                >
                    Description
                </button>
                <button
                    className={`pb-4 px-8 font-medium ${
                    activeTab === 'reviews'
                        ? 'border-b-2 border-[#C17777] text-[#C17777]'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('reviews')}
                >
                    Reviews ({reviews ? reviews.length : 0})
                </button>
                </div>

                {activeTab === 'reviews' && (
                <div className="max-w-3xl">
                    <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>
                    
                    {/* Individual Reviews */}
                    {
                        reviews ? (
                            reviews.map((review)=>(
                                <ProductReview
                                    key={review.id}
                                    rating={review.rating}
                                    author={review.author}
                                    date={review.date}
                                    content={review.content}
                                />
                            ))
                        ) : (
                            <p className='text-gray-600'>no reviews</p>
                        )
                    }


                </div>
                )}

                {activeTab === 'description' && (
                <div className="max-w-3xl prose prose-gray">
                    <h2 className="text-2xl font-bold mb-4">Product Description</h2>
                    {
                        productDetails?.description.split('\n').map((paragraph, index)=>(
                            <p key={index} className="text-gray-600 mb-4">
                                {paragraph}
                            </p>
                        ))
                    }
                </div>
                )}
            </div>

            {/* Featured Items Section */}
            <FeatureProducts />

            </section>
        </>
    );
};

export default ProductDetails;