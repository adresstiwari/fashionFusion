import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../../../services/adminService';
import { Upload, X } from 'lucide-react';
import toast from 'react-hot-toast';

const AddProduct = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageUpload = async (e) => {
  const files = Array.from(e.target.files);
  if (files.length === 0) return;

  setUploading(true);
  try {
    // Create a FormData object for each file
    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file);
    });

    // Upload to your backend
    const response = await api.post('/upload/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    setImages(prev => [...prev, ...response.data]);
    addNotification({
      type: 'success',
      message: 'Images uploaded successfully!'
    });
  } catch (error) {
    console.error('Image upload failed:', error);
    addNotification({
      type: 'error',
      message: 'Failed to upload images'
    });
  } finally {
    setUploading(false);
  }
};

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formattedData = {
        ...data,
        price: parseFloat(data.price),
        originalPrice: data.originalPrice ? parseFloat(data.originalPrice) : undefined,
        stock: parseInt(data.stock, 10),
        images: images,
        sizes: data.sizes ? data.sizes.split(',').map(s => s.trim()) : [],
        colors: data.colors ? data.colors.split(',').map(c => c.trim()) : [],
      };
      
      await adminService.addProduct(formattedData);
      toast.success('Product added successfully!');
      reset();
      setImages([]);
      navigate('/admin/products');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to add product';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Add New Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
              <input
                id="name"
                {...register('name', { required: 'Product name is required' })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
              <input
                id="category"
                {...register('category', { required: 'Category is required' })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
              {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mt-4">Description</label>
            <textarea
              id="description"
              {...register('description', { required: 'Description is required' })}
              rows="4"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            ></textarea>
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
          </div>
        </div>

        {/* Pricing and Stock */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Pricing & Stock</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
              <input
                id="price"
                type="number"
                step="0.01"
                {...register('price', { required: 'Price is required', valueAsNumber: true })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
              {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>}
            </div>
            <div>
              <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700">Original Price (Optional)</label>
              <input
                id="originalPrice"
                type="number"
                step="0.01"
                {...register('originalPrice', { valueAsNumber: true })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
              <input
                id="stock"
                type="number"
                {...register('stock', { required: 'Stock is required', valueAsNumber: true })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
              {errors.stock && <p className="mt-1 text-sm text-red-600">{errors.stock.message}</p>}
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Product Images</h2>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <Upload size={48} className="mx-auto text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-secondary focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleImageUpload} />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
          {uploading && <p className="mt-2 text-sm text-center">Uploading...</p>}
          {images.length > 0 && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <img src={image.url} alt={`Product ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
                  <button type="button" onClick={() => removeImage(index)} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Attributes */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Product Attributes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="sizes" className="block text-sm font-medium text-gray-700">Sizes (comma separated)</label>
              <input
                id="sizes"
                {...register('sizes')}
                placeholder="S, M, L, XL"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="colors" className="block text-sm font-medium text-gray-700">Colors (comma separated)</label>
              <input
                id="colors"
                {...register('colors')}
                placeholder="Red, Blue, Green"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || uploading}
            className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-secondary transition-colors disabled:opacity-50"
          >
            {loading ? 'Adding Product...' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;