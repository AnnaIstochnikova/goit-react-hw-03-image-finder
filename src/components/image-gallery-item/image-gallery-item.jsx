import PropTypes from 'prop-types';
import * as basicLightbox from 'basiclightbox';

export const ImageGalleryItem = ({ listOfItems }) => {
  const openLightbox = largeImageURL => {
    basicLightbox
      .create(
        `
          <img src="${largeImageURL}" width="800" height="600">
        `
      )
      .show();
  };

  const map = listOfItems.map(item => {
    return (
      <li key={item.id} className="gallery-item">
        {/* <a
          href={item.largeImageURL}
          onClick={() => openLightbox(item.largeImageURL)}
        > */}
        <img
          src={item.webformatURL}
          alt={item.tags}
          onClick={() => openLightbox(item.largeImageURL)}
        />
        {/* </a> */}
      </li>
    );
  });

  return map;
};

ImageGalleryItem.propTypes = {
  listOfItems: PropTypes.array,
};
