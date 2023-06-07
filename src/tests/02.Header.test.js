import { screen, fireEvent, waitFor } from '@testing-library/react';
import renderWithRouterAndContext from '../utils/renderWithRouterAndContext';

import { BUTTON_SEARCH, FIRST_LETTER_RADIO, NAME_SEARCH_RADIO, PAGE_TITLE, PROFILE_TOP_BTN, SEARCH_TOP_BTN, SEARCH_INPUT, INGREDIENT_SEARCH_RADIO } from '../utils/dataTestIds';

import Header from '../components/Header';
import App from '../App';

afterEach(jest.restoreAllMocks);

describe('Testa componente Header', () => {
  it('Testa se o Header é renderizado com o nome correto da Página', () => {
    renderWithRouterAndContext(<Header name="Meals" />);
    const h1 = screen.getByTestId(PAGE_TITLE);
    expect(h1.textContent).toBe('Meals');
  });

  it('Testa se ao clicar no Profile a rota é alterada para /profile', () => {
    const { history } = renderWithRouterAndContext(<Header />);

    const imgProfile = screen.getByTestId(PROFILE_TOP_BTN);
    expect(imgProfile).toBeDefined();

    fireEvent.click(imgProfile);

    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });

  it('Testa condicional true do botão  de pesquisa', () => {
    renderWithRouterAndContext(<Header pageWithAllHeader />);

    const btnSearch = screen.queryByTestId(SEARCH_TOP_BTN);
    expect(btnSearch).toBeDefined();
  });

  it('Testa condicional false do botão  de pesquisa', () => {
    renderWithRouterAndContext(<Header pageWithAllHeader={ false } />);

    const btnSearch = screen.queryByTestId(SEARCH_TOP_BTN);
    expect(btnSearch).toBeNull();
  });

  it('Testa os elementos da barra de pesquisa', () => {
    renderWithRouterAndContext(<Header pageWithAllHeader />);

    const btnSearch = screen.queryByTestId(SEARCH_TOP_BTN);

    fireEvent.click(btnSearch);

    const inputText = screen.getByTestId(SEARCH_INPUT);
    const radioIngredients = screen.getByTestId(INGREDIENT_SEARCH_RADIO);
    const radioName = screen.getByTestId(NAME_SEARCH_RADIO);
    const radioFirstLetter = screen.getByTestId(FIRST_LETTER_RADIO);
    const btnSubmitSearch = screen.getByTestId(BUTTON_SEARCH);

    expect(inputText).toBeDefined();
    expect(radioIngredients).toBeDefined();
    expect(radioName).toBeDefined();
    expect(radioFirstLetter).toBeDefined();
    expect(btnSubmitSearch).toBeDefined();
  });

  it('Testa o alert do radio First Letter', () => {
    renderWithRouterAndContext(<Header pageWithAllHeader />);

    const btnSearch = screen.queryByTestId(SEARCH_TOP_BTN);
    fireEvent.click(btnSearch);

    // Espiona o método global 'alert'
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    const radioFirstLetter = screen.getByTestId(FIRST_LETTER_RADIO);
    fireEvent.click(radioFirstLetter);

    const inputText = screen.getByTestId(SEARCH_INPUT);
    fireEvent.change(inputText, { target: { value: 'aaa' } });

    const btnSubmitSearch = screen.getByTestId(BUTTON_SEARCH);
    fireEvent.click(btnSubmitSearch);

    // Verifica se o método 'alert' foi chamado
    expect(window.alert).toHaveBeenCalled();
  });

  it('Testa a construção correta da URL na página Meals', () => {
    renderWithRouterAndContext(<Header pageWithAllHeader name="Meals" />);

    const mockFetch = jest.spyOn(window, 'fetch');

    const btnSearch = screen.queryByTestId(SEARCH_TOP_BTN);
    fireEvent.click(btnSearch);

    const inputText = screen.getByTestId(SEARCH_INPUT);
    fireEvent.change(inputText, { target: { value: 'chicken' } });

    const radioIngredients = screen.getByTestId(INGREDIENT_SEARCH_RADIO);
    fireEvent.click(radioIngredients);

    const btnSubmitSearch = screen.getByTestId(BUTTON_SEARCH);
    fireEvent.click(btnSubmitSearch);

    expect(mockFetch).toHaveBeenCalledWith(
      'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken',
    );
  });

  it('Testa a construção correta da URL na página Drinks', () => {
    renderWithRouterAndContext(<Header pageWithAllHeader name="Drinks" />);

    const mockFetch = jest.spyOn(window, 'fetch');

    const btnSearch = screen.queryByTestId(SEARCH_TOP_BTN);
    fireEvent.click(btnSearch);

    const inputText = screen.getByTestId(SEARCH_INPUT);
    fireEvent.change(inputText, { target: { value: 'lemon' } });

    const radioIngredients = screen.getByTestId(INGREDIENT_SEARCH_RADIO);
    fireEvent.click(radioIngredients);

    const btnSubmitSearch = screen.getByTestId(BUTTON_SEARCH);
    fireEvent.click(btnSubmitSearch);

    expect(mockFetch).toHaveBeenCalledWith(
      'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=lemon',
    );
  });

  it('Testa se a página é redirecionada para details com o id da receita quando a api retorna apenas uma receita na página Meals', async () => {
    const { history } = renderWithRouterAndContext(<App />, '/meals');

    const btnSearch = screen.queryByTestId(SEARCH_TOP_BTN);
    fireEvent.click(btnSearch);

    const inputText = screen.getByTestId(SEARCH_INPUT);
    fireEvent.change(inputText, { target: { value: 'Arrabiata' } });

    const radioName = screen.getByTestId(NAME_SEARCH_RADIO);
    fireEvent.click(radioName);

    const btnSubmitSearch = screen.getByTestId(BUTTON_SEARCH);
    fireEvent.click(btnSubmitSearch);

    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/meals/52771');
    });
  });

  it('Testa se a página é redirecionada para details com o id da receita quando a api retorna apenas uma receita na página Drinks', async () => {
    const { history } = renderWithRouterAndContext(<App />, '/drinks');

    const btnSearch = screen.queryByTestId(SEARCH_TOP_BTN);
    fireEvent.click(btnSearch);

    const inputText = screen.getByTestId(SEARCH_INPUT);
    fireEvent.change(inputText, { target: { value: 'Aquamarine' } });

    const radioName = screen.getByTestId(NAME_SEARCH_RADIO);
    fireEvent.click(radioName);

    const btnSubmitSearch = screen.getByTestId(BUTTON_SEARCH);
    fireEvent.click(btnSubmitSearch);

    expect(btnSubmitSearch).toBeDefined();

    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/drinks/178319');
    });
  });
});
