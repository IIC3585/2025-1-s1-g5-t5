import { useState, useEffect } from 'react';
import { getTotalItems } from './cartStore';

export default function CartIndicator() {
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    // Get initial count
    setItemCount(getTotalItems());

    // Listen for cart updates
    const handleCartUpdate = () => {
      setItemCount(getTotalItems());
    };

    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  return (
    <a className="nav-link fw-semibold text-dark px-3 position-relative" href="/shopping-cart">
      <i className="bi bi-cart me-1"></i>
      Cart
      {itemCount > 0 && (
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {itemCount}
        </span>
      )}
    </a>
  );
} 