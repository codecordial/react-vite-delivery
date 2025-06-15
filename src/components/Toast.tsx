import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 transform transition-all duration-300 ease-in-out">
        <CheckCircle size={20} className="flex-shrink-0" />
        <span className="font-medium">{message}</span>
        <button 
          onClick={onClose}
          className="ml-auto hover:bg-red-800 rounded-full p-1 transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default Toast;