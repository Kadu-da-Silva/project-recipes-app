import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import profileImg from '../images/profileIcon.svg';
import searchImg from '../images/searchIcon.svg';
import { fetchApi } from '../services/fetchApi';
import MyContext from '../context/MyContext';

function Header(props) {
  const { search, name } = props;
  const [searchState, setSearchState] = useState(false);
  const { globalState, setGlobalState } = useContext(MyContext);

  const handleChange = ({ target }) => {
    const { name: nome, value } = target;
    setSearchState({ ...searchState, [nome]: value });
  };

  const submitSearch = () => {
    const URL = `https://www.themealdb.com/api/json/v1/1/search.php?${searchState.param}${searchState.searchBar}`;
    fetchApi(URL, globalState, setGlobalState);
  };

  return (
    <header>
      <Link to="/profile">
        <img
          src={ profileImg }
          alt="Profile"
          data-testid="profile-top-btn"
        />
      </Link>
      {search
      && (
        <button onClick={ () => setSearchState((prevState) => !prevState) }>
          <img
            src={ searchImg }
            alt="Search"
            data-testid="search-top-btn"
          />
        </button>)}
      <h1 data-testid="page-title">{name}</h1>
      { searchState
      && (
        <div>
          <input
            type="text"
            data-testid="search-input"
            name="searchBar"
            value={ searchState.searchBar }
            placeholder="Pesquisar"
            onChange={ handleChange }
          />
          <label htmlFor="ingredients">
            Ingrediente
            <input
              type="radio"
              id="ingredients"
              name="param"
              value="i="
              data-testid="ingredient-search-radio"
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="name">
            Name
            <input
              type="radio"
              id="name"
              name="param"
              value="s="
              data-testid="name-search-radio"
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="first-letter">
            Primeira letra
            <input
              type="radio"
              id="first-letter"
              name="param"
              value="f="
              data-testid="first-letter-search-radio"
              onChange={ handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="exec-search-btn"
            onClick={ submitSearch }
          >
            Pesquisar
          </button>
        </div>)}
    </header>
  );
}

Header.propTypes = {
  search: PropTypes.bool,
  name: PropTypes.string,
}.isRequired;

export default Header;
