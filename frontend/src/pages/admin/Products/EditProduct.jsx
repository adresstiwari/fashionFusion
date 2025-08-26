import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { adminService } from '../../../services/adminService';
import { Upload, X } from 'lucide-react';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const EditProduct = () => {
  const { id } = useParams();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await adminService.getProduct(id);
        setImages(productData.images || []);
        setValue('name', productData.name);
        setValue('category', productData.category);
        setValue('description', productData.description);
        setValue('price', productData.price);
        setValue('stock', productData.stock);
        setValue('sizes', productData.sizes?.join(', ') || '');
        setValue('colors', productData.colors?.join(', ') || '');
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchProduct();
    }
  }, [id, setValue]);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    setUploading(true);
    try {
      const uploadedImages = await Promise.all(
        files.map(file => adminService.uploadImage(file))
      );
      setImages(prev => [...prev, ...uploadedImages]);
      toast.success('Images uploaded successfully!');
    } catch (error) {
      console.error('Image upload failed:', error);
      toast.error('Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const productData = {
        ...data,
        images: images,
        sizes: data.sizes.split(',').map(s => s.trim()),
        colors: data.colors.split(',').map(c => c.trim()),
      };
      await adminService.updateProduct(id, productData);
      toast.success('Product updated successfully!');
      navigate('/admin/products');
    } catch (error) {
      console.error('Product update failed:', error);
      toast.error('Failed to update product');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Product Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                {...register('name', { required: 'Name is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                {...register('description', { required: 'Description is required' })}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              ></textarea>
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <input
                type="text"
                {...register('category', { required: 'Category is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Price</label>
                <input
                  type="number"
                  step="0.01"
                  {...register('price', { required: 'Price is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Stock</label>
                <input
                  type="number"
                  {...register('stock', { required: 'Stock is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Product Images</h2>
          <div className="flex items-center space-x-4 mb-4">
            <label className="flex items-center justify-center px-4 py-2 border border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
              <Upload size={20} className="mr-2" />
              <span>{uploading ? 'Uploading...' : 'Upload Images'}</span>
              <input type="file" onChange={handleImageUpload} multiple className="hidden" />
            </label>
          </div>
          {images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <img src={image.url} alt={`Product ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Product Attributes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Sizes (comma separated)</label>
              <input
                {...register('sizes')}
                placeholder="S, M, L, XL"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Colors (comma separated)</label>
              <input
                {...register('colors')}
                placeholder="Red, Blue, Green"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
            disabled={submitting || uploading}
            className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-secondary transition-colors disabled:opacity-50"
          >
            {submitting ? 'Updating Product...' : 'Update Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;

// import React, { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { useParams, useNavigate } from 'react-router-dom';
// import { adminService } from '../../../services/adminService';
// import { Upload, X } from 'lucide-react';
// import LoadingSpinner from '../../../components/common/LoadingSpinner';
// import toast from 'react-hot-toast';

// const EditProduct = () => {
//   const { id } = useParams();
//   const { register, handleSubmit, formState: { errors }, setValue } = useForm();
//   const [product, setProduct] = useState(null);
//   const [images, setImages] = useState([]);
//   const [uploading, setUploading] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const productData = await adminService.getProduct(id);
//         setProduct(productData);
//         setImages(productData.images || []);
        
//         // Set form values
//         setValue('name', productData.name);
//         setValue('category', productData.category);
//         setValue('description', productData.description);
//         setValue('price', productData.price);
//         setValue('originalPrice', productData.originalPrice || '');
//         setValue('stock', productData.stock);
//         setValue('sizes', productData.sizes?.join(', ') || '');
//         setValue('colors', productData.colors?.join(', ') || '');
//       } catch (error) {
//         console.error('Error fetching product:', error);
//         toast.error('Failed to fetch product');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchProduct();
//     }
//   }, [id, setValue]);

//   const handleImageUpload = async (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length === 0) return;

//     setUploading(true);
//     try {
//       const uploadedImages = await Promise.all(
//         files.map(file => adminService.uploadImage(file))
//       );
//       setImages(prev => [...prev, ...uploadedImages]);
//     } catch (error) {
//       toast.error('Failed to upload images');
//     } finally {
//       setUploading(false);
//     }
//   };

//   const removeImage = (index) => {
//     setImages(prev => prev.filter((_, i) => i !== index));
//   };

//   const onSubmit = async (data) => {
//     if (images.length === 0) {
//       toast.error('Please upload at least one image');
//       return;
//     }

//     setSubmitting(true);
//     try {
//       const productData = {
//         ...data,
//         price: parseFloat(data.price),
//         originalPrice: data.originalPrice ? parseFloat(data.originalPrice) : undefined,
//         stock: parseInt(data.stock),
//         images,
//         sizes: data.sizes ? data.sizes.split(',').map(s => s.trim()) : [],
//         colors: data.colors ? data.colors.split(',').map(c => c.trim()) : []
//       };

//       await adminService.updateProduct(id, productData);
//       toast.success('Product updated successfully');
//       navigate('/admin/products');
//     } catch (error) {
//       toast.error('Failed to update product');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return <LoadingSpinner />;
//   }

//   if (!product) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center">
//         <h2 className="text-2xl font-bold mb-4">Product not found</h2>
//         <p className="text-gray-600">The product you're looking for doesn't exist.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8">Edit Product</h1>
      
//       <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto space-y-6">
//         {/* Basic Information */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Product Name</label>
//               <input
//                 {...register('name', { required: 'Product name is required' })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//               />
//               {errors.name && (
//                 <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
//               )}
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium mb-1">Category</label>
//               <select
//                 {...register('category', { required: 'Category is required' })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//               >
//                 <option value="">Select Category</option>
//                 <option value="men">Men</option>
//                 <option value="women">Women</option>
//                 <option value="kids">Kids</option>
//                 <option value="accessories">Accessories</option>
//               </select>
//               {errors.category && (
//                 <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
//               )}
//             </div>
//           </div>
          
//           <div className="mt-4">
//             <label className="block text-sm font-medium mb-1">Description</label>
//             <textarea
//               rows={4}
//               {...register('description', { required: 'Description is required' })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//             ></textarea>
//             {errors.description && (
//               <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
//             )}
//           </div>
//         </div>

//         {/* Pricing & Inventory */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-xl font-semibold mb-4">Pricing & Inventory</h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Price ($)</label>
//               <input
//                 type="number"
//                 step="0.01"
//                 {...register('price', { 
//                   required: 'Price is required',
//                   min: { value: 0, message: 'Price must be positive' }
//                 })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//               />
//               {errors.price && (
//                 <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
//               )}
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium mb-1">Original Price ($)</label>
//               <input
//                 type="number"
//                 step="0.01"
//                 {...register('originalPrice')}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium mb-1">Stock Quantity</label>
//               <input
//                 type="number"
//                 {...register('stock', { 
//                   required: 'Stock is required',
//                   min: { value: 0, message: 'Stock cannot be negative' }
//                 })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//               />
//               {errors.stock && (
//                 <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Images */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-xl font-semibold mb-4">Product Images</h2>
          
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-2">Upload Images</label>
//             <div className="flex items-center justify-center w-full">
//               <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-colors">
//                 <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                   <Upload size={24} className="text-gray-400 mb-2" />
//                   <p className="text-sm text-gray-500">
//                     {uploading ? 'Uploading...' : 'Click to upload or drag and drop'}
//                   </p>
//                 </div>
//                 <input
//                   type="file"
//                   multiple
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   className="hidden"
//                   disabled={uploading}
//                 />
//               </label>
//             </div>
//           </div>
          
//           {images.length > 0 && (
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {images.map((image, index) => (
//                 <div key={index} className="relative group">
//                   <img
//                     src={image.url}
//                     alt={`Product ${index + 1}`}
//                     className="w-full h-32 object-cover rounded-lg"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => removeImage(index)}
//                     className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
//                   >
//                     <X size={16} />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Attributes */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-xl font-semibold mb-4">Product Attributes</h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Sizes (comma separated)</label>
//               <input
//                 {...register('sizes')}
//                 placeholder="S, M, L, XL"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium mb-1">Colors (comma separated)</label>
//               <input
//                 {...register('colors')}
//                 placeholder="Red, Blue, Green"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//               />
//             </div>
//           </div>
//         </div>

//         <div className="flex justify-end space-x-4">
//           <button
//             type="button"
//             onClick={() => navigate('/admin/products')}
//             className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={submitting || uploading}
//             className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-secondary transition-colors disabled:opacity-50"
//           >
//             {submitting ? 'Updating Product...' : 'Update Product'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditProduct;