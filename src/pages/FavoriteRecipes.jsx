import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import favoriteItemsMock from '../mock/favoriteItems';

import shareImg from '../images/shareIcon.svg';

import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  // if (!localStorage.favoriteRecipes) {
  //   localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteItemsMock));
  // }
  // let getItemsFromLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [favoriteArray, setFavoritedArray] = useState(favoriteItemsMock);
  const [linkCopied, setLinkCopied] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');

  const copyLink = ({ currentTarget: { id } }, mealID = null) => {
    const host = window.location.origin;
    const slug = mealID ? `/meals/${id}` : `/drinks/${id}`;
    const url = host + slug;
    navigator.clipboard.writeText(url);
    setLinkCopied({ [id]: true });
  };

  const filterList = (currentItem) => {
    switch (currentFilter) {
    case 'meals':
      return currentItem.type === 'meal';
    case 'drinks':
      return currentItem.type === 'drink';
    default:
      return true;
    }
  };

  const handleBtnFavorite = (e, currentItem) => {
    const isFavorited = favoriteArray.find((obj) => obj.id === currentItem);
    console.log(isFavorited);
    if (isFavorited) {
      // Remover a receita dos favoritos
      const updatedRecipes = favoriteArray
        .filter((obj) => obj.id !== isFavorited.id);

      localStorage.removeItem('favoriteRecipes');
      console.log(localStorage.getItem('favoriteRecipes'));
      localStorage.setItem('favoriteRecipes', JSON.stringify(updatedRecipes));
      console.log(localStorage.getItem('favoriteRecipes'));
      setFavoritedArray(updatedRecipes);
    }
  };

  return (
    <div>
      <Header pageWithAllHeader={ false } name="Favorite Recipes" />

      <nav>
        <button
          data-testid="filter-by-all-btn"
          onClick={ () => setCurrentFilter('all') }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          onClick={ () => setCurrentFilter('meals') }
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          onClick={ () => setCurrentFilter('drinks') }
        >
          Drinks
        </button>
      </nav>
      {favoriteArray && (
        <div className="done-list">
          {favoriteArray
            .filter((item) => filterList(item))
            .map((item, index) => (
              <div
                key={ item.idMeal ? item.idMeal : item.idDrink }
                style={ {
                  padding: '10px',
                  border: '1px solid black',
                  margin: '10px auto',
                  maxWidth: 'fit-content',
                } }
              >
                <Link
                  to={ `${item.type === 'meal'
                    ? `/meals/${item.id}` : `/drinks/${item.id}`}` }
                >
                  <img
                    src={ item.type === 'meal' ? item.image : item.image }
                    alt="done recipes card img"
                    data-testid={ `${index}-horizontal-image` }
                    style={ { maxWidth: '200px' } }
                  />
                </Link>
                <div data-testid={ `${index}-horizontal-top-text` }>
                  {item.type === 'meal'
                    ? `${item.nationality} - ${item.category}` : item.alcoholicOrNot}
                </div>
                <Link
                  to={ `${item.type === 'meal'
                    ? `/meals/${item.id}` : `/drinks/${item.id}`}` }
                >
                  <div data-testid={ `${index}-horizontal-name` }>
                    {item.type === 'meal' ? item.name : item.name}
                  </div>
                </Link>
                <div data-testid={ `${index}-horizontal-done-date` }>{item.doneDate}</div>
                <button
                  src={ blackHeartIcon }
                  onClick={ (e) => handleBtnFavorite(e, item.id) }
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  type="button"
                >
                  <img
                    src={ blackHeartIcon }
                    alt="favorite"
                  />
                </button>
                {item.type === 'meal' && (
                  <button
                    id={ item.id }
                    onClick={ (e) => copyLink(e, item.id) }
                  >
                    {linkCopied[item.id] && 'Link copied!'}
                    <img
                      src={ shareImg }
                      alt=""
                      data-testid={ `${index}-horizontal-share-btn` }
                    />
                  </button>
                )}
                {item.type === 'drink' && (
                  <button
                    id={ item.id }
                    onClick={ (e) => copyLink(e) }
                  >
                    {linkCopied[item.id] && 'Link copied!'}
                    <img
                      src={ shareImg }
                      alt=""
                      data-testid={ `${index}-horizontal-share-btn` }
                    />
                  </button>
                )}
                {/* {item.tags && item.tags.length > 0 && (
                  <div>
                    {item.tags.map((tag) => (
                      <p
                        key={ `${tag}-${index}` }
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                      >
                        {tag}
                      </p>
                    ))}
                  </div>)} */}
                {/* {linkCopied[item.id] && <span>Link Copied!</span>} */}
              </div>
            ))}
          <Footer />
        </div>
      )}

    </div>
  );
}
export default FavoriteRecipes;
