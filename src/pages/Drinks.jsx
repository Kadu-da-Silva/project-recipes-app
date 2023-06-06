import React, { useContext, useEffect } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import RenderMealsAndDrinks from '../Components/RenderMealsAndDrinks';
import MyContext from '../context/MyContext';
import { fetchApi } from '../services/fetchApi';

function Drinks() {
  const { globalState: { drinks },
    globalState, setGlobalState, type } = useContext(MyContext);
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  useEffect(() => {
    fetchApi(URL, globalState, setGlobalState);
  }, [type]); // Monitora type, assim, toda vez que renderizar Drinks ele pega os primeiros 12 resultados

  return (
    <div>
      <Header pageWithAllHeader name="Drinks" />
      <RenderMealsAndDrinks drinks={ drinks } />
      <Footer />
    </div>
  );
}

export default Drinks;
