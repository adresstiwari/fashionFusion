import { toast } from 'react-hot-toast';

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
  
  switch (type) {
    case 'success':
      toast.success(message);
      break;
    case 'error':
      toast.error(message);
      break;
    case 'warning':
      toast(message, {
        icon: '⚠️',
        style: {
          background: '#FFEDC5',
          color: '#8A6D3B',
        },
      });
      break;
    case 'info':
      toast(message);
      break;
    default:
      toast(message);
  }
  
  // Remove from active set after duration
  setTimeout(() => {
    activeNotifications.delete(notificationKey);
  }, type === 'error' ? 4000 : 3000);
};

export default showNotification;