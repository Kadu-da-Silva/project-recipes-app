import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';

import style from './RenderMealsAndDrinks.css';
import MyContext from '../context/MyContext';
import { getCategories } from '../services/fetchApi';

function RenderMealsAndDrinks({ meals, drinks }) {
  const { type } = useContext(MyContext);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const twelve = 12;
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  useEffect(() => {
    setLoading(true);
    getCategories(URL, categories, setCategories);
    setLoading(false); // NÃO ESTÁ FUNCIONANDO, NO MOMENTO ELE DEVOLVE ATRASADO
  }, [type]);
  console.log(categories);

  return (
    <div>
      {/* {!loading && categories.drinks.map((el) => <button data-testid={ `${el.strCategory}-category-filter` }>{el.strCategory}</button>)} */}
      {meals && (
        <div className={ style.container }>
          {meals.slice(0, twelve).map(({ idMeal, strMeal, strMealThumb }, index) => (
            <div key={ idMeal } data-testid={ `${index}-recipe-card` }>
              <h2 data-testid={ `${index}-card-name` }>{strMeal}</h2>
              <img src={ strMealThumb } data-testid={ `${index}-card-img` } alt="" />
            </div>
          ))}
        </div>
      )}
      {drinks && (
        <div>
          {drinks.slice(0, twelve).map(({ idDrink, strDrink, strDrinkThumb }, index) => (
            <div key={ idDrink } data-testid={ `${index}-recipe-card` }>
              <h2 data-testid={ `${index}-card-name` }>{strDrink}</h2>
              <img src={ strDrinkThumb } data-testid={ `${index}-card-img` } alt="" />
            </div>
          ))}
        </div>
      )}
    </div>
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
