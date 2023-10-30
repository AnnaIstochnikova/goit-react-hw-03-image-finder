import React, { Component } from 'react';
// import SimpleLightbox from 'simplelightbox';

import { fetchData, requestedWord, currentPage } from './APISearch';

class Finder extends Component {
  state = {
    requestedWord: requestedWord,
    currentPage: currentPage,
    data: [],
    showList: false,
    showModal: false,
    showBtnLoadMore: false,
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
    try {
      const data = await fetchData(searchWord, this.state.currentPage);
      //console.log(data.totalHits);
      if (data.hits.length > 0) {
        this.setState({
          showList: true,
          data: data.hits,
        });
      }
      if (data.totalHits > 12) {
        this.setState({
          showBtnLoadMore: true,
        });
      }
      console.log(data.totalHits);
      console.log(this.state.currentPage);
      console.log(this.state.data.length);
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
      showModal: true,
    });
  };

  loadMoreContent = async () => {
    try {
      const data = await fetchData(
        this.state.requestedWord,
        this.state.currentPage + 1
      );

      if (data.hits.length > 0) {
        this.setState(prevState => ({
          currentPage: prevState.currentPage + 1,
          data: [...prevState.data, ...data.hits],
        }));
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  //   currentPage = this.state.currentPage;

  render() {
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
        {this.state.showBtnLoadMore && (
          <LoadMoreBtn onButtonClick={this.loadMoreContent} />
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
        <a href={item.largeImageURL}>
          <img src={item.webformatURL} alt={item.tags} />
        </a>
      </li>
    );
  });
  return map;
};

const ModalPhoto = photo => {
  return <img src={photo.largeImageURL} alt={photo.tags} />;
};

const LoadMoreBtn = ({ onButtonClick }) => {
  return (
    <button type="button" onClick={onButtonClick}>
      Load more
    </button>
  );
};

export default Finder;
