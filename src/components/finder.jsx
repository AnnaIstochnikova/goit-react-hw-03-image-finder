import React, { Component } from 'react';
import { fetchData, requestedWord, currentPage } from './APISearch';

class Finder extends Component {
  state = {
    requestedWord: requestedWord,
    currentPage: currentPage,
    showList: false,
  };

  getWordFromInput = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const searchWord = form.elements.input.value;
    this.setState(() => ({
      requestedWord: searchWord,
    }));
    this.renderData(searchWord);
  };

  renderData = async searchWord => {
    const data = await fetchData(searchWord, this.state.currentPage)
      .then(data => {
        if (data.hits.length > 0) {
          ImageGalleryItem(data.hits);
          //console.log('here we are');
          this.setState(() => ({
            showList: true,
          }));
          return data.hits;
        }
      })
      .catch(error => console.log(error.message));

    // console.log(data.map(element => console.log(element)));
  };

  render() {
    return (
      <>
        <Searchbar fnOnFormSubmit={this.getWordFromInput} />
        {this.state.showList && <ImageGallery children={ImageGalleryItem()} />}
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

const ImageGalleryItem = listOfItems => {
  console.log(listOfItems);
  const map = listOfItems.forEach(item => {
    return (
      <li id={item.id} className="gallery-item">
        <img src={item.pageURL} alt={item.tags} />
      </li>
    );
  });
  console.log(map);
  return map;
  //   return (
  //     <li className="gallery-item">
  //       <img src="" alt="" />
  //     </li>
  //   );
};

export default Finder;
