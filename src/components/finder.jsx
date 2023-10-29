import React, { Component } from 'react';
import { fetchData, requestedWord, currentPage } from './APISearch';

class Finder extends Component {
  state = {
    requestedWord: requestedWord,
    currentPage: currentPage,
  };

  getWordFromInput = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const searchWord = form.elements.input.value;
    this.setState(() => ({
      requestedWord: searchWord,
    }));
    //console.log(searchWord);
    this.renderData(searchWord);
  };

  renderData = async searchWord => {
    const data = await fetchData(searchWord, this.state.currentPage)
      .then(data => {
        //console.log(this.state.requestedWord);
        return data.hits;
      })
      .catch(error => console.log(error.message));

    console.log(data.map(element => console.log(element)));
  };

  render() {
    return (
      <>
        <Searchbar fnOnFormSubmit={this.getWordFromInput} />
        <ImageGallery />
      </>
    );
  }
}

const Searchbar = ({ fnOnFormSubmit }) => {
  const handleSubmit = event => {
    fnOnFormSubmit(event);
  };
  return (
    <header className="searchbar">
      <form className="form" onSubmit={handleSubmit}>
        <button type="submit" className="button">
          <span className="button-label">Search</span>
        </button>

        <input
          id="input"
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

// fetchData();
// console.log(currentPage);

export default Finder;
