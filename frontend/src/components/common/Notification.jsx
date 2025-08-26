import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const Notification = ({ notification, onClose }) => {
  const { id, type, title, message, duration = 5000 } = notification;

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'info':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '💬';
    }
  };

  return (
    <div className={`${getBackgroundColor()} text-white rounded-lg shadow-lg p-4 mb-2 transform transition-all duration-300 ease-in-out animate-fadeIn`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          <span className="text-lg mr-2">{getIcon()}</span>
          <div className="flex-1">
            {title && <h4 className="font-semibold">{title}</h4>}
            <p className="text-sm">{message}</p>
          </div>
        </div>
        <button
          onClick={() => onClose(id)}
          className="ml-4 text-white hover:text-gray-200 transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default Notification;