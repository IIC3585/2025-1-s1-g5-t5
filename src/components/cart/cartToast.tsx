import { useState, useEffect } from 'react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export default function CartToast({ message, isVisible, onClose }: ToastProps) {
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
    <div 
      className="position-fixed top-0 end-0 p-3" 
      style={{ zIndex: 1050 }}
    >
      <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
        <div className="toast-header bg-success text-white">
          <i className="bi bi-check-circle me-2"></i>
          <strong className="me-auto">¡Éxito!</strong>
          <button 
            type="button" 
            className="btn-close btn-close-white" 
            onClick={onClose}
          ></button>
        </div>
        <div className="toast-body">
          {message}
        </div>
      </div>
    </div>
  );
} 