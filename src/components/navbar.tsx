import CartIndicator from './cart/cartIndicator';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top py-3">
      <div className="container-fluid px-4">
        {/* Brand */}
        <a className="navbar-brand fw-bold text-dark me-4" href="/">
          <i className="fas fa-wind text-primary me-2"></i>
          Astro Ecommerce
        </a>

        {/* Mobile Toggle */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item me-3">
              <a className="nav-link fw-semibold text-dark px-3" href="/">
                <i className="bi bi-house me-1"></i>
                Home
              </a>
            </li>
            <li className="nav-item me-3">
              <a className="nav-link fw-semibold text-dark px-3" href="/products">
                <i className="bi bi-grid me-1"></i>
                Products
              </a>
            </li>
            <li className="nav-item">
              <CartIndicator />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
