import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import MyProvider from '../context/MyProvider';

// Recebe como parâmetro o componente e a rota
function renderWithRouterAndContext(component, path = '/') {
  const history = createMemoryHistory({ initialEntries: [path] });

  return {
    ...render(
      <MyProvider>
        <Router history={ history }>
          {component}
        </Router>
      </MyProvider>,
    ),
    history,
  };
}
export default renderWithRouterAndContext;
