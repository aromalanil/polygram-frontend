import { createContext, useContext } from 'react';

const FetchQuestionContext = createContext(null);

export const useFetchContext = () => useContext(FetchQuestionContext);

export const FetchQuestionProvider = ({ value, children }) => (
  <FetchQuestionContext.Provider value={value}>{children}</FetchQuestionContext.Provider>
);
