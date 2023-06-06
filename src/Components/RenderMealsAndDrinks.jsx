import PropTypes from 'prop-types';
import React from 'react';

import style from './RenderMealsAndDrinks.css';

function RenderMealsAndDrinks({ meals, drinks }) {
  return (
    <div>
      {meals && (
        <div className={ style.container }>
          {meals.slice(0, 12).map(({ idMeal, strMeal, strMealThumb }, index) => (
            <div key={ idMeal } data-testid={ `${index}-recipe-card` }>
              <h2 data-testid={ `${index}-card-name` }>{strMeal}</h2>
              <img src={ strMealThumb } data-testid={ `${index}-card-img` } alt="" />
            </div>
          ))}
        </div>
      )}
      {drinks && (
        <div>
          {drinks.slice(0, 12).map(({ idDrink, strDrink, strDrinkThumb }, index) => (
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
  }).isRequired,
  meals: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
};

export default RenderMealsAndDrinks;
