import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import favoriteItemsMock from '../mock/favoriteItems';

import shareImg from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FavoriteRecipes() {
  if (!localStorage.favoriteRecipes) {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteItemsMock));
  }
  const [linkCopied, setLinkCopied] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');
  const getItemsFromLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [setIsRecipeFavorited] = useState(false);

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

  const handleBtnFavorite = () => {
    const { idMeal, strCategory, strMeal, strMealThumb, strArea } = meal;

    const recipe = {
      id: idMeal,
      type: 'meal',
      nationality: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
    };

    // Passo 1: Recuperar o valor atual do localStorage
    const favoriteRecipesJSON = localStorage.getItem('favoriteRecipes');
    let favoriteRecipes = [];

    // Verificar se já existe um valor no localStorage
    if (favoriteRecipesJSON) {
      favoriteRecipes = JSON.parse(favoriteRecipesJSON);
    }

    // Passo 2: Adicionar o novo favorito ao array existente e verificar se a receita já está favoritada
    const isFavorited = favoriteRecipes.some((obj) => obj.id === idMeal);

    if (isFavorited) {
      // Remover a receita dos favoritos
      const updatedRecipes = favoriteRecipes
        .filter((obj) => obj.id !== idMeal);
      setIsRecipeFavorited(false);
      favoriteRecipes = updatedRecipes;
    } else {
      // Adicionar a receita aos favoritos
      favoriteRecipes.push(recipe);
      setIsRecipeFavorited(true);
    }

    // Passo 3: Salvar o array atualizado de volta no localStorage
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
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
      {getItemsFromLocalStorage && (
        <div className="done-list">
          {getItemsFromLocalStorage
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
                {console.log(item.tags)}
                {item.tags && item.tags.length > 0 && (
                  <div>
                    {item.tags.map((tag) => (
                      <p
                        key={ `${tag}-${index}` }
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                      >
                        {tag}
                      </p>
                    ))}
                  </div>)}
                <button
                  onClick={ () => handleBtnFavorite(item) }
                  type="button"
                >
                  <img
                    src={ item.isFavorite ? blackHeartIcon : whiteHeartIcon }
                    alt="favorite"
                    data-testid={ `${index}-horizontal-favorite-btn` }
                  />
                </button>
                {linkCopied[item.id] && <span>Link Copied!</span>}
              </div>

            ))}
        </div>
      )}

      <Footer />
    </div>
  );
}
export default FavoriteRecipes;
