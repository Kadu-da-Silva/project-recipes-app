import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import doneItemsMock from '../mock/tempMock';
import shareImg from '../images/shareIcon.svg';

function DoneRecipes() {
  if (!localStorage.doneRecipes) {
    localStorage.setItem('doneRecipes', JSON.stringify(doneItemsMock));
  }
  const [linkCopied, setLinkCopied] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');
  const getItemsFromLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));

  // const renderTags = (tags, index) => {
  //   if (tags === null || tags === undefined) {
  //     return '';
  //   }
  //   const splitTags = tags.split(',');
  //   const mappedTags = splitTags.map((tag) => (
  //     <div
  //       key={ tag }
  //       data-testid={ `${index}-${tag}-horizontal-tag` }
  //     >
  //       {tag}
  //     </div>
  //   ));
  //   const returningTags = mappedTags[1] ? [mappedTags[0], mappedTags[1]] : mappedTags[0];
  //   return returningTags;
  // };

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

  return (
    <div>
      <Header
        pageWithAllHeader={ false }
        name="Done Recipes"
      />
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
                {item.tags.length > 0 && (
                  <div>
                    {item.tags.map((tag) => (
                      <p
                        key={ tag }
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                      >
                        {tag}
                      </p>
                    ))}
                  </div>)}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default DoneRecipes;
