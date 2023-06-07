import React, { useState } from 'react';
import Header from '../Components/Header';
import doneItemsMock from '../mock/tempMock';
import shareImg from '../images/shareIcon.svg';

const tempDate = '23/06/2020';

function DoneRecipes() {
  const [linkCopied, setLinkCopied] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');

  const renderTags = (tags, index) => {
    if (tags === null || tags === undefined) {
      return '';
    }
    const splitTags = tags.split(',');
    const mappedTags = splitTags.map((tag) => (
      <div
        key={ tag }
        data-testid={ `${index}-${tag}-horizontal-tag` }
      >
        {tag}
      </div>
    ));
    const returningTags = mappedTags[1] ? [mappedTags[0], mappedTags[1]] : mappedTags[0];
    return returningTags;
  };

  const copyLink = ({ currentTarget: { id } }) => {
    const host = window.location.origin;
    const slug = `/meals/${id}`;
    const url = host + slug;
    navigator.clipboard.writeText(url);
    setLinkCopied({ [id]: true });
  };

  const filterList = (currentItem) => {
    switch (currentFilter) {
    case 'meals':
      return 'idMeal' in currentItem;
    case 'drinks':
      return 'idDrink' in currentItem;
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
      {doneItemsMock && (
        <div className="done-list">
          {doneItemsMock
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
                <img
                  src={ item.strMealThumb ? item.strMealThumb : item.strDrinkThumb }
                  alt="done recipes card img"
                  data-testid={ `${index}-horizontal-image` }
                  style={ { maxWidth: '200px' } }
                />
                <div data-testid={ `${index}-horizontal-top-text` }>
                  {item.idMeal
                    ? `${item.strArea} - ${item.strCategory}` : item.strAlcoholic}
                </div>
                <div data-testid={ `${index}-horizontal-name` }>
                  {item.idMeal ? item.strMeal : item.strDrink}
                </div>
                <div data-testid={ `${index}-horizontal-done-date` }>{tempDate}</div>
                {item.idMeal && (
                  <button
                    id={ item.idMeal }
                    onClick={ (e) => copyLink(e) }
                  >
                    {linkCopied[item.idMeal] && 'Link copied!'}
                    <img
                      src={ shareImg }
                      alt=""
                      data-testid={ `${index}-horizontal-share-btn` }
                    />
                  </button>
                )}
                {item.idDrink && (
                  <button
                    id={ item.idDrink }
                    onClick={ (e) => copyLink(e) }
                  >
                    {linkCopied[item.idDrink] && 'Link copied!'}
                    <img
                      src={ shareImg }
                      alt=""
                      data-testid={ `${index}-horizontal-share-btn` }
                    />
                  </button>
                )}
                {renderTags(item.strTags, index)}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default DoneRecipes;
