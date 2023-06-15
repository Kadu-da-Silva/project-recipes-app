import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import MyContext from '../context/MyContext';
import { fetchApi, getCategories } from '../services/fetchApi';

import style from './RenderMealsAndDrinks.module.css'; // Css - Carlos

function RenderMealsAndDrinks({ meals, drinks }) {
  const { globalState, setGlobalState } = useContext(MyContext);
  const [categories, setCategories] = useState([]);
  const [filterOn, setFilterOn] = useState(false);
  const [isOn, setIsOn] = useState({});
  const history = useHistory();
  const { location: { pathname } } = history;
  const twelve = 12;
  const URL = (pathname === '/meals') ? 'https://www.themealdb.com/api/json/v1/1/list.php?c=list' : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  useEffect(() => {
    if ((pathname === '/meals') && meals?.length === 1 && !filterOn) {
      const { idMeal } = meals[0];
      history.push(`/meals/${idMeal}`);
    } if ((pathname === '/drinks') && drinks?.length === 1 && !filterOn) {
      const { idDrink } = drinks[0];
      history.push(`/drinks/${idDrink}`);
    }
    getCategories(URL, setCategories);
  }, [globalState]);

  const applyFilter = ({ target: { name } }) => {
    const filterURL = (pathname === '/meals') ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}` : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${name}`;
    const mainURL = (pathname === '/meals') ? 'https://www.themealdb.com/api/json/v1/1/search.php?s=' : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    if (name === 'all' || isOn[name]) {
      setFilterOn(false);
      setIsOn({});
      fetchApi(mainURL, globalState, setGlobalState);
    } else {
      setIsOn({ ...isOn, [name]: true });
      setFilterOn(true);
      fetchApi(filterURL, globalState, setGlobalState);
    }
  };

  return (
    <section className={ style.section }>
      <div className={ style.containerButtons }>
        <button
          data-testid="All-category-filter"
          name="all"
          onClick={ applyFilter }
        >
          All
        </button>
        {categories.length > 0 && categories.map((el, i) => (
          <button
            key={ i }
            data-testid={ `${el.strCategory}-category-filter` }
            name={ el.strCategory }
            onClick={ applyFilter }
          >
            {el.strCategory}
          </button>))}
      </div>
      {meals && (
        <div className={ style.container }>
          {meals.slice(0, twelve).map(({ idMeal, strMeal, strMealThumb }, index) => (
            <Link to={ `/meals/${idMeal}` } key={ idMeal }>
              <div data-testid={ `${index}-recipe-card` } className={ style.card }>
                <img src={ strMealThumb } data-testid={ `${index}-card-img` } alt="" />
                <p data-testid={ `${index}-card-name` }>{strMeal}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
      {drinks && (
        <div className={ style.container }>
          {drinks.slice(0, twelve)
            .map(({ idDrink, strDrink, strDrinkThumb }, index) => (
              <Link to={ `drinks/${idDrink}` } key={ idDrink }>
                <div data-testid={ `${index}-recipe-card` } className={ style.card }>
                  <img src={ strDrinkThumb } data-testid={ `${index}-card-img` } alt="" />
                  <p data-testid={ `${index}-card-name` }>{strDrink}</p>
                </div>
              </Link>
            ))}
        </div>
      )}
    </section>
  );
}

RenderMealsAndDrinks.propTypes = {
  drinks: PropTypes.shape({
    map: PropTypes.func,
  }),
  meals: PropTypes.shape({
    map: PropTypes.func,
  }),
}.isRequired;

export default RenderMealsAndDrinks;
