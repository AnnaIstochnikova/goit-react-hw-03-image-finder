import React, { Component } from 'react';
// import SimpleLightbox from 'simplelightbox';

import { fetchData, requestedWord, currentPage } from './APISearch';

class Finder extends Component {
  state = {
    requestedWord: requestedWord,
    currentPage: currentPage,
    showList: false,
    data: [],
    isModalOpen: false,
  };

  getWordFromInput = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const searchWord = form.elements.input.value;
    this.setState(() => ({
      requestedWord: searchWord,
    }));
    this.renderData(searchWord);
    form.reset();
  };

  renderData = async searchWord => {
    console.log(searchWord);
    try {
      const data = await fetchData(searchWord, this.state.currentPage);
      console.log(data);
      if (data.hits.length > 0) {
        this.setState({
          showList: true,
          data: data.hits,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //   componentDidMount() {
  //     this.simpleLightbox = new SimpleLightbox('.gallery-item a', {
  //       captionDelay: 250,
  //     });
  //   }

  openModal = () => {
    this.setState({
      isModalOpen: true,
    });
  };

  render() {
    console.log(this.state.data);
    return (
      <>
        <Searchbar fnOnFormSubmit={this.getWordFromInput} />
        {this.state.showList && (
          <ImageGallery
            children={ImageGalleryItem({
              listOfItems: this.state.data,
              onImageClick: this.openModal,
            })}
          />
        )}
        <ModalPhoto photo={this.state.data} />
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
  return <ul className="gallery">{children}</ul>;
};

const ImageGalleryItem = ({ listOfItems, onImageClick }) => {
  const map = listOfItems.map(item => {
    return (
      <li key={item.id} className="gallery-item">
        <a href={item.largeImageURL} onClick={onImageClick}>
          <img src={item.webformatURL} alt={item.tags} />
        </a>
      </li>
    );
  });
  console.log(map);
  return map;
};

const ModalPhoto = photo => {
  return <img src={photo.largeImageURL} alt={photo.tags} />;
};

export default Finder;
