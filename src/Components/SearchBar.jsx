import PropTypes from 'prop-types';
import React, { useState, useEffect, useContext } from 'react';
import MyContext from '../context/MyContext';
import { fetchApi } from '../services/fetchApi';

function SearchBar({ name }) {
  // Estado global
  const { globalState, setGlobalState } = useContext(MyContext);
  // Lida com os valores dos inputs
  const [searchState, setSearchState] = useState({ searchBar: '' });
  // Lida com o aviso de alerta, selecionar o campo First Letter e digitar mais de uma letra
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = ({ target }) => {
    const { name: nome, value } = target;
    setSearchState({ ...searchState, [nome]: value });
  };

  const handleInputChange = ({ target }) => {
    const { name: nome, value } = target;
    setSearchState({ ...searchState, [nome]: value });
    handleChange({ target });
  };

  useEffect(() => {
    const { searchBar, inputRadio } = searchState;
    if (searchBar.length > 1 && inputRadio === 'search.php?f='
    ) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [searchState]);

  const submitSearch = () => {
    if (showAlert) {
      global.alert('Your search must have only 1 (one) character');
    }

    const { inputRadio, searchBar } = searchState;

    // Busque na API de comidas caso a pessoa esteja na página de comidas, e na API de bebidas caso esteja na de bebidas
    let URL;

    switch (name) {
    case 'Meals':
      // Chamada para https://www.themealdb.com/api/json/v1/1/
      URL = `https://www.themealdb.com/api/json/v1/1/${inputRadio}${searchBar}`;
      break;
    case 'Drinks':
      // Chamada para https://www.thecocktaildb.com/api/json/v1/1/
      URL = `https://www.thecocktaildb.com/api/json/v1/1/${inputRadio}${searchBar}`;
      break;
    default:
      break;
    }

    fetchApi(URL, globalState, setGlobalState);
  };

  return (
    <div>
      {/* Pesquisa por Texto em conjunto com o Tipo de Radio */}
      <input
        type="text"
        data-testid="search-input"
        name="searchBar"
        value={ searchState.searchBar }
        placeholder="Pesquisar"
        onChange={ handleInputChange }
      />

      {/* Pesquisa por Ingredientes */}
      <label htmlFor="ingredients">
        <input
          type="radio"
          id="ingredients"
          name="inputRadio"
          value="filter.php?i="
          data-testid="ingredient-search-radio"
          onChange={ handleInputChange }
        />
        Ingredient
      </label>

      {/* Pesquisa por Nome */}
      <label htmlFor="name">
        <input
          type="radio"
          id="name"
          name="inputRadio"
          value="search.php?s="
          data-testid="name-search-radio"
          onChange={ handleInputChange }
        />
        Name
      </label>

      {/* Pesquisa pela Primeira letra */}
      <label htmlFor="first-letter">
        <input
          type="radio"
          id="first-letter"
          name="inputRadio"
          value="search.php?f="
          data-testid="first-letter-search-radio"
          onChange={ handleInputChange }
        />
        First letter
      </label>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ submitSearch }
      >
        Pesquisar
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  name: PropTypes.string.isRequired,
};

export default SearchBar;
