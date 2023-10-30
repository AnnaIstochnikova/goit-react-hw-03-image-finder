import React, { Component } from 'react';
import SimpleLightbox from 'simplelightbox';
import { Watch } from 'react-loader-spinner';

import { fetchData, requestedWord, currentPage } from './APISearch';

class Finder extends Component {
  state = {
    requestedWord: requestedWord,
    currentPage: currentPage,
    data: [],
    showList: false,
    showSpinner: false,
    //showModal: false,
    showBtnLoadMore: false,
    totalHits: 0,
  };

  getWordFromInput = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const searchWord = form.elements.input.value;
    this.setState(() => ({
      showSpinner: true,
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
          showSpinner: false,
          showList: true,
          data: data.hits,
          totalHits: data.totalHits,
        });
      }
      if (data.totalHits > 12) {
        this.setState({
          showBtnLoadMore: true,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  componentDidMount() {
    this.simpleLightbox = new SimpleLightbox('.gallery-item a', {
      captionDelay: 250,
    });
  }

  loadMoreContent = async () => {
    this.setState({
      showSpinner: true,
    });
    try {
      const data = await fetchData(
        this.state.requestedWord,
        this.state.currentPage + 1
      );

      if (data.hits.length > 0) {
        this.setState(prevState => ({
          currentPage: prevState.currentPage + 1,
          data: [...prevState.data, ...data.hits],
          totalHits: data.totalHits,
          showSpinner: false,
        }));
      }
      if (this.state.totalHits / 12 - 1 <= this.state.currentPage) {
        this.setState({
          showBtnLoadMore: false,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    return (
      <>
        <Searchbar fnOnFormSubmit={this.getWordFromInput} />
        {this.state.showList && (
          <ImageGallery
            children={ImageGalleryItem({
              listOfItems: this.state.data,
            })}
          />
        )}
        {this.state.showSpinner && (
          <Watch
            height="80"
            width="80"
            radius="48"
            color="#149eca"
            ariaLabel="watch-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        )}
        {this.state.showBtnLoadMore && (
          <LoadMoreBtn onButtonClick={this.loadMoreContent} />
        )}

        {/* <ModalPhoto photo={this.state.data} /> */}
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
          S
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

const LoadMoreBtn = ({ onButtonClick }) => {
  return (
    <button className="button--load-more" type="button" onClick={onButtonClick}>
      Load more
    </button>
  );
};

export default Finder;
