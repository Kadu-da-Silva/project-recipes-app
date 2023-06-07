import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RenderMealsAndDrinks from '../components/RenderMealsAndDrinks';
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
