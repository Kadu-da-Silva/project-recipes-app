import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';

import profileImg from '../images/profileIcon.svg';
import searchImg from '../images/searchIcon.svg';

import MyContext from '../context/MyContext';

import { fetchApi } from '../services/fetchApi';
import RenderMealsAndDrinks from './RenderMealsAndDrinks';

function Header(props) {
  const { pageWithAllHeader, name } = props;

  // Estados Globais
  // Lida com retorno da Api
  const { globalState, setGlobalState } = useContext(MyContext);
  const { meals, drinks } = globalState;

  // Estados da Página
  // Lida com o aparecimento da barra
  const [searchBarBool, setSearchBarBool] = useState(false);
  // Lida com os valores dos inputs
  const [searchState, setSearchState] = useState({ searchBar: '' });
  // Lida com o aviso de alerta, selecionar o campo First Letter e digitar mais de uma letra
  const [showAlert, setShowAlert] = useState(false);
  // Lida com o retorno da Api, para renderizar as 12 receitas
  const [renderRecipes, setRenderRecipes] = useState(false);

  // verifica se o radio selecionado é "First letter" e se o valor do campo de busca (searchState.searchBar) tem mais de um caractere. Nesse caso, define showAlert como true:
  useEffect(() => {
    const { searchBar, inputRadio } = searchState;
    if (searchBar.length > 1 && inputRadio === 'search.php?f='
    ) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [searchState]);

  const handleChange = ({ target }) => {
    const { name: nome, value } = target;
    setSearchState({ ...searchState, [nome]: value });
  };

  const submitSearch = () => {
    if (showAlert) {
      global.alert('Your search must have only 1 (one) character');
      return;
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
    console.log(meals);
    console.log(drinks);

    // if (searchBar.length > 0 && meals) {
    //   global.alert('Sorry, we haven\'t found any recipes for these filters.');
    // }
  };

  // Redirecione para a tela de detalhes da receita caso apenas uma receita seja encontrada, com o ID da mesma na URL
  const history = useHistory();

  useEffect(() => {
    // console.log(meals);
    // console.log(drinks);

    const containMeals = meals?.length > 0;
    const containDrinks = drinks?.length > 0;

    if (containMeals && meals.length === 1) {
      console.log('só tem uma receita');
      const { idMeal } = meals[0];
      history.push(`/meals/${idMeal}`);
    }

    if (containDrinks && drinks.length === 1) {
      console.log('também só tem uma receita');
      const { idDrink } = drinks[0];
      history.push(`/drinks/${idDrink}`);
    }

    if (containMeals && meals.length > 1) {
      console.log('Meals tem mais que 12 receitas');
      setRenderRecipes(true);
    }

    if (containDrinks && drinks.length > 1) {
      console.log('Drinks tem mais que 12 receitas');
      setRenderRecipes(true);
    }
  }, [globalState, history, drinks, meals]);

  return (
    <header>
      <Link to="/profile">
        <img
          src={ profileImg }
          alt="Profile"
          data-testid="profile-top-btn"
        />
      </Link>

      {/* Renderiza o icone de busca apenas em algumas páginas */}
      {pageWithAllHeader
      && (
        <button onClick={ () => setSearchBarBool((prevState) => !prevState) }>
          <img
            src={ searchImg }
            alt="Search"
            data-testid="search-top-btn"
          />
        </button>)}

      <h1 data-testid="page-title">{name}</h1>

      {/* Quando clica no pesquisar aparece a barra de navegação */}
      { searchBarBool
      && (
        <div>
          {/* Pesquisa por Texto em conjunto com o Tipo de Radio */}
          <input
            type="text"
            data-testid="search-input"
            name="searchBar"
            value={ searchState.searchBar }
            placeholder="Pesquisar"
            onChange={ handleChange }
          />

          {/* Pesquisa por Ingredientes */}
          <label htmlFor="ingredients">
            <input
              type="radio"
              id="ingredients"
              name="inputRadio"
              value="filter.php?i="
              data-testid="ingredient-search-radio"
              onChange={ handleChange }
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
              onChange={ handleChange }
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
              onChange={ handleChange }
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

          {/* Renderiza as 12 Receitas */}
          {renderRecipes && <RenderMealsAndDrinks meals={ meals } drinks={ drinks } />}
          {/* {renderRecipes && searchState.searchBar.length > 1
            ? <RenderMealsAndDrinks meals={ meals } drinks={ drinks } />
            : global.alert('Sorry, we haven\'t found any recipes for these filters.')} */}
        </div>)}
    </header>
  );
}

Header.propTypes = {
  search: PropTypes.bool,
  name: PropTypes.string,
}.isRequired;

export default Header;
