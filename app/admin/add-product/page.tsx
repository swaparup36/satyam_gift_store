"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Upload } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { productCategoryType, productType } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import uploadProductImages from '@/utils/uploader';



const AdminProductUpload = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [product, setProduct] = useState<Partial<productType>>({
    name: '',
    category: '',
    price: 0,
    discountedPrice: 0,
    image: '',
    description: '',
  });
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [allCategories, setAllCategories] = useState<productCategoryType[] | null>(null);


  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Product data:', product);
    setIsSubmitting(true);

    try {
      console.log(file)
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
        return toast.error(`can not add product: ${imgUploadResObj.error}`);
      }

      const addNewProductResponse = await axios.post("/api/post-product", {
        ...product,
        image: imgUploadResObj.imageURL
      });

      if(!addNewProductResponse.data.success) {
        setIsSubmitting(false);
        return toast.error(`can not add product: ${addNewProductResponse.data.message}`);
      }

      toast.success("product added successfully");
      setProduct({
        name: '',
        category: '',
        price: 0,
        discountedPrice: 0,
        image: '',
        description: '',
      });
      setIsSubmitting(false);
      setTimeout(() => {
        router.push("/admin/all-products");
      }, 2000);
    } catch (error) {
      toast.error(`can not add product: ${error}`);
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'discountedPrice' ? parseFloat(value) : value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Set file
      setFile(file);
      // Create a preview URL for the selected image
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      // In a real application, you would upload this file to your server
      // and get back a URL to store in the product.image field
      setProduct(prev => ({
        ...prev,
        image: file.name // This would be the uploaded image URL in production
      }));
    }
  };

  const handleRemoveImage = () => {
    setProduct({ ...product, image: "" });
    setPreviewUrl("");
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setProduct(prev => ({
        ...prev,
        image: file.name
      }));
    }
  };

  const getAllCategories = async () => {
    try {
        const categoriesRes = await axios.get('/api/get-all-categories');

        if(!categoriesRes.data.success) {
            toast.error(`can not fetch categories: ${categoriesRes.data.message}`);
        }

        setAllCategories(categoriesRes.data.categories);
    } catch (error) {
        toast.error(`can not fetch categories: ${error}`);
    }
  }

  useEffect(()=>{
    const isAuthenticated = localStorage.getItem('adminToken');
    if (!isAuthenticated) {
      router.push('/admin/login');
    }

    getAllCategories();
  }, []);

  return (
    <>
      <ToastContainer />

      <div className="max-w-4xl mx-auto px-4 py-24">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-4 mb-8 text-sm">
          <Link href="/admin/all-products" className="text-gray-500 hover:text-gray-700 flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>
        </nav>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold mb-8">Add New Product</h1>

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
                  {allCategories && allCategories.map(category => (
                    <option key={category.id} value={category.title}>{category.title}</option>
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
                rows={5}
                className="w-full px-4 py-2 border rounded-md focus:ring-[#C17777] focus:border-[#C17777]"
              />
            </div>

            {/* Image Upload */}
            {
              product.image === "" &&

              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Image *
                  </label>
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
                      multiple={false}
                  />
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                      Drag and drop your image here, or click to select a file
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                      PNG, JPG, GIF up to 5MB
                  </p>
                  </div>
              </div>
            }

            {/* Preview */}
            {previewUrl && (
              <div className="border rounded-md p-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Image Preview</h3>
                  <div className="group">
                      <div className="relative aspect-square overflow-hidden bg-white rounded-lg mb-4 h-48 w-48">
                          <Image
                              src={previewUrl}
                              alt="Product preview"
                              height={200}
                              width={200}
                              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Button onClick={handleRemoveImage} className="bg-white text-[#B8860B] hover:bg-[#B8860B] hover:text-white transition-colors">
                              Remove
                          </Button>
                          </div>
                      </div>
                  </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className={`px-6 py-2 rounded-md transition-colors ${isSubmitting ? 'bg-[#f5b0b0] text-white cursor-not-allowed' : 'bg-[#C17777] text-white hover:bg-[#a66565]'}`}
                disabled={isSubmitting}
              >
                {
                  isSubmitting ? "Adding..." : "Add Product"
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminProductUpload;