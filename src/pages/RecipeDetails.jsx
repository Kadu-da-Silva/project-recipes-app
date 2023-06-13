import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';

import RenderMealsWithId from '../Components/RenderMealsWithId';
import RenderDrinksWithId from '../Components/RenderDrinksWithId';

import {
  fetchApiMeals,
  fetchApiDrinks,
  fetchApiMealsForRecommendation,
  fetchApiDrinksForRecommendation,
} from '../services/fetchApi';

function RecipeDetails() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const { id } = useParams();

  const [dataApi, setDataApi] = useState({ meals: [{}], drinks: [{}] });
  const [loading, setLoading] = useState(true);
  const [drinksRecommendation, setDrinksRecommendation] = useState([]);
  const [mealsRecommendation, setMealsRecommendation] = useState([]);

  const handleApis = async () => {
    if (pathname.includes('meals')) { await fetchApiMeals(id, setDataApi); }
    if (pathname.includes('drinks')) { await fetchApiDrinks(id, setDataApi); }
  };

  useEffect(() => {
    handleApis();
    fetchApiMealsForRecommendation(setMealsRecommendation, setLoading);
    fetchApiDrinksForRecommendation(setDrinksRecommendation, setLoading);
  }, []);

  return (
    <div>
      {pathname.includes('meals')
      && <RenderMealsWithId
        meals={ dataApi.meals }
        drinksRecommendation={ drinksRecommendation }
        loading={ loading }
        id={ id }
      />}
      {pathname.includes('drinks')
      && <RenderDrinksWithId
        drinks={ dataApi.drinks }
        mealsRecommendation={ mealsRecommendation }
        loading={ loading }
        id={ id }
      />}
    </div>
  );
}

export default RecipeDetails;
