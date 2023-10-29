import React, { Component } from 'react';
import { fetchData, requestedWord, currentPage } from './APISearch';

class Finder extends Component {
  state = {
    requestedWord: requestedWord,
    currentPage: currentPage,
    showList: false,
    data: [],
  };

  getWordFromInput = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const searchWord = form.elements.input.value;
    this.setState(() => ({
      requestedWord: searchWord,
    }));

    //this.renderData(this.state.data);
    this.renderData(searchWord);
  };

  //   componentDidMount() {
  //     console.log(requestedWord);
  //     this.renderData(this.state.requestedWord);
  //   }

  renderData = async searchWord => {
    console.log(searchWord);
    try {
      const data = await fetchData(searchWord, this.state.currentPage);
      console.log(data);
      if (data.hits.length > 0) {
        //console.log('here we are');
        this.setState({
          showList: true,
          data: data.hits,
        });
      }
      //return data.hits;
    } catch (error) {
      console.log(error.message);
    }
    // console.log(data.map(element => console.log(element)));
  };

  render() {
    console.log(this.state.data);
    return (
      <>
        <Searchbar fnOnFormSubmit={this.getWordFromInput} />
        {this.state.showList && (
          <ImageGallery children={ImageGalleryItem(this.state.data)} />
        )}
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
  const map = listOfItems.map(item => {
    return (
      <li key={item.id} className="gallery-item">
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
