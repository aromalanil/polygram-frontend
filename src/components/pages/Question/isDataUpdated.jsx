import { createContext, useContext } from 'react';

const RefetchRefContext = createContext(null);
export const useRefetchData = () => useContext(RefetchRefContext);

export const RefetchRefProvider = ({ value, children }) => (
  <RefetchRefContext.Provider value={value}>{children}</RefetchRefContext.Provider>
);
