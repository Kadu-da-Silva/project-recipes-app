import React, { useContext } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import RenderMealsAndDrinks from '../Components/RenderMealsAndDrinks';
import MyContext from '../context/MyContext';

function Meals() {
  const { globalState: { meals } } = useContext(MyContext);
  return (
    <div>
      <Header pageWithAllHeader name="Meals" />
      <RenderMealsAndDrinks meals={ meals } />
      <Footer />
    </div>
  );
}

export default Meals;
