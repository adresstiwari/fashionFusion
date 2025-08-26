import { Toaster, toast } from 'react-hot-toast';

// Track active notifications to prevent duplicates
const activeNotifications = new Set();

export const showNotification = (message, type = 'success') => {
  // Create a unique key for this notification
  const notificationKey = `${type}-${message}`;
  
  // Skip if this notification is already active
  if (activeNotifications.has(notificationKey)) {
    return;
  }
  
  activeNotifications.add(notificationKey);
  
  const toastOptions = {
    duration: 3000,
    style: {
      background: '#363636',
      color: '#fff',
    },
    success: {
      duration: 3000,
      iconTheme: {
        primary: '#10B981',
        secondary: '#fff',
      },
    },
    error: {
      duration: 4000,
      iconTheme: {
        primary: '#EF4444',
        secondary: '#fff',
      },
    },
  };

  const toastId = toast[type](message, toastOptions);
  
  // Remove from active set when toast completes
  setTimeout(() => {
    activeNotifications.delete(notificationKey);
  }, type === 'error' ? 4000 : 3000);
  
  return toastId;
};

const Notification = () => {
  return (
    <Toaster 
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: '#363636',
          color: '#fff',
        },
        success: {
          duration: 3000,
          iconTheme: {
            primary: '#10B981',
            secondary: '#fff',
          },
        },
        error: {
          duration: 4000,
          iconTheme: {
            primary: '#EF4444',
            secondary: '#fff',
          },
        },
      }}
    />
  );
};

export default Notification;