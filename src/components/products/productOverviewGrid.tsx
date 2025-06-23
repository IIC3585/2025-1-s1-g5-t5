import ProductRating from '../reviews/reviewRating'
import ProductGallery from './productGallery'
import ProductSizes from './productSizes'
import { addToCart } from '../cart/cartStore'
import CartToast from '../cart/cartToast'
import { useState } from 'react'

interface Props {
  title: string;
  colors: string[];
  images: ({
    src: string;
    alt: string;
  })[];
  full_description: string;
  price: number;
  highlights: string[];
  details: string;
  rating: number;
  reviews: number;
  sizes: Map<string,number>;
  id: string;
  thumb_src: string;
  thumb_alt: string;
  color?: string;
  description?: string;
  stock?: boolean;
  category?: string;
}

export default function ProductOverview({
  title,
  colors,
  images,
  full_description,
  price,
  highlights,
  details,
  rating,
  reviews,
  sizes,
  id,
  thumb_src,
  thumb_alt,
  color,
  description,
  stock,
  category
}: Props) {

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();
    
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
    
    // Show toast notification
    setToastMessage(`${title} agregado al carrito!`);
    setShowToast(true);
  };

  return (
    <>
    <div className="card card-product card-plain">
      <div className="row">
        {(images && images.length != 0) && 
          <ProductGallery images={images}/>
        }
        <div className="col-12 col-lg-6 ps-lg-5">
          {(title && title.length != 0) && 
            <h2 className="mt-4">{title}</h2>
          }
          {(full_description && full_description.length != 0) && 
            <p className="mb-5">{full_description}</p>
          }

          <form onSubmit={handleAddToCart}>
            {(price && price > 0) && 
              <div className="d-flex">
                <h3 className="font-weight-normal">${price.toLocaleString()}</h3>
                <input className="opacity-0" defaultValue={price} />
              </div>
            }

            {(rating && rating > 0) && 
            <>
              <h3 className="sr-only">Reviews</h3>
              <div className="d-flex">
                <ProductRating rating={rating} />
                <span className="ms-3">{reviews || 0} reviews</span>
              </div>
            </>
            }
            
            {(sizes && sizes.size != 0) && 
              <ProductSizes sizes={sizes}/>
            }
            <button 
              className="btn btn-dark btn-lg" 
              type="submit"
              disabled={stock === false}
            >
              {stock === false ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </form>
        </div>
      </div>
      
      <div className="row mt-5">
        <div className="col-12 col-lg-6">
          <h4>Product Description</h4>
          <p>There's nothing I really wanted to do in life that I wasn't able to get good at. That's my skill. I'm not really specifically talented at anything except for the ability to learn. That's what I do. That's what I'm here for. Don't be afraid to be wrong because you can't learn anything from a compliment.</p>
          {(highlights && highlights.length != 0) && 
           <>
             <h6>Benefits</h6>
              <ul className="text-sm">
              {highlights.map((highlight, index) => 
                <li key={index} className="mb-2">{highlight}</li>
              )}
              </ul>
           </>
          }
           {(details && details.length != 0) && 
            <>
              <h6>More about product</h6>
              <p>{details}</p>
            </>
           }
        </div>
      </div>
    </div>

    <CartToast 
      message={toastMessage}
      isVisible={showToast}
      onClose={() => setShowToast(false)}
    />
    </>
  );
};
