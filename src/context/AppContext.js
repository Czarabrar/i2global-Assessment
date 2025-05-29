import React, {createContext, useState} from 'react';

export const AppContext = createContext();

export const AppProvider = ({children}) => {
  const [unit, setUnit] = useState('metric');
  const [categories, setCategories] = useState(['general']);

  return (
    <AppContext.Provider value={{unit, setUnit, categories, setCategories}}>
      {children}
    </AppContext.Provider>
  );
};
