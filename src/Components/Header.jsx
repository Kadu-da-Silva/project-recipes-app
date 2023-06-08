import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import SearchBar from './SearchBar';

import profileImg from '../images/profileIcon.svg';
import searchImg from '../images/searchIcon.svg';
import iconNavbar from '../images/icone-navbar.png';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

import style from './Header.module.css';

function Header({ pageWithAllHeader, name }) {
  // Lida com retorno da Api
  const { globalState } = useContext(MyContext);
  const { meals, drinks } = globalState;

  // Lida com o aparecimento da barra
  const [searchBarBool, setSearchBarBool] = useState(false);

  // Redirecione para a tela de detalhes da receita caso apenas uma receita seja encontrada, com o ID da mesma na URL
  const history = useHistory();

  useEffect(() => {
    const containMeals = meals?.length > 0;
    const containDrinks = drinks?.length > 0;

    if (containMeals && meals.length === 1) {
      const { idMeal } = meals[0];
      history.push(`/meals/${idMeal}`);
    }

    if (containDrinks && drinks.length === 1) {
      const { idDrink } = drinks[0];
      history.push(`/drinks/${idDrink}`);
    }
  }, [globalState, history, drinks, meals]);

  return (
    <header className={ style.header }>
      <nav className={ style.navbar }>
        <img src={ iconNavbar } alt="" className={ style.icon } />
        <h3>Recipes</h3>
        <span>app</span>
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
        <Link to="/profile" className={ style.link }>
          <img
            src={ profileImg }
            alt="Profile"
            data-testid="profile-top-btn"
          />
        </Link>
      </nav>

      {name === 'Meals' && <img src={ mealIcon } alt="" className={ style.iconPage } />}
      {name === 'Drinks' && <img src={ drinkIcon } alt="" className={ style.iconPage } />}

      <h1 data-testid="page-title">{name}</h1>

      {/* Quando clica no pesquisar aparece a barra de navegação */}
      { searchBarBool && <SearchBar name={ name } />}
    </header>
  );
}

Header.propTypes = {
  search: PropTypes.bool,
  name: PropTypes.string,
}.isRequired;

export default Header;
