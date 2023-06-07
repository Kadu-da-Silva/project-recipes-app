import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RenderMealsAndDrinks from '../components/RenderMealsAndDrinks';
import MyContext from '../context/MyContext';

function Drinks() {
  const { globalState: { drinks } } = useContext(MyContext);
  return (
    <div>
      <Header pageWithAllHeader name="Drinks" />
      <RenderMealsAndDrinks drinks={ drinks } />
      <Footer />
    </div>
  );
}

export default Drinks;
