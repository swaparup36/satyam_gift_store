"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Upload } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { productType } from '@/lib/types';
import { categories } from '@/lib/constants';
import { allProducts } from '@/lib/products';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import uploadProductImages from '@/utils/uploader';


const AdminProductEdit = () => {
  const path = usePathname();
  const router = useRouter();
  const productId = path.split("/")[path.split("/").length - 1];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [product, setProduct] = useState<productType | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);


  const fetchProduct = async (): Promise<productType | null> => {
    try {
      const getProductRes = await axios.post("/api/get-product-by-id", { id: productId });

      if(!getProductRes.data.success){
        toast.warn(`can not get product: ${getProductRes.data.message}`);
        return null
      }

      return getProductRes.data.requiredProduct;
    } catch (error) {
      toast.warn(`can not get product: ${error}`);
      return null
    }
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminToken');
    if (!isAuthenticated) {
      router.push('/admin/login');
    }
    const loadProduct = async () => {
      if (productId) {
        try {
          const productData = await fetchProduct();
          if(productData) {
            setProduct(productData);
            setPreviewUrl(productData.image);
          }
        } catch (error) {
          console.error('Error loading product:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadProduct();
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    setIsSubmitting(true);
    // Here you would typically update the product via your API
    console.log('Updated product data:', product);

    try {
      if(!file){
        setIsSubmitting(false);
        return toast.warn("product image is not provided");
      }

      const formData = new FormData();
      formData.append('file', file);
      const imgUploadRes = await uploadProductImages(formData);
      const imgUploadResObj = JSON.parse(imgUploadRes);

      if(!imgUploadResObj.success) {
        setIsSubmitting(false);
        return toast.warn(`can not add product: ${imgUploadResObj.message}`);
      }


      const editProductResponse = await axios.post("/api/edit-product", {
        ...product,
        image: imgUploadResObj.imageURL
      });

      if(!editProductResponse.data.success){
        setIsSubmitting(false);
        toast.error(`can not edit product: ${editProductResponse.data.message}`);
      }

      toast.success("product edited successfully");
      setIsSubmitting(false);
      setTimeout(() => {
        router.push("/admin/all-products");
      }, 2000);
    } catch (error) {
      toast.error(`can not edit product: ${error}`);
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (!product) return;
    
    const { name, value } = e.target;
    setProduct(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        [name]: name === 'price' || name === 'discountedPrice' ? parseFloat(value) : value
      };
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && product) {
      setFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setProduct({
        ...product,
        image: file.name // This would be the uploaded image URL in production
      });
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/') && product) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setProduct({
        ...product,
        image: file.name
      });
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-40 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <p className="text-red-500">Product not found</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-4 mb-8 text-sm">
          <Link href="/" className="text-gray-500 hover:text-gray-700 flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>
        </nav>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Edit Product</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={product.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-[#C17777] focus:border-[#C17777]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  required
                  value={product.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-[#C17777] focus:border-[#C17777]"
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Regular Price (₹) *
                </label>
                <input
                  type="number"
                  name="price"
                  required
                  min="0"
                  step="0.01"
                  value={product.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-[#C17777] focus:border-[#C17777]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discounted Price (₹)
                </label>
                <input
                  type="number"
                  name="discountedPrice"
                  min="0"
                  step="0.01"
                  value={product.discountedPrice}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-[#C17777] focus:border-[#C17777]"
                />
              </div>
            </div>

            {/* Current Image and Upload New Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Image
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Current Image */}
                <div className="border rounded-md p-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Current Image</h3>
                  <Image
                    src={previewUrl}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md"
                    width={500}
                    height={500}
                  />
                </div>

                {/* Upload New Image */}
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-[#C17777] transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    Upload new image
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Description *
              </label>
              <textarea
                name="description"
                required
                value={product.description}
                onChange={handleChange}
                rows={10}
                className="w-full px-4 py-2 border rounded-md focus:ring-[#C17777] focus:border-[#C17777]"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <Link
                href="/admin/all-products"
                className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className={`px-6 py-2 rounded-md transition-colors ${isSubmitting ? 'bg-[#e8a6a6] text-white cursor-not-allowed' : 'bg-[#C17777] text-white hover:bg-[#a66565]'}`}
                disabled={isSubmitting}
              >
                {
                  isSubmitting ? "Saving..." : "Save Changes"
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminProductEdit;