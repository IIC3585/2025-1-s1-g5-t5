import { useState, useEffect } from 'react';
import { 
  getCartItems, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  getTotalItems, 
  getTotalPrice,
  type CartItem 
} from './cartStore';

export default function ShoppingCartWithStore() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load cart items on component mount
  useEffect(() => {
    const loadCartItems = () => {
      const items = getCartItems();
      setCartItems(items);
      setLoading(false);
      console.log('🛒 Loaded cart items:', items);
    };

    loadCartItems();

    // Listen for cart updates
    const handleCartUpdate = (event: CustomEvent) => {
      console.log('🛒 Cart updated event received:', event.detail);
      setCartItems(event.detail);
    };

    window.addEventListener('cartUpdated', handleCartUpdate as EventListener);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate as EventListener);
    };
  }, []);

  const handleRemoveFromCart = (id: string) => {
    removeFromCart(id);
    setCartItems(getCartItems());
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    updateQuantity(id, quantity);
    setCartItems(getCartItems());
  };

  const handleClearCart = () => {
    clearCart();
    setCartItems([]);
  };

  const shipping = getTotalPrice() > 100 ? 0 : 15.99;
  const tax = getTotalPrice() * 0.08;
  const total = getTotalPrice() + shipping + tax;

  if (loading) {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-3 text-muted">Cargando carrito...</p>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center py-5">
            <div className="mb-4">
              <i className="bi bi-cart-x display-1 text-muted"></i>
            </div>
            <h2 className="h3 text-muted mb-3">Tu carrito está vacío</h2>
            <p className="text-muted mb-4 lead">¡Agrega algunos productos para comenzar a comprar!</p>
            <a href="/products" className="btn btn-primary btn-lg">
              <i className="bi bi-shop me-2"></i>
              Continuar Comprando
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Cart Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h3 font-weight-bold mb-1">
            <i className="bi bi-cart3 me-2 text-primary"></i>
            Mi Carrito
          </h2>
          <p className="text-muted mb-0">{getTotalItems()} {getTotalItems() === 1 ? 'producto' : 'productos'}</p>
        </div>
        <button 
          className="btn btn-outline-danger"
          onClick={handleClearCart}
          title="Vaciar carrito"
        >
          <i className="bi bi-trash me-1"></i>
          Vaciar Carrito
        </button>
      </div>

      <div className="row">
        {/* Cart Items List */}
        <div className="col-lg-8">
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body p-0">
              {cartItems.map((item, index) => (
                <div key={item.id}>
                  <div className="p-4">
                    <div className="row align-items-center">
                      {/* Product Image */}
                      <div className="col-md-2 col-3 mb-3 mb-md-0">
                        <img 
                          src={`${import.meta.env.BASE_URL}${item.thumb_src}`}
                          alt={item.thumb_alt}
                          className="img-fluid rounded shadow-sm"
                          style={{
                            width: '100%',
                            height: '80px',
                            objectFit: 'cover'
                          }}
                        />
                      </div>
                      
                      {/* Product Details */}
                      <div className="col-md-4 col-9 mb-3 mb-md-0">
                        <h5 className="font-weight-bold mb-2">{item.title}</h5>
                        {item.category && (
                          <p className="text-muted small mb-1">
                            <i className="bi bi-tag me-1"></i>
                            {item.category}
                          </p>
                        )}
                        {item.color && (
                          <p className="text-muted small mb-1">
                            <i className="bi bi-palette me-1"></i>
                            Color: {item.color}
                          </p>
                        )}
                        {item.rating && (
                          <div className="d-flex align-items-center">
                            <div className="text-warning me-2">
                              {[...Array(5)].map((_, i) => (
                                <i key={i} className={`bi ${i < item.rating! ? 'bi-star-fill' : 'bi-star'}`}></i>
                              ))}
                            </div>
                            <span className="text-muted small">({item.rating})</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="col-md-3 col-6 mb-3 mb-md-0">
                        <label className="form-label small text-muted">Cantidad:</label>
                        <div className="input-group input-group-sm">
                          <button 
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <i className="bi bi-dash"></i>
                          </button>
                          <input 
                            type="text" 
                            className="form-control text-center" 
                            value={item.quantity}
                            readOnly
                          />
                          <button 
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            <i className="bi bi-plus"></i>
                          </button>
                        </div>
                      </div>
                      
                      {/* Price and Remove */}
                      <div className="col-md-3 col-6">
                        <div className="text-end">
                          <p className="h5 text-primary font-weight-bold mb-2">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <button 
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleRemoveFromCart(item.id)}
                            title="Eliminar producto"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {index < cartItems.length - 1 && <hr className="my-0" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 position-sticky" style={{top: '2rem'}}>
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">
                <i className="bi bi-receipt me-2"></i>
                Resumen del Pedido
              </h5>
            </div>
            <div className="card-body">
              {/* Summary Details */}
              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal ({getTotalItems()} items):</span>
                  <span className="font-weight-bold">${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Envío:</span>
                  <span className={`font-weight-bold ${shipping === 0 ? 'text-success' : ''}`}>
                    {shipping === 0 ? 'GRATIS' : '$' + shipping.toFixed(2)}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Impuestos (8%):</span>
                  <span className="font-weight-bold">${tax.toFixed(2)}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-3">
                  <span className="h5 font-weight-bold">Total:</span>
                  <span className="h4 font-weight-bold text-primary">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button className="btn btn-primary btn-lg w-100 mb-3">
                <i className="bi bi-credit-card me-2"></i>
                Proceder al Checkout
              </button>

              {/* Continue Shopping */}
              <a href="/products" className="btn btn-outline-primary w-100">
                <i className="bi bi-arrow-left me-2"></i>
                Continuar Comprando
              </a>
              
              {/* Security Badge */}
              <div className="text-center mt-3">
                <small className="text-muted">
                  <i className="bi bi-shield-check me-1"></i>
                  Compra segura y protegida
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-5">
        <div className="alert alert-info border-0 bg-light">
          <div className="d-flex align-items-center">
            <i className="bi bi-info-circle me-2"></i>
            <div>
              <strong>Carrito con localStorage:</strong> Este carrito usa localStorage para persistir datos entre páginas, compatible con cualquier estrategia de hidratación.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 