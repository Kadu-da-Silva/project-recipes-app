import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import shareIcon from '../images/shareIcon.svg';
import heartIcon from '../images/whiteHeartIcon.svg';

import style from '../pages/RecipeDetails.module.css';

function RenderDrinksWithId({ drinks, mealsRecommendation, loading }) {
  const [isRecipeInProgress, setIsRecipeInProgress] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const history = useHistory();

  useEffect(() => {
    // Verificar se a receita está salva no localStorage
    const inProgressRecipesJSON = localStorage.getItem('inProgressRecipes');
    if (inProgressRecipesJSON) {
      const inProgressRecipes = JSON.parse(inProgressRecipesJSON);
      if (inProgressRecipes.drinks && inProgressRecipes.drinks[drinks[0].idDrink]) {
        setIsRecipeInProgress(true);
      }
    }
  }, [drinks]);

  const drink = drinks[0];

  const renderIngredientsDrinks = () => {
    const ingredients = [];
    const MAX_LENGTH = 15;

    for (let i = 0; i <= MAX_LENGTH; i += 1) {
      const ingredient = drink[`strIngredient${i}`];
      const measure = drink[`strMeasure${i}`];

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

  const renderMealsRecommendation = () => {
    if (loading) {
      return <p>Loading recommendation...</p>;
    }

    return (
      <div className={ style.carousel }>
        <div className={ style.carousel_inner }>
          {mealsRecommendation.map(({ strMeal, strMealThumb }, index) => (
            <div
              key={ index }
              className={ style.carousel_item }
              data-testid={ `${index}-recommendation-card` }
            >
              <img src={ strMealThumb } alt={ strMeal } />
              <p data-testid={ `${index}-recommendation-title` }>{strMeal}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handleClick = () => {
    const { idDrink } = drink;
    const ingredients = [];
    const MAX_LENGTH = 15;

    for (let i = 0; i <= MAX_LENGTH; i += 1) {
      const ingredient = drink[`strIngredient${i}`];
      const measure = drink[`strMeasure${i}`];

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
    if (!inProgressRecipes.drinks) {
      inProgressRecipes.drinks = {};
    }

    inProgressRecipes.drinks[idDrink] = ingredients;

    // Passo 3: Salvar o objeto atualizado de volta no localStorage
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));

    history.push(`/drinks/${idDrink}/in-progress`);
  };

  const handleBtnShare = () => {
    const link = window.location.href;

    // Copiar o link para o clipboard
    navigator.clipboard.writeText(link);

    // Exibir mensagem de link copiado
    setIsLinkCopied(true);

    // Resetar a mensagem após alguns segundos
    const MAX = 3000;
    setTimeout(() => {
      setIsLinkCopied(false);
    }, MAX);
  };

  const handleBtnFavorite = () => {
    const { idDrink, strCategory, strDrink, strDrinkThumb, strAlcoholic } = drink;

    const recipe = {
      id: idDrink,
      type: 'drink',
      nationality: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
    };

    // Passo 1: Recuperar o valor atual do localStorage
    const favoriteRecipesJSON = localStorage.getItem('favoriteRecipes');
    let favoriteRecipes = [];

    // Verificar se já existe um valor no localStorage
    if (favoriteRecipesJSON) {
      favoriteRecipes = JSON.parse(favoriteRecipesJSON);
    }

    // Passo 2: Adicionar o novo favorito ao array existente
    favoriteRecipes.push(recipe);

    // Passo 3: Salvar o array atualizado de volta no localStorage
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  };

  if (!drinks) {
    return <p>Loading...</p>;
  }

  return (
    <section className={ style.section }>
      <button onClick={ handleBtnShare } className={ style.shareIcon }>
        <img src={ shareIcon } alt="Compartilhar" data-testid="share-btn" />
      </button>
      <button onClick={ handleBtnFavorite } className={ style.favoriteIcon }>
        <img src={ heartIcon } alt="Favoritar" data-testid="favorite-btn" />
      </button>
      <h1 data-testid="recipe-title">{drink.strDrink}</h1>
      <div className={ style.containerImg }>
        <img
          src={ drink.strDrinkThumb }
          alt={ drink.strDrink }
          data-testid="recipe-photo"
          className={ style.imgRecipe }
        />
      </div>
      <p
        data-testid="recipe-category"
        className={ style.category }
      >
        {drink.strAlcoholic}
      </p>
      <h2>Ingredients:</h2>
      <div className={ style.container }>
        <ul>{renderIngredientsDrinks()}</ul>
      </div>
      <h2>Instructions:</h2>
      <div className={ style.container }>
        <p data-testid="instructions">{drink.strInstructions}</p>
      </div>
      <h2>Recommendation</h2>
      {renderMealsRecommendation()}
      <button
        data-testid="start-recipe-btn"
        className={ style.btnStart }
        onClick={ handleClick }
      >
        {isRecipeInProgress ? 'Continue Recipe' : 'Start Recipe'}
      </button>
      {isLinkCopied && <p className={ style.alert }>Link copied!</p>}
    </section>
  );
}

RenderDrinksWithId.propTypes = {
  drinks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  loading: PropTypes.bool.isRequired,
  mealsRecommendation: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default RenderDrinksWithId;
