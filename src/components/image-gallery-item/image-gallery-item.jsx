import PropTypes from 'prop-types';

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
  return map;
};

ImageGalleryItem.propTypes = {
  listOfItems: PropTypes.array,
};
