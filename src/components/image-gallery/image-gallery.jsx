import { ImageGalleryItem } from 'components/image-gallery-item/image-gallery-item';
import SimpleLightbox from 'simplelightbox';
export const ImageGallery = ({ data }) => {
  const simpleLightbox = new SimpleLightbox('.gallery-item a', {
    captionDelay: 250,
  });
  return (
    <ul className="gallery">
      <ImageGalleryItem listOfItems={data} />
    </ul>
  );
};
