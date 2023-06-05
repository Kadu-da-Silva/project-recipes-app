import React, { useState, useMemo } from 'react';
import { PropTypes } from 'prop-types';
import MyContext from './MyContext';

function MyProvider({ children }) {
  const [globalState, setGlobalState] = useState({});

  const contextValue = useMemo(() => ({ globalState, setGlobalState }), [
    globalState,
    setGlobalState,
  ]);

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element, PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};
export default MyProvider;
