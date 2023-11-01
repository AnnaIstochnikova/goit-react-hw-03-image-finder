import PropTypes from 'prop-types';
import SimpleLightbox from 'simplelightbox';

export const ImageGalleryItem = ({ listOfItems }) => {
  const map = listOfItems.map(item => {
    return (
      <li key={item.id} className="gallery-item">
        <a href={item.largeImageURL}>
          <img src={item.webformatURL} alt={item.tags} />
        </a>
      </li>
    );
  });
  const simpleLightbox = new SimpleLightbox('.gallery-item a', {
    captionDelay: 250,
  });
  //   simpleLightbox();
  return map;
};

ImageGalleryItem.propTypes = {
  listOfItems: PropTypes.array,
};
