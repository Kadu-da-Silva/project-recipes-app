import React, { useContext } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import RenderMealsAndDrinks from '../Components/RenderMealsAndDrinks';
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
