import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import DoneRecipes from '../pages/DoneRecipes';
import localStorageMock from '../tests/mocks/localStorageMock';

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
    render(<DoneRecipes />);

    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();

    const allBtn = screen.getByTestId(allBtnID);
    expect(allBtn).toBeInTheDocument();
    const mealBtn = screen.getByTestId(mealBtnID);
    expect(mealBtn).toBeInTheDocument();
    const drinkBtn = screen.getByTestId(drinkBtnID);
    expect(drinkBtn).toBeInTheDocument();
  });
});
