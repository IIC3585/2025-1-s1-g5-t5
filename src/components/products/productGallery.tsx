interface Props {
  images: ({
    src: string;
    alt: string;
  })[];
}

export default function ProductGallery({
  images,
}: Props) {

  // Ensure we have at least one image
  if (!images || images.length === 0) {
    return <div>No images available</div>;
  }

  return (
    <>
      <div className="col-12 col-lg-6 d-flex">
        <div className="d-block">
          <img className="w-90 max-height-150 mb-4 rounded-2" src={images[0].src} alt={images[0].alt} />
          {images[1] && <img className="w-90 max-height-150 mb-4 rounded-2" src={images[1].src} alt={images[1].alt} />}
          {images[2] && <img className="w-90 max-height-150 mb-4 rounded-2" src={images[2].src} alt={images[2].alt} />}
          {images[3] && <img className="w-90 max-height-150 rounded-2" src={images[3].src} alt={images[3].alt} />}
        </div>
        <img className="w-70 rounded-2" src={images[0].src} alt={images[0].alt} />
      </div> 
    </>
  );
}