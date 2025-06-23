interface Props {
  thumb_src: string;
  title: string;
  collection: string;
  classList?: string;
  cta?: string;
  productCount?: number;
}

export default function CardCategory({
  thumb_src,
  title,
  collection,
  classList,
  cta,
  productCount,
}: Props) {

  return (
    <>
      <a href="#" className="text-decoration-none">
        <div className={`card card-category-hover border-0 shadow-lg overflow-hidden ${classList || ''}`} style={{height: '320px'}}>
          <div 
            className="position-relative h-100 d-flex align-items-end" 
            style={{
              backgroundImage: `linear-gradient(45deg, rgba(0,0,0,0.4), rgba(0,0,0,0.2)), url(${`${import.meta.env.BASE_URL}${thumb_src}`})`, 
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="position-absolute top-0 start-0 end-0 bottom-0 bg-dark opacity-25"></div>
            <div className="card-body position-relative z-index-2 text-white p-4">
              <div className="d-flex flex-column">
                <span className="badge bg-white bg-opacity-25 text-white mb-2 align-self-start rounded-pill px-3">
                  {collection}
                </span>
                <h4 className="text-white font-weight-bolder mb-2">{title}</h4>
                {productCount && (
                  <p className="text-white opacity-9 mb-3 small">
                    {productCount} products available
                  </p>
                )}
                <div className="d-flex align-items-center text-white">
                  <span className="me-2">See products</span>
                  <i className="bi bi-arrow-right"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </>
  );
};
