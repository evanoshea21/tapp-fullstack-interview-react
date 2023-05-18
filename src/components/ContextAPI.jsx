// for global state

import React from 'react'

const Context = React.createContext();

const ContextProvider = ({children}) => {
const [domain, setDomain] = React.useState('');

return (
    <Context.Provider value={{
      domain,
      setDomain
      }}>
      {children}
    </Context.Provider>
  )
}
//end of reactcomponent
export {ContextProvider, Context};