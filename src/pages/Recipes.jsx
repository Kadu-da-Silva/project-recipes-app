import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import RenderMealsAndDrinks from '../Components/RenderMealsAndDrinks';
import MyContext from '../context/MyContext';
import { fetchApi } from '../services/fetchApi';

function Recipes() {
  const { globalState: { meals, drinks, type },
    globalState, setGlobalState } = useContext(MyContext);
  const { location: { pathname } } = useHistory();
  const URL = (pathname !== '/meals') ? 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' : 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  useEffect(() => {
    fetchApi(URL, globalState, setGlobalState);
  }, [type]);

  return (
    <div>
      <Header pageWithAllHeader name={ (pathname === '/meals') ? 'Meals' : 'Drinks' } />
      <RenderMealsAndDrinks drinks={ drinks } meals={ meals } />
      <Footer />
    </div>
  );
}

export default Recipes;
