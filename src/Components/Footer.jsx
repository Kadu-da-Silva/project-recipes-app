import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  //   const { hasFooter } = props;
  const history = useHistory();

  const navigate = (path) => {
    history.push(path);
  };
  return (
    // <div>
    //   {hasFooter && (
    //     <footer data-testid="footer">
    //       <button data-testid="meals-bottom-btn">
    //         <img
    //           src={mealIcon}
    //           alt="mealIcon"
    //         />
    //       </button>
    //       <button data-testid="drinks-bottom-btn">
    //         <img
    //           src={drinkIcon}
    //           alt="drinkIcon"
    //         />
    //       </button>
    //     </footer>
    //   )}
    // </div>
    <footer
      data-testid="footer"
      style={ { position: 'fixed', bottom: '0px' } }
    >
      <button
        onClick={ () => {
          navigate('/meals');
        } }
      >
        <img
          src={ mealIcon }
          alt="mealIcon"
          data-testid="meals-bottom-btn"
        />
      </button>
      <button
        onClick={ () => {
          navigate('/drinks');
        } }
      >
        <img
          src={ drinkIcon }
          alt="drinkIcon"
          data-testid="drinks-bottom-btn"
        />
      </button>
    </footer>
  );
}
