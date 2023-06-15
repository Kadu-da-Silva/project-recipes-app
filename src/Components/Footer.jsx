import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import MyContext from '../context/MyContext';

// import style from './Footer.module.css';

export default function Footer() {
  //   const { hasFooter } = props;
  const { globalState, setGlobalState } = useContext(MyContext);
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
      // className={ style.footer }
    >
      <button
        onClick={ () => {
          navigate('/meals');
          setGlobalState({ ...globalState, type: 'meals' });
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
          setGlobalState({ ...globalState, type: 'drinks' }); // Adiciona a chave type no global para controlar a chamada da API que acontece em meals e drinks
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
