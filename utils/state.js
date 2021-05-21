import { createContext, useContext, useState } from "react";

export const UserContext = createContext(null);

export function UserContextProvider({ children }) {
  const [userId, setUserId] = useState(null);
  return (
    <UserContext.Provider value={{ userId: userId, changeUserId: setUserId }}>
      {children}
    </UserContext.Provider>
  );
}
