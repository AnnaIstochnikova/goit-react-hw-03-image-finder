import React, { Component } from 'react';

class Finder extends Component {
  // state={

  // }

  render() {
    return (
      <>
        <Searchbar />
        <ImageGallery />
      </>
    );
  }
}

const Searchbar = () => {
  return (
    <header className="searchbar">
      <form className="form">
        <button type="submit" className="button">
          <span className="button-label">Search</span>
        </button>

        <input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

const ImageGallery = ({ children }) => {
  return (
    <ul className="gallery">
      <ImageGalleryItem />
    </ul>
  );
};

const ImageGalleryItem = () => {
  return (
    <li className="gallery-item">
      <img src="" alt="" />
    </li>
  );
};

export default Finder;
