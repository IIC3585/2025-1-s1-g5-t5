import CardCategory from './products/cardCategory';

const ComplexNavbar = () => {
  // Datos estáticos para las categorías del navbar
  const navbarCategories = [
    {
      thumb_src: "/images/category1.jpg",
      title: "Silk Dresses",
      collection: "Pre-fall",
      classList: "h-100",
      cta: "See products"
    },
    {
      thumb_src: "/images/category2.jpg",
      title: "Suits",
      collection: "Business",
      classList: "h-100",
      cta: "See products"
    },
    {
      thumb_src: "/images/category3.jpg",
      title: "Casual Wear",
      collection: "Everyday",
      classList: "h-100",
      cta: "See products"
    }
  ];

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
          <ul className="navbar-nav me-auto">
            <li className="nav-item me-3">
              <a className="nav-link fw-semibold text-dark px-3" href="/">
                <i className="bi bi-house me-1"></i>
                Home
              </a>
            </li>
            
            {/* Products Link */}
            <li className="nav-item me-3">
              <a className="nav-link fw-semibold text-dark px-3" href="/products">
                <i className="bi bi-shop me-1"></i>
                Products
              </a>
            </li>

            <li className="nav-item me-3">
              <a className="nav-link fw-semibold text-dark px-3" href="/shopping-cart">
                <i className="bi bi-cart me-1"></i>
                Cart
              </a>
            </li>
          </ul>

          {/* Search */}
          <div className="d-flex">
            <div className="input-group" style={{width: '300px'}}>
              <input 
                className="form-control border-end-0" 
                type="search" 
                placeholder="Search products..." 
                aria-label="Search"
              />
              <button className="btn btn-outline-secondary border-start-0" type="submit">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ComplexNavbar;
