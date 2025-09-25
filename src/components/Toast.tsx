import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

const icons = {
  success: <CheckCircle className="w-6 h-6 text-green-400" />,
  error: <XCircle className="w-6 h-6 text-red-400" />,
  info: <Info className="w-6 h-6 text-blue-400" />,
};

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Auto-close after 5 seconds

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div className="glass-effect flex items-center p-4 rounded-xl border border-white/20 shadow-lg animate-fade-in-up">
        <div className="flex-shrink-0">{icons[type]}</div>
        <div className="ml-3">
          <p className="text-sm font-medium text-white">{message}</p>
        </div>
        <div className="ml-4 flex-shrink-0">
          <button onClick={onClose} className="inline-flex text-gray-400 hover:text-white">
            <span className="sr-only">Close</span>
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;