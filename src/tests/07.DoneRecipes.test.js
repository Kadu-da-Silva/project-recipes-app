import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from '../utils/renderWithRouterAndContext';
import DoneRecipes from '../pages/DoneRecipes';
import localStorageMock from './mocks/localStorageMock';

const allBtnID = 'filter-by-all-btn';
const mealBtnID = 'filter-by-meal-btn';
const drinkBtnID = 'filter-by-drink-btn';

describe('Testando DoneRecipes', () => {
  beforeEach(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(localStorageMock));
  });

  afterEach(() => {
    localStorage.clear();
  });
  it('Testando se todos os items do filter estao renderizando', () => {
    renderWithRouterAndContext(<DoneRecipes />, '/done-recipes');

    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();

    const allBtn = screen.getByTestId(allBtnID);
    expect(allBtn).toBeInTheDocument();
    const mealBtn = screen.getByTestId(mealBtnID);
    expect(mealBtn).toBeInTheDocument();
    const drinkBtn = screen.getByTestId(drinkBtnID);
    expect(drinkBtn).toBeInTheDocument();
  });
  it('Testando se todos os items da lista estao renderizando', () => {
    renderWithRouterAndContext(<DoneRecipes />, '/done-recipes');

    const FoodImg = screen.getByTestId('0-horizontal-image');
    expect(FoodImg).toBeInTheDocument();
    const foodCategory = screen.getByTestId('0-horizontal-top-text');
    expect(foodCategory).toBeInTheDocument();
    expect(foodCategory.innerHTML).toBe('Italian - Vegetarian');
    const foodName = screen.getByTestId('0-horizontal-name');
    expect(foodName).toBeInTheDocument();
    expect(foodName.innerHTML).toBe('Spicy Arrabiata Penne');
    const foodTag1 = screen.getByTestId('0-Pasta-horizontal-tag');
    expect(foodTag1).toBeInTheDocument();
    expect(foodTag1.innerHTML).toBe('Pasta');
    const foodTag2 = screen.getByTestId('0-Curry-horizontal-tag');
    expect(foodTag2).toBeInTheDocument();
    expect(foodTag2.innerHTML).toBe('Curry');
    const foodShareBtn = screen.

    const secondImg = screen.getByTestId('1-horizontal-image');
    expect(secondImg).toBeInTheDocument();

    const allBtn = screen.getByTestId(allBtnID);
    expect(allBtn).toBeInTheDocument();
    const mealBtn = screen.getByTestId(mealBtnID);
    expect(mealBtn).toBeInTheDocument();
    const drinkBtn = screen.getByTestId(drinkBtnID);
    expect(drinkBtn).toBeInTheDocument();
  });
});
