import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndContext from '../utils/renderWithRouterAndContext';

import RecipeDetails from '../pages/RecipeDetails';
// import App from '../App';

import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';

beforeEach(() => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(meals),
  });
  global.fetch.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(drinks),
  });
});
afterEach(() => {
  jest.clearAllMocks();
});

describe('Testa página de Detalhes', () => {
  it('Testa se api de comida é chamada com o id da receita', async () => {
    // jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    //   json: jest.fn().mockResolvedValue(meals),
    // }).mockResolvedValueOnce({
    //   json: jest.fn().mockResolvedValue(drinks),
    // });

    renderWithRouterAndContext(<RecipeDetails />, '/meals/52977');

    await waitFor(() => {
      const h1 = screen.getByTestId('recipe-title');
      expect(h1.textContent).toBe('Corba');
    });
  });

  // it('Testa se api de bebidas é chamada com o id da receita', async () => {
  //   // jest.spyOn(global, 'fetch').mockResolvedValueOnce({
  //   //   json: jest.fn().mockResolvedValue(meals),
  //   // }).mockResolvedValueOnce({
  //   //   json: jest.fn().mockResolvedValue(drinks),
  //   // });

  //   renderWithRouterAndContext(<RecipeDetails />, '/drinks/15997');

  //   await waitFor(() => {
  //     const h1 = screen.getByTestId('recipe-title');
  //     expect(h1.textContent).toBe('GG');
  //   });
  // });
});
