import { createContext, useState } from "react";

export const IdContext = createContext();

export const IdProvider = ({children}) => {
  const [id, setId] = useState(null);

  return <IdContext.Provider value={{id, setId}}>
    {children}
  </IdContext.Provider>
}