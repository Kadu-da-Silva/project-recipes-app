import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from '../utils/renderWithRouterAndContext';
import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';
import App from '../App';

describe('Testa a página Meals', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(meals),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(drinks),
    });
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const emailTeste = 'teste@teste.com';
  it('Testando meals route', () => {
    const { history } = renderWithRouterAndContext(<App />);

    const email = screen.getByPlaceholderText(/email/i);
    userEvent.type(email, emailTeste);
    const pass = screen.getByPlaceholderText(/password/i);
    userEvent.type(pass, '1234567');
    const login = screen.getByRole('button', { name: /enter/i });
    userEvent.click(login);

    waitFor(() => {
      const corba = screen.getByText(/corba/i);
      expect(corba).toBeInTheDocument();
      userEvent.click(corba);
      expect(history.location.pathname).toBe('/53026');
    });
  });
  it('Testando drinks route', () => {
    const { history } = renderWithRouterAndContext(<App />);

    const email = screen.getByPlaceholderText(/email/i);
    userEvent.type(email, emailTeste);
    const pass = screen.getByPlaceholderText(/password/i);
    userEvent.type(pass, '1234567');
    const login = screen.getByRole('button', { name: /enter/i });
    userEvent.click(login);
    const drinksBtn = screen.getByRole('button', { name: /drinkicon/i });
    userEvent.click(drinksBtn);

    waitFor(() => {
      const smut = screen.getByText(/smut/i);
      expect(smut).toBeInTheDocument();
      userEvent.click(smut);
      expect(history.location.pathname).toBe('/17141');
    });
  });
  it('Testando se faz o redirecionamento quando a pesquisa retorna apenas um resultado no Meals', () => {
    const { history } = renderWithRouterAndContext(<App />);

    const email = screen.getByPlaceholderText(/email/i);
    userEvent.type(email, emailTeste);
    const pass = screen.getByPlaceholderText(/password/i);
    userEvent.type(pass, '1234567');
    const login = screen.getByRole('button', { name: /enter/i });
    userEvent.click(login);
    const searchBtn = screen.getByRole('img', { name: /search/i });
    userEvent.click(searchBtn);
    const searchBar = screen.getByPlaceholderText(/pesquisar/i);
    userEvent.type(searchBar, 'corba');
    const nameRadio = screen.getByRole('radio', {
      name: /name/i,
    });
    userEvent.click(nameRadio);
    waitFor(() => {
      const beefCat = screen.getByText(/beef/i);
      expect(beefCat).toBeInTheDocument();
      const search = screen.getByRole('button', {
        name: /pesquisar/i,
      });
      userEvent.click(search);
      expect(history.location.pathname).toBe('/52977');
    });
  });
  it('Testando se faz o redirecionamento quando a pesquisa retorna apenas um resultado no Drinks', () => {
    const { history } = renderWithRouterAndContext(<App />);

    const email = screen.getByPlaceholderText(/email/i);
    userEvent.type(email, emailTeste);
    const pass = screen.getByPlaceholderText(/password/i);
    userEvent.type(pass, '1234567');
    const login = screen.getByRole('button', { name: /enter/i });
    userEvent.click(login);
    const drinksBtn = screen.getByRole('button', { name: /drinkicon/i });
    userEvent.click(drinksBtn);
    const searchBtn = screen.getByRole('img', { name: /search/i });
    userEvent.click(searchBtn);
    const searchBar = screen.getByPlaceholderText(/pesquisar/i);
    userEvent.type(searchBar, 'kir royale');
    const nameRadio = screen.getByRole('radio', {
      name: /name/i,
    });
    userEvent.click(nameRadio);
    waitFor(() => {
      const cocoaCat = screen.getByText(/cocoa/i);
      expect(cocoaCat).toBeInTheDocument();
      const search = screen.getByRole('button', {
        name: /pesquisar/i,
      });
      userEvent.click(search);
      expect(history.location.pathname).toBe('/13837');
    });
  });
  it('Testando o botão All, Meals', () => {
    renderWithRouterAndContext(<App />);

    const email = screen.getByPlaceholderText(/email/i);
    userEvent.type(email, emailTeste);
    const pass = screen.getByPlaceholderText(/password/i);
    userEvent.type(pass, '1234567');
    const login = screen.getByRole('button', { name: /enter/i });
    userEvent.click(login);

    waitFor(() => {
      const allCat = screen.getByText(/all/i);
      userEvent.click(allCat);
      expect('fetchApi').toHaveBeenCalled();
      const cards = screen.getAllByRole('link');
      expect(cards).toHaveLength(12);
    });
  });
  it('Testando o botão All, Drinks', () => {
    renderWithRouterAndContext(<App />);

    const email = screen.getByPlaceholderText(/email/i);
    userEvent.type(email, emailTeste);
    const pass = screen.getByPlaceholderText(/password/i);
    userEvent.type(pass, '1234567');
    const login = screen.getByRole('button', { name: /enter/i });
    userEvent.click(login);
    const drinksBtn = screen.getByRole('button', { name: /drinkicon/i });
    userEvent.click(drinksBtn);

    waitFor(() => {
      const allCat = screen.getByText(/all/i);
      userEvent.click(allCat);
      expect('fetchApi').toHaveBeenCalled();
      const cards = screen.getAllByRole('link');
      expect(cards).toHaveLength(12);
    });
  });
  it('Testando outras categorias, Melas', () => {
    renderWithRouterAndContext(<App />);

    const email = screen.getByPlaceholderText(/email/i);
    userEvent.type(email, emailTeste);
    const pass = screen.getByPlaceholderText(/password/i);
    userEvent.type(pass, '1234567');
    const login = screen.getByRole('button', { name: /enter/i });
    userEvent.click(login);

    waitFor(() => {
      const chikenCat = screen.getByRole('button', { name: /chicken/i });
      userEvent.click(chikenCat);
      expect('fetchApi').toHaveBeenCalled();
      const chickenCard = screen.getByText(/chicken congee/i);
      expect(chickenCard).toBeInTheDocument();
    });
  });
  it('Testando outras categorias, Drinks', () => {
    renderWithRouterAndContext(<App />);

    const email = screen.getByPlaceholderText(/email/i);
    userEvent.type(email, emailTeste);
    const pass = screen.getByPlaceholderText(/password/i);
    userEvent.type(pass, '1234567');
    const login = screen.getByRole('button', { name: /enter/i });
    userEvent.click(login);
    const drinksBtn = screen.getByRole('button', { name: /drinkicon/i });
    userEvent.click(drinksBtn);

    waitFor(() => {
      const cocoaCat = screen.getByText(/cocoa/i);
      userEvent.click(cocoaCat);
      expect('fetchApi').toHaveBeenCalled();
      const chocoCard = screen.getByText(/chocolate beverage/i);
      expect(chocoCard).toBeInTheDocument();
    });
  });
});
