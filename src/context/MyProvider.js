import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import MyContext from './MyContext';

function MyProvider({ children }) {
  const [globalState, setGlobalState] = useState('');

  return (
    <MyContext.Provider
      value={
        { globalState, setGlobalState }
      }
    >
      {children}
    </MyContext.Provider>
  );
}

// Comenta

MyProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

export default MyProvider;
