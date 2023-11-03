import PropTypes from 'prop-types';

export const Searchbar = ({ fnOnFormSubmit }) => {
  const handleSubmit = event => {
    fnOnFormSubmit(event);
  };
  return (
    <header className="searchbar">
      <form className="form" onSubmit={handleSubmit}>
        <button type="submit" className="button">
          <img
            //style={{ height: '100%', width: '100%' }}
            srcSet={`${process.env.PUBLIC_URL}/search.svg`}
            alt="Icon search"
          />
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

Searchbar.propTypes = {
  fnOnFormSubmit: PropTypes.func,
};
