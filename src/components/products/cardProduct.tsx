import ProductBadge from './productBadge';
import { addToCart } from '../cart/cartStore';

interface Props {
  id: string;
  thumb_src: string;
  thumb_alt: string;
  title: string;
  description: string;
  price: number;
  color: string;
  colors: string[];
  position: string;
  stock?: boolean;
  category?: string;
  rating?: number;
}

export default function CardProduct({
  id,
  thumb_src,
  thumb_alt,
  title,
  description,
  price,
  color,
  colors,
  position,
  stock = true,
  category,
  rating
}: Props) {

  const classList = "card-body text-" + position;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('🛒 handleAddToCart called for:', title);
    console.log('🛒 Product data:', { id, title, price, thumb_src, thumb_alt, color, description, stock, category, rating });
    
    addToCart({
      id,
      title,
      price,
      thumb_src,
      thumb_alt,
      color,
      description,
      stock,
      category,
      rating
    });
    
    // Simple feedback - you can enhance this with a toast notification
    alert(`${title} agregado al carrito!`);
  };

  return (
    <>
      <div className="card border-0 shadow-lg h-100 card-product-hover">
        <a href={`/product/${id}`} className="text-decoration-none">
          <div className="position-relative overflow-hidden rounded-top" style={{height: '280px'}}>
            <img 
              className="w-100 h-100 object-fit-cover" 
              src={`${import.meta.env.BASE_URL}${thumb_src}`} 
              alt={thumb_alt}
              style={{transition: 'transform 0.3s ease'}}
            />
            <div className="position-absolute top-0 end-0 p-3">
              <div className="btn btn-white btn-sm rounded-circle shadow-sm">
                <i className="bi bi-heart"></i>
              </div>
            </div>
          </div>
          <div className={classList + " p-4"}>
            {(color) && 
              <span className="badge bg-light text-dark mb-2">{color}</span>
            }
            {(title) && 
              <h5 className="font-weight-bold mb-2 text-dark">
                {title}
              </h5>
            }

            {(description) && 
              <p className="text-muted small mb-3" style={{height: '40px', overflow: 'hidden'}}>
                {description}
              </p>
            }
           
            {(colors) &&
              <div className="mb-3">
                <ProductBadge colors={colors} />
              </div>
            }
            
            <div className="d-flex justify-content-between align-items-center">
              {(price) && 
                <h5 className="mb-0 text-primary font-weight-bold">
                  ${price.toLocaleString()}
                </h5>
              }
              <button 
                className="btn btn-primary btn-sm rounded-pill px-3"
                onClick={handleAddToCart}
                disabled={!stock}
              >
                <i className="bi bi-cart-plus me-1"></i>
                {stock ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </a>
      </div>
    </>
  );
};
