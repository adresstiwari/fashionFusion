import React, { useState, useEffect } from 'react';
import { userService } from '../../services/userService'; // Fixed import path
import { useAuth } from '../../context/AuthContext';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Modal from '../../components/common/Modal';
import AddressForm from '../../components/checkout/AddressForm';
import toast from 'react-hot-toast';

const Addresses = () => {
  const { user, updateProfile } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.addresses) {
      setAddresses(user.addresses);
    }
  }, [user]);

  const handleAddAddress = async (addressData) => {
    setLoading(true);
    try {
      const updatedAddresses = await userService.addAddress(addressData);
      setAddresses(updatedAddresses);
      updateProfile({ addresses: updatedAddresses });
      setIsModalOpen(false);
      toast.success('Address added successfully!');
    } catch (error) {
      toast.error('Failed to add address');
    } finally {
      setLoading(false);
    }
  };

  const handleEditAddress = async (addressData) => {
    setLoading(true);
    try {
      const updatedAddresses = await userService.updateAddress(editingAddress._id, addressData);
      setAddresses(updatedAddresses);
      updateProfile({ addresses: updatedAddresses });
      setEditingAddress(null);
      setIsModalOpen(false);
      toast.success('Address updated successfully!');
    } catch (error) {
      toast.error('Failed to update address');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    if (!window.confirm('Are you sure you want to delete this address?')) {
      return;
    }

    try {
      const updatedAddresses = await userService.deleteAddress(addressId);
      setAddresses(updatedAddresses);
      updateProfile({ addresses: updatedAddresses });
      toast.success('Address deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete address');
    }
  };

  const openAddModal = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const openEditModal = (address) => {
    setEditingAddress(address);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Addresses</h1>
        <button
          onClick={openAddModal}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-secondary transition-colors"
        >
          <Plus size={20} />
          <span>Add New Address</span>
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🏠</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No addresses yet</h3>
          <p className="text-gray-500">Add your first address to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {addresses.map((address) => (
            <div key={address._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-4">
                <h3 className="font-semibold text-lg mb-2">{address.name}</h3>
                <p className="text-gray-600">
                  {address.address}<br />
                  {address.city}, {address.state} {address.zipCode}<br />
                  {address.phone}
                </p>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => openEditModal(address)}
                  className="flex items-center text-primary hover:text-secondary"
                >
                  <Edit size={16} className="mr-1" />
                  Edit
                </button>
                
                <button
                  onClick={() => handleDeleteAddress(address._id)}
                  className="flex items-center text-red-600 hover:text-red-800"
                >
                  <Trash2 size={16} className="mr-1" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingAddress ? 'Edit Address' : 'Add New Address'}
      >
        <AddressForm
          onSubmit={editingAddress ? handleEditAddress : handleAddAddress}
          initialData={editingAddress}
        />
      </Modal>
    </div>
  );
};

export default Addresses;