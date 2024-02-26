import React, { createContext, useState } from 'react';

export const UserContext = createContext({});

export default function UserContextProvider({children}) {
    const [userInfo , setUserinfo] = useState({});
  return (
    <UserContext.Provider value = {{userInfo , setUserinfo}}>
    {children}
    </UserContext.Provider>
  )
}