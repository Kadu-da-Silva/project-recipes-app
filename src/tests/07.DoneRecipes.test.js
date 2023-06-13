import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from '../utils/renderWithRouterAndContext';
import DoneRecipes from '../pages/DoneRecipes';
import doneItemsMock from '../mock/tempMock';

const allBtnID = 'filter-by-all-btn';
const mealBtnID = 'filter-by-meal-btn';
const drinkBtnID = 'filter-by-drink-btn';
const mealShareID = '0-horizontal-share-btn';
const drinkShareID = '1-horizontal-share-btn';
const PAGE_URL = '/done-recipes';

describe('Testando DoneRecipes', () => {
  beforeEach(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneItemsMock));
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('Testando se os botoes estao renderizando', () => {
    renderWithRouterAndContext(<DoneRecipes />, PAGE_URL);

    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();

    const allBtn = screen.getByTestId(allBtnID);
    expect(allBtn).toBeInTheDocument();
    const mealBtn = screen.getByTestId(mealBtnID);
    expect(mealBtn).toBeInTheDocument();
    const drinkBtn = screen.getByTestId(drinkBtnID);
    expect(drinkBtn).toBeInTheDocument();
  });

  it('Testando se pratos da lista estao renderizando', () => {
    renderWithRouterAndContext(<DoneRecipes />, PAGE_URL);

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
    const foodShareBtn = screen.getByTestId(mealShareID);
    expect(foodShareBtn).toBeInTheDocument();
  });

  it('Testando se drinks da lista estao renderizando', () => {
    renderWithRouterAndContext(<DoneRecipes />, PAGE_URL);

    const drinkImg = screen.getByTestId('1-horizontal-image');
    expect(drinkImg).toBeInTheDocument();
    const drinkCategory = screen.getByTestId('1-horizontal-top-text');
    expect(drinkCategory).toBeInTheDocument();
    expect(drinkCategory.innerHTML).toBe('Alcoholic');
    const drinkName = screen.getByTestId('1-horizontal-name');
    expect(drinkName).toBeInTheDocument();
    expect(drinkName.innerHTML).toBe('Aquamarine');
    const drinkShareBtn = screen.getByTestId(drinkShareID);
    expect(drinkShareBtn).toBeInTheDocument();
  });

  it('Testando funcionalidade dos boteos de filtro', () => {
    renderWithRouterAndContext(<DoneRecipes />, PAGE_URL);

    const mealBtn = screen.getByTestId(mealBtnID);
    const mealName = screen.getByText(/spicy arrabiata penne/i);
    const drinkName = screen.getByText(/aquamarine/i);

    expect(drinkName).toBeInTheDocument();
    expect(mealName).toBeInTheDocument();

    act(() => {
      userEvent.click(mealBtn);
    });

    expect(mealName).toBeInTheDocument();
    expect(drinkName).not.toBeInTheDocument();

    act(() => {
      userEvent.click(screen.getByTestId(drinkBtnID));
    });

    expect(screen.getByText(/aquamarine/i)).toBeInTheDocument();
    expect(screen.queryByText(/spicy arrabiata penne/i)).not.toBeInTheDocument();

    act(() => {
      userEvent.click(screen.getByTestId(allBtnID));
    });
    expect(screen.getByText(/spicy arrabiata penne/i)).toBeInTheDocument();
    expect(screen.getByText(/aquamarine/i)).toBeInTheDocument();
  });

  it('Testando botoes de share meal', () => {
    renderWithRouterAndContext(<DoneRecipes />, PAGE_URL);

    const writeText = jest.fn();

    Object.assign(navigator, {
      clipboard: {
        writeText,
      },
    });

    const foodShareBtn = screen.getByTestId(mealShareID);
    expect(foodShareBtn).toBeInTheDocument();
    const drinkShareBtn = screen.getByTestId(drinkShareID);
    expect(drinkShareBtn).toBeInTheDocument();

    act(() => {
      userEvent.click(foodShareBtn);
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost/meals/52771');
    expect(
      screen.getByRole('button', {
        name: /link copied!/i,
      }),
    ).toBeInTheDocument();
  });

  it('Testando botoes de share drink', () => {
    renderWithRouterAndContext(<DoneRecipes />, PAGE_URL);

    const writeText = jest.fn();

    Object.assign(navigator, {
      clipboard: {
        writeText,
      },
    });

    const foodShareBtn = screen.getByTestId(mealShareID);
    expect(foodShareBtn).toBeInTheDocument();
    const drinkShareBtn = screen.getByTestId(drinkShareID);
    expect(drinkShareBtn).toBeInTheDocument();

    act(() => {
      userEvent.click(drinkShareBtn);
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost/drinks/178319');
    expect(
      screen.getByRole('button', {
        name: /link copied!/i,
      }),
    ).toBeInTheDocument();
  });
  it('Testando link food img', () => {
    const { history } = renderWithRouterAndContext(<DoneRecipes />, PAGE_URL);

    const FoodImg = screen.getByTestId('0-horizontal-image');
    expect(FoodImg).toBeInTheDocument();
    act(() => {
      userEvent.click(FoodImg);
    });

    expect(history.location.pathname).toBe('/meals/52771');
  });
  it('Testando link food name', () => {
    const { history } = renderWithRouterAndContext(<DoneRecipes />, PAGE_URL);

    const foodName = screen.getByTestId('0-horizontal-name');
    expect(foodName).toBeInTheDocument();
    act(() => {
      userEvent.click(foodName);
    });

    expect(history.location.pathname).toBe('/meals/52771');
  });
  it('Testando link drink img', () => {
    const { history } = renderWithRouterAndContext(<DoneRecipes />, PAGE_URL);

    const drinkImg = screen.getByTestId('1-horizontal-image');
    expect(drinkImg).toBeInTheDocument();
    act(() => {
      userEvent.click(drinkImg);
    });

    expect(history.location.pathname).toBe('/drinks/178319');
  });
  it('Testando link drink name', () => {
    const { history } = renderWithRouterAndContext(<DoneRecipes />, PAGE_URL);

    const drinkName = screen.getByTestId('1-horizontal-name');
    expect(drinkName).toBeInTheDocument();
    act(() => {
      userEvent.click(drinkName);
    });

    expect(history.location.pathname).toBe('/drinks/178319');
  });
});
