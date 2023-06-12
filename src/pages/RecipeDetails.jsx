import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';

import style from './RecipeDetails.module.css';

function RecipeDetails() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const { id } = useParams();

  const [dataApi, setDataApi] = useState({});
  const [loading, setLoading] = useState(true);
  const [drinksRecommendation, setDrinksRecommendation] = useState([]);
  const [mealsRecommendation, setMealsRecommendation] = useState([]);

  const fetchApiMeals = async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const resultMeals = await response.json();
    const { meals } = resultMeals;
    setDataApi({ meals });
  };

  const fetchApiDrinks = async () => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const resultDrinks = await response.json();
    const { drinks } = resultDrinks;
    setDataApi({ drinks });
  };

  const handleApis = async () => {
    if (pathname.includes('meals')) { await fetchApiMeals(); }
    if (pathname.includes('drinks')) { await fetchApiDrinks(); }
  };

  const fetchApiDrinksForRecommendation = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const { drinks } = await response.json();
    const MAX = 6;
    const firstSix = drinks.slice(0, MAX);
    setDrinksRecommendation(firstSix);
    setLoading(false);
  };

  const fetchApiMealsForRecommendation = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const { meals } = await response.json();
    const MAX = 6;
    const firstSix = meals.slice(0, MAX);
    setMealsRecommendation(firstSix);
    setLoading(false);
  };

  useEffect(() => {
    handleApis();
    fetchApiDrinksForRecommendation();
    fetchApiMealsForRecommendation();
  }, []);

  const renderMeals = () => {
    const { meals } = dataApi;

    if (!meals) {
      return <p>Loading...</p>;
    }

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

    return (
      <section className={ style.section }>
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
      </section>
    );
  };

  const renderDrinks = () => {
    const { drinks } = dataApi;

    if (!drinks) {
      return <p>Loading...</p>;
    }

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

    return (
      <section className={ style.section }>
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
      </section>
    );
  };

  return (
    <div>
      {pathname.includes('meals') && renderMeals()}
      {pathname.includes('drinks') && renderDrinks()}
      <button
        data-testid="start-recipe-btn"
        className={ style.btnStart }
        // onClick={ handleClick }
      >
        Start Recipe
      </button>
    </div>
  );
}

export default RecipeDetails;
