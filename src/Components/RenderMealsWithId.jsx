import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import shareIcon from '../images/shareIcon.svg';
import heartIcon from '../images/whiteHeartIcon.svg';

import style from '../pages/RecipeDetails.module.css';

function RenderMealsWithId({ meals, drinksRecommendation, loading }) {
  const [isRecipeInProgress, setIsRecipeInProgress] = useState(false);
  const history = useHistory();

  useEffect(() => {
    // Verificar se a receita está salva no localStorage
    const inProgressRecipesJSON = localStorage.getItem('inProgressRecipes');
    if (inProgressRecipesJSON) {
      const inProgressRecipes = JSON.parse(inProgressRecipesJSON);
      if (inProgressRecipes.meals && inProgressRecipes.meals[meals[0].idMeal]) {
        setIsRecipeInProgress(true);
      }
    }
  }, [meals]);

  const meal = meals[0];

  const renderIngredientsMeals = () => {
    const ingredients = [];
    const MAX_LENGTH = 20;

    for (let i = 0; i <= MAX_LENGTH; i += 1) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];

      if (ingredient && measure) {
        ingredients.push(
          <li
            key={ `ingredient-${i}` }
            data-testid={ `${i - 1}-ingredient-name-and-measure` }
          >
            {`${measure} - ${ingredient}`}
          </li>,
        );
      }
    }

    return ingredients;
  };

  const renderDrinksRecommendation = () => {
    if (loading) {
      return <p>Loading recommendation...</p>;
    }

    return (
      <div className={ style.carousel }>
        <div className={ style.carousel_inner }>
          {drinksRecommendation.map(({ strDrink, strDrinkThumb }, index) => (
            <div
              key={ index }
              className={ style.carousel_item }
              data-testid={ `${index}-recommendation-card` }
            >
              <img src={ strDrinkThumb } alt={ strDrink } />
              <p data-testid={ `${index}-recommendation-title` }>{strDrink}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handleClick = () => {
    const { idMeal } = meal;
    const ingredients = [];
    const MAX_LENGTH = 20;

    for (let i = 0; i <= MAX_LENGTH; i += 1) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];

      if (ingredient && measure) {
        ingredients.push(
          `${measure} - ${ingredient}`,
        );
      }
    }

    // Passo 1: Recuperar o valor atual do localStorage
    const inProgressRecipesJSON = localStorage.getItem('inProgressRecipes');
    let inProgressRecipes = {};

    // Verificar se já existe um valor no localStorage
    if (inProgressRecipesJSON) {
      inProgressRecipes = JSON.parse(inProgressRecipesJSON);
    }

    // Passo 2: Adicionar ou atualizar os dados desejados na estrutura do objeto
    if (!inProgressRecipes.meals) {
      inProgressRecipes.meals = {};
    }

    inProgressRecipes.meals[idMeal] = ingredients;

    // Passo 3: Salvar o objeto atualizado de volta no localStorage
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));

    history.push(`/meals/${idMeal}/in-progress`);
  };

  if (!meals) {
    return <p>Loading...</p>;
  }

  return (
    <section className={ style.section }>
      <img src={ shareIcon } alt="Compartilhar" data-testid="share-btn" />
      <img src={ heartIcon } alt="Favoritar" data-testid="favorite-btn" />
      <h1 data-testid="recipe-title">{meal.strMeal}</h1>
      <div className={ style.containerImg }>
        <img
          src={ meal.strMealThumb }
          alt={ meal.strMeal }
          data-testid="recipe-photo"
          className={ style.imgRecipe }
        />
      </div>
      <p
        data-testid="recipe-category"
        className={ style.category }
      >
        {meal.strCategory}
      </p>
      <h2>Ingredients:</h2>
      <div className={ style.container }>
        <ul>{renderIngredientsMeals()}</ul>
      </div>
      <h2>Instructions:</h2>
      <div className={ style.container }>
        <p data-testid="instructions">{meal.strInstructions}</p>
      </div>
      <h2>Video:</h2>
      <div className={ style.container_video }>
        <iframe title="Video Youtube" src={ meal.strYoutube } data-testid="video" />
      </div>
      <h2>Recommendation</h2>
      {renderDrinksRecommendation()}
      <button
        data-testid="start-recipe-btn"
        className={ style.btnStart }
        onClick={ handleClick }
      >
        {isRecipeInProgress ? 'Continue Recipe' : 'Start Recipe'}
      </button>
    </section>
  );
}

RenderMealsWithId.propTypes = {
  drinksRecommendation: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  loading: PropTypes.bool.isRequired,
  meals: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default RenderMealsWithId;
