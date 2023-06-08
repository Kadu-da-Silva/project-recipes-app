import PropTypes from 'prop-types';
import React from 'react';
import style from './RenderMealsAndDrinks.module.css';

function RenderMealsAndDrinks({ meals, drinks }) {
  const twelve = 12;
  return (
    <section className={ style.section }>
      {meals && (
        <div className={ style.container }>
          {meals.slice(0, twelve).map(({ idMeal, strMeal, strMealThumb }, index) => (
            <div
              key={ idMeal }
              data-testid={ `${index}-recipe-card` }
              className={ style.card }
            >
              <img src={ strMealThumb } data-testid={ `${index}-card-img` } alt="" />
              <p data-testid={ `${index}-card-name` }>{strMeal}</p>
            </div>
          ))}
        </div>
      )}
      {drinks && (
        <div className={ style.container }>
          {drinks.slice(0, twelve).map(({ idDrink, strDrink, strDrinkThumb }, index) => (
            <div
              key={ idDrink }
              data-testid={ `${index}-recipe-card` }
              className={ style.card }
            >
              <img src={ strDrinkThumb } data-testid={ `${index}-card-img` } alt="" />
              <p data-testid={ `${index}-card-name` }>{strDrink}</p>
            </div>
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
