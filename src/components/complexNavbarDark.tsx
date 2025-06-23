import CardCategory from './products/cardCategory';

const ComplexNavbarDark = () => {
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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top py-3">
      <div className="container-fluid px-4">
        {/* Brand */}
        <a className="navbar-brand fw-bold text-white me-4" href="/">
          <i className="fas fa-wind text-primary me-2"></i>
          Astro Ecommerce
        </a>

        {/* Mobile Toggle */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNavDark" 
          aria-controls="navbarNavDark" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation */}
        <div className="collapse navbar-collapse" id="navbarNavDark">
          <ul className="navbar-nav me-auto">
            <li className="nav-item me-3">
              <a className="nav-link fw-semibold text-white px-3" href="/">
                <i className="bi bi-house me-1"></i>
                Home
              </a>
            </li>
            
            {/* Store Dropdown */}
            <li className="nav-item dropdown me-3">
              <a 
                className="nav-link dropdown-toggle fw-semibold text-white px-3" 
                href="/products" 
                id="storeDropdownDark" 
                role="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                <i className="bi bi-shop me-1"></i>
                Store
              </a>
              <div className="dropdown-menu border-0 shadow bg-dark" style={{minWidth: '500px'}}>
                <div className="p-3">
                  <h6 className="dropdown-header text-primary fw-bold mb-3">Featured Categories</h6>
                  <div className="row g-2">
                    {navbarCategories.map((category, index) => 
                      <div key={index} className="col-4">
                        <CardCategory
                          thumb_src={category.thumb_src}
                          title={category.title}
                          collection={category.collection}
                          classList={category.classList}
                          cta={category.cta}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </li>

            <li className="nav-item me-3">
              <a className="nav-link fw-semibold text-white px-3" href="/shopping-cart">
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
                style={{backgroundColor: '#495057', borderColor: '#6c757d', color: 'white'}}
              />
              <button className="btn btn-outline-light border-start-0" type="submit">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ComplexNavbarDark;
