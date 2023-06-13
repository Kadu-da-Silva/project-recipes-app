import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import Footer from '../Components/Footer';
import renderWithRouterAndContext from '../utils/renderWithRouterAndContext';

const mealsTestID = 'meals-bottom-btn';
const drinksTestID = 'drinks-bottom-btn';
describe('Testando Footer', () => {
  it('Testando se footer renderiza', () => {
    renderWithRouterAndContext(<Footer />);

    const mealsBtn = screen.getByTestId(mealsTestID);
    const drinksBtn = screen.getByTestId(drinksTestID);

    expect(drinksBtn).toBeInTheDocument();
    expect(mealsBtn).toBeInTheDocument();
  });
  it('Testando drinks route', () => {
    const { history } = renderWithRouterAndContext(<Footer />);

    const drinksBtn = screen.getByTestId(drinksTestID);

    act(() => {
      userEvent.click(drinksBtn);
    });
    expect(history.location.pathname).toBe('/drinks');
  });
  it('Testando drinks route', () => {
    const { history } = renderWithRouterAndContext(<Footer />);

    const mealsBtn = screen.getByTestId(mealsTestID);

    act(() => {
      userEvent.click(mealsBtn);
    });
    expect(history.location.pathname).toBe('/meals');
  });
});
